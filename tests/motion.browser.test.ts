import { beforeEach, describe, expect, test } from 'bun:test'

const origin = process.env.MOTION_TEST_ORIGIN ?? 'http://127.0.0.1:4341'
function browser(...args: string[]) {
  const result = Bun.spawnSync(['agent-browser', '--session', 'faldi-motion-tests', ...args], { stdout: 'pipe', stderr: 'pipe' })
  if (result.exitCode) throw new Error(new TextDecoder().decode(result.stderr))
  return new TextDecoder().decode(result.stdout)
}
function evaluate<T>(script: string): T {
  const response = JSON.parse(browser('eval', script, '--json')) as { success: boolean; data: { result: T }; error?: string }
  if (!response.success) throw new Error(response.error)
  return response.data.result
}
const pointer = `document.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true}));`
const click = `(el)=>el.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,detail:1}))`
const wait = `(ms)=>new Promise(resolve=>setTimeout(resolve,ms))`

describe('editorial motion in a real browser', () => {
  beforeEach(() => {
    browser('set', 'media', 'light')
    browser('set', 'viewport', '1440', '1000')
    browser('open', `${origin}/book#index`)
    browser('reload')
  })
  test('rapid open-close-open cannot complete a stale close', () => {
    const result = evaluate<{open:boolean; inert:boolean; expanded:string}>(`(async()=>{
      const pause=${wait};const click=${click};${pointer}
      const d=document.querySelector('details');d.scrollIntoView();const s=d.querySelector('summary');
      click(s);await pause(40);click(s);await pause(40);click(s);await pause(350);
      return {open:d.open,inert:d.querySelector('div').inert,expanded:s.getAttribute('aria-expanded')};
    })()`)
    expect(result).toEqual({open:true,inert:false,expanded:'true'})
  })
  test('keyboard settles closing content and restores summary focus', () => {
    const result = evaluate<{open:boolean; focused:boolean; animations:number}>(`(async()=>{
      const pause=${wait};const click=${click};${pointer}
      const d=document.querySelector('details');d.scrollIntoView();const s=d.querySelector('summary');
      s.focus();click(s);await pause(250);click(s);document.dispatchEvent(new KeyboardEvent('keydown',{key:'Tab',bubbles:true}));await pause(300);
      return {open:d.open,focused:document.activeElement===s,animations:document.getAnimations().length};
    })()`)
    expect(result.open).toBe(false)
    expect(result.focused).toBe(true)
    expect(result.animations).toBe(0)
  })
  test('modifier-only keys preserve pointer motion while Tab settles it', () => {
    const result = evaluate<{animatingBefore:boolean; animatingAfterModifier:boolean; animatingAfterTab:boolean; modalityAfterModifier:string; modalityAfterTab:string}>(`(async()=>{
      const pause=${wait};const click=${click};${pointer}
      const d=document.querySelector('details');d.scrollIntoView();const s=d.querySelector('summary');
      click(s);await pause(350);click(s);await pause(30);
      const animatingBefore=document.getAnimations().length>0;
      document.dispatchEvent(new KeyboardEvent('keydown',{key:'Control',bubbles:true}));
      const animatingAfterModifier=document.getAnimations().length>0;
      const modalityAfterModifier=document.documentElement.dataset.input;
      document.dispatchEvent(new KeyboardEvent('keydown',{key:'Tab',bubbles:true}));
      return {animatingBefore,animatingAfterModifier,animatingAfterTab:document.getAnimations().length>0,modalityAfterModifier,modalityAfterTab:document.documentElement.dataset.input};
    })()`)
    expect(result).toEqual({animatingBefore:true,animatingAfterModifier:true,animatingAfterTab:false,modalityAfterModifier:'pointer',modalityAfterTab:'keyboard'})
  })
  test('rapid filters retain latest selected category and usable records', () => {
    const result = evaluate<{selected:string; visible:number; stranded:number}>(`(async()=>{
      const pause=${wait};const click=${click};${pointer}
      click(document.querySelector('[data-editorial-filter="Read"]'));await pause(35);
      click(document.querySelector('[data-editorial-filter="Wishlist"]'));await pause(35);
      click(document.querySelector('[data-editorial-filter="All"]'));await pause(350);
      return {selected:document.querySelector('[aria-pressed="true"]').textContent,visible:[...document.querySelectorAll('[data-record]')].filter(d=>!d.hidden).length,stranded:document.querySelectorAll('[inert]').length};
    })()`)
    expect(result).toEqual({selected:'All',visible:6,stranded:0})
  })
  test('pointer filtering animates while reduced-motion filtering stays immediate', () => {
    browser('open',`${origin}/book`)
    const animated = evaluate<{animating:boolean; selected:string; visible:number}>(`(async()=>{
      const click=${click};${pointer}
      click(document.querySelector('[data-editorial-filter="Read"]'));
      return {animating:document.getAnimations().length>0,selected:document.querySelector('[aria-pressed="true"]').textContent,visible:[...document.querySelectorAll('[data-record]')].filter(d=>!d.hidden).length};
    })()`)
    expect(animated).toEqual({animating:true,selected:'Read',visible:3})
    browser('set','media','light','reduced-motion')
    const immediate = evaluate<{animations:number; selected:string; visible:number}>(`(async()=>{
      const click=${click};${pointer}
      click(document.querySelector('[data-editorial-filter="Wishlist"]'));
      return {animations:document.getAnimations().length,selected:document.querySelector('[aria-pressed="true"]').textContent,visible:[...document.querySelectorAll('[data-record]')].filter(d=>!d.hidden).length};
    })()`)
    expect(immediate).toEqual({animations:0,selected:'Wishlist',visible:2})
  })
  test('reduced motion settles an active close immediately', () => {
    evaluate(`(()=>{${pointer}const d=document.querySelector('details');d.scrollIntoView();(${click})(d.querySelector('summary'));})()`)
    browser('set','media','light','reduced-motion')
    const result=evaluate<{open:boolean; animations:number}>(`(()=>{(${click})(document.querySelector('details summary'));return {open:document.querySelector('details').open,animations:document.getAnimations().length}})()`)
    expect(result).toEqual({open:false,animations:0})
  })
  test('Escape returns an archive reveal to its original trigger', () => {
    browser('open',`${origin}/book`)
    evaluate(`(()=>{${pointer}const link=document.querySelector('[data-reveal]');link.scrollIntoView();(${click})(link);})()`)
    browser('press','Escape')
    expect(evaluate<boolean>(`document.activeElement.hasAttribute('data-reveal') && !document.querySelector('[data-board]').hidden && ![...document.querySelectorAll('details')].some(d=>d.open)`)).toBe(true)
  })
  test('approved image-hover timing stays on shared media surfaces', () => {
    const timing = (path: string, selector: string) => {
      browser('open',`${origin}${path}`)
      return evaluate<{duration:number; property:string; easing:string}>(`(()=>{
        const element=document.querySelector('${selector}');
        const style=getComputedStyle(element);
        const duration=style.transitionDuration.endsWith('ms')?parseFloat(style.transitionDuration):parseFloat(style.transitionDuration)*1000;
        return {duration,property:style.transitionProperty,easing:style.transitionTimingFunction};
      })()`)
    }
    const expected = {duration:600,property:'transform',easing:'ease'}
    expect(timing('/','.artifact-face')).toEqual(expected)
    expect(timing('/book','.archive-face > .media-frame')).toEqual(expected)
    expect(timing('/speaker','.company-board figure > a > .media-frame')).toEqual(expected)
    expect(timing('/book','.archive-face').duration).toBe(0)
    expect(timing('/speaker','.company-board figure > a').duration).toBe(0)
  })
  test('search stays immediate and keeps input focus', () => {
    browser('open',`${origin}/projects`)
    evaluate(`(()=>{const input=document.querySelector('[data-archive-search]');input.focus();input.value='no-such-project';input.dispatchEvent(new Event('input',{bubbles:true}));})()`)
    const result=evaluate<{focus:boolean; count:number; animations:number}>(`({focus:document.activeElement.matches('[data-archive-search]'),count:[...document.querySelectorAll('[data-record]')].filter(d=>!d.hidden).length,animations:document.getAnimations().length})`)
    expect(result).toEqual({focus:true,count:0,animations:0})
  })
  test('immediate search filtering does not sample geometry or computed styles', () => {
    browser('open',`${origin}/projects`)
    const result=evaluate<{rects:number; styles:number; focus:boolean; count:number; animations:number}>(`(()=>{
      const input=document.querySelector('[data-archive-search]');
      const originalRect=Element.prototype.getBoundingClientRect;
      const originalStyle=window.getComputedStyle;
      let rects=0;let styles=0;
      Element.prototype.getBoundingClientRect=function(){rects++;return originalRect.apply(this,arguments)};
      Object.defineProperty(window,'getComputedStyle',{configurable:true,value:function(){styles++;return originalStyle.apply(this,arguments)}});
      try {
        input.focus();input.value='no-such-project';input.dispatchEvent(new Event('input',{bubbles:true}));
        return {rects,styles,focus:document.activeElement===input,count:[...document.querySelectorAll('[data-record]')].filter(d=>!d.hidden).length,animations:document.getAnimations().length};
      } finally {
        Element.prototype.getBoundingClientRect=originalRect;
        Object.defineProperty(window,'getComputedStyle',{configurable:true,value:originalStyle});
      }
    })()`)
    expect(result).toEqual({rects:0,styles:0,focus:true,count:0,animations:0})
  })
  test('all eight photographs enlarge without moving the gallery and restore focus', () => {
    browser('open', `${origin}/photography`)
    expect(evaluate<boolean>(`(async()=>{
      await document.fonts.ready;const pause=${wait};
      const links=[...document.querySelectorAll('[data-photo-open]')];
      if(links.length!==8)return false;
      for(const link of links){
        link.focus({preventScroll:true});const x=link.getBoundingClientRect().x;const y=scrollY;
        link.click();const d=document.querySelector('dialog[open]');
        if(!d?.matches(':modal')||!d.contains(document.activeElement)||scrollY!==y||link.getBoundingClientRect().x!==x)return false;
        d.querySelector('button').click();await pause(30);
        if(d.open||document.activeElement!==link||document.documentElement.classList.contains('photo-open'))return false;
      }return true;
    })()`)).toBe(true)
  })
  test('homepage has exactly seven distinct direct destinations and a legacy index anchor', () => {
    browser('open', `${origin}/#index`)
    expect(evaluate<string[]>(`[...document.querySelectorAll('[data-artifact] a')].map(a=>a.getAttribute('href')).sort()`)).toEqual(['/about','/blogs','/book','/manhwa','/photography','/projects','/speaker'])
    expect(evaluate<boolean>(`!!document.querySelector('#index') && !document.querySelector('main dialog, [data-filter], [data-index-toggle]')`)).toBe(true)
  })
  test('photo preview continuity, failure recovery, and modified links remain correct', () => {
    browser('open', `${origin}/photography`)
    expect(evaluate<boolean>(`(async()=>{
      const pause=${wait};
      const links=[...document.querySelectorAll('[data-photo-open]')];
      if(links.some(link=>performance.getEntriesByName(link.href).length))return false;
      let intercepted=true;
      document.addEventListener('click',e=>{intercepted=e.defaultPrevented;e.preventDefault()},{once:true});
      links[0].dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,ctrlKey:true}));
      if(intercepted||document.querySelector('dialog[open]'))return false;
      links[0].click();const d=document.querySelector('dialog');const img=d.querySelector('.photo-full');const preview=d.querySelector('.photo-preview');
      const firstThumbnail=links[0].querySelector('img');
      const continuous=preview.src===(firstThumbnail.currentSrc||firstThumbnail.src)&&getComputedStyle(preview).visibility==='visible'&&!d.querySelector('.has-error');
      if(!continuous)return false;
      img.dispatchEvent(new Event('error'));
      if(!d.querySelector('.has-error')||d.querySelector('.media-unavailable').hidden||img.classList.contains('is-ready'))return false;
      d.querySelector('button').click();links[1].click();
      const secondThumbnail=links[1].querySelector('img');
      const continuityReset=preview.src===(secondThumbnail.currentSrc||secondThumbnail.src)&&!d.querySelector('.has-error');
      await pause(300);
      const recovered=continuityReset&&img.classList.contains('is-ready')&&img.src===links[1].href;
      d.querySelector('button').click();await pause(30);return recovered && document.activeElement===links[1];
    })()`)).toBe(true)
  })
  test('modified archive links retain native behavior', () => {
    expect(evaluate<boolean>(`(()=>{
      const a=document.querySelector('[data-reveal]');const e=new MouseEvent('click',{bubbles:true,cancelable:true,ctrlKey:true,detail:1});
      document.addEventListener('click',event=>event.preventDefault(),{once:true});
      a.dispatchEvent(e);return document.querySelector('[data-board]').hidden===true && !document.querySelector('details').open;
    })()`)).toBe(true)
  })
  test('latest copy attempt owns feedback timer, announcement, and async completion', () => {
    browser('open',`${origin}/blogs/state-management-in-reactjs`)
    expect(evaluate<boolean>(`(async()=>{
      const pause=${wait};const b=document.querySelector('.copy-code');const status=document.querySelector('.copy-code-status');
      Object.defineProperty(navigator,'clipboard',{value:{writeText:()=>Promise.resolve()},configurable:true});
      b.click();await pause(1000);b.click();await pause(900);if(b.textContent!=='Copied'||status.textContent!=='Code copied to clipboard')return false;
      let rejectOld;let resolveNew;let n=0;
      Object.defineProperty(navigator,'clipboard',{value:{writeText:()=>new Promise((resolve,reject)=>{if(n++===0)rejectOld=reject;else resolveNew=resolve})},configurable:true});
      b.click();b.click();resolveNew();await pause(0);rejectOld();await pause(0);
      return b.textContent==='Copied'&&status.textContent==='Code copied to clipboard'&&status.getAttribute('role')==='status'&&status.getAttribute('aria-live')==='polite';
    })()`)).toBe(true)
  })

  test('copy failure announces the fallback and moves focus to selectable code', () => {
    browser('open',`${origin}/blogs/state-management-in-reactjs`)
    expect(evaluate<boolean>(`(async()=>{
      const pause=${wait};const b=document.querySelector('.copy-code');const status=document.querySelector('.copy-code-status');const pre=document.querySelector('.reading-prose pre');
      Object.defineProperty(navigator,'clipboard',{value:{writeText:()=>Promise.reject(new Error('denied'))},configurable:true});
      b.click();await pause(30);
      return b.textContent==='Select code to copy'&&status.textContent==='Copy unavailable. Select the code to copy.'&&document.activeElement===pre;
    })()`)).toBe(true)
  })

  test('photography remains immediate with reduced motion', () => {
    browser('open', `${origin}/photography`)
    browser('set','media','light','reduced-motion')
    browser('click','[data-photo-open]')
    browser('press','Escape')
    expect(evaluate<boolean>(`!document.querySelector('dialog[open]') && !document.documentElement.classList.contains('photo-open') && document.activeElement.matches('[data-photo-open]') && document.getAnimations().length===0`)).toBe(true)
  })

  test('navigation enhancement excludes keyboard, modified, hash and download links', () => {
    const result = evaluate<boolean[]>(`(()=>{
      const scenarios=[{href:'/about',detail:1},{href:'/about',detail:0},{href:'/about',detail:1,ctrlKey:true},{href:'/book#index',detail:1},{href:'/about',detail:1,download:true},{href:'/about',detail:1,target:'_blank'}];
      return scenarios.map(scenario=>{
        const a=document.createElement('a');a.href=scenario.href;if(scenario.download)a.download='file';if(scenario.target)a.target=scenario.target;document.body.append(a);
        document.addEventListener('click',event=>event.preventDefault(),{once:true});
        a.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,detail:scenario.detail,ctrlKey:scenario.ctrlKey??false}));
        const event=new Event('pageswap');let skipped=false;
        Object.defineProperties(event,{activation:{value:{entry:{url:a.href},navigationType:'push'}},viewTransition:{value:{ready:Promise.resolve(),skipTransition:()=>{skipped=true}}}});
        dispatchEvent(event);a.remove();sessionStorage.removeItem('faldi:pointer-navigation');return skipped;
      });
    })()`)
    expect(result).toEqual([false,true,true,true,true,true])
  })

  test('Escape closes reading contents and restores its summary focus', () => {
    browser('open',`${origin}/blogs/state-management-in-reactjs`)
    browser('focus','.reading-toc a')
    browser('press','Escape')
    expect(evaluate<{open:boolean; focus:boolean}>(`({open:document.querySelector('.reading-toc').open,focus:document.activeElement===document.querySelector('.reading-toc summary')})`)).toEqual({open:false,focus:true})
  })

})
