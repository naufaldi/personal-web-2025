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
  test('search stays immediate and keeps input focus', () => {
    browser('open',`${origin}/projects`)
    evaluate(`(()=>{const input=document.querySelector('[data-archive-search]');input.focus();input.value='no-such-project';input.dispatchEvent(new Event('input',{bubbles:true}));})()`)
    const result=evaluate<{focus:boolean; count:number; animations:number}>(`({focus:document.activeElement.matches('[data-archive-search]'),count:[...document.querySelectorAll('[data-record]')].filter(d=>!d.hidden).length,animations:document.getAnimations().length})`)
    expect(result).toEqual({focus:true,count:0,animations:0})
  })
  test('homepage close can reopen, then filter removes selection safely', () => {
    browser('open', `${origin}/`)
    browser('reload')
    const result = evaluate<{open:boolean; selected:number; inert:number}>(`(async()=>{
      const pause=${wait};const click=${click};${pointer}
      const button=document.querySelector('[data-expand]');button.scrollIntoView();click(button);await pause(280);
      click(button);await pause(35);click(button);await pause(300);
      const open=button.getAttribute('aria-expanded')==='true';
      click(document.querySelector('[data-filter="Software"]'));await pause(300);
      return {open,selected:document.querySelectorAll('.is-selected').length,inert:document.querySelectorAll('[inert]').length};
    })()`)
    expect(result).toEqual({open:true,selected:0,inert:0})
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
