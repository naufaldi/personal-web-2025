import { expect, test } from 'bun:test'
const origin=process.env.MOTION_TEST_ORIGIN??'http://127.0.0.1:4341'
function browser(...args:string[]) {
  const p=Bun.spawnSync(['agent-browser','--session','faldi-matrix',...args],{stdout:'pipe',stderr:'pipe'})
  if(p.exitCode)throw new Error(new TextDecoder().decode(p.stderr))
  return new TextDecoder().decode(p.stdout)
}
function evaluate<T>(script:string):T { return (JSON.parse(browser('eval',script,'--json')) as {data:{result:T}}).data.result }
for(const [width,height] of [[1487,1058],[834,1112],[390,844],[320,740]]) {
  test(`page-family interactions ${width}`,()=>{
    browser('set','viewport',String(width),String(height))
    for(const path of ['/','/about','/speaker','/book','/manhwa','/projects','/blogs','/projects/ts-hooks-kit','/blogs/state-management-in-reactjs']) {
      browser('open',origin+path)
      const errors=evaluate<string[]>(`(async()=>{
        const errors=[];const pause=ms=>new Promise(r=>setTimeout(r,ms));
        document.dispatchEvent(new KeyboardEvent('keydown',{key:'Tab',bubbles:true}));
        const check=()=>{if(document.documentElement.scrollWidth>innerWidth+1)errors.push('overflow')};
        await document.fonts.ready;check();
        for(const trigger of document.querySelectorAll('[data-expand]')) {
          const before=scrollY;trigger.click();const d=document.querySelector('dialog[open]');
          if(!d||!d.matches(':modal')||!d.contains(document.activeElement))errors.push('dialog focus');
          check();d?.dispatchEvent(new Event('cancel',{cancelable:true}));
          if(scrollY!==before||document.activeElement!==trigger)errors.push('dialog restore');
        }
        const toggle=document.querySelector('[data-view-toggle],[data-index-toggle]');toggle?.click();check();
        for(const filter of document.querySelectorAll('[data-editorial-filter],[data-filter]')) {
          filter.focus({preventScroll:true});filter.click();check();
          if(document.activeElement!==filter||filter.getAttribute('aria-pressed')!=='true')errors.push('filter focus/state');
        }
        document.querySelector('[data-editorial-filter="All"],[data-filter="All"]')?.click();
        for(const record of document.querySelectorAll('details')) {
          if(!record.getBoundingClientRect().height)continue;
          const summary=record.querySelector('summary');
          if(record.open)summary.click();summary.click();if(!record.open)errors.push('open');check();
          summary.click();if(record.open)errors.push('close');
        }
        const input=document.querySelector('[data-archive-search]');
        if(input){input.focus({preventScroll:true});input.value='zzzz-no-match';input.dispatchEvent(new Event('input',{bubbles:true}));
          if([...document.querySelectorAll('[data-record]')].some(e=>!e.hidden)||document.activeElement!==input)errors.push('search');
          input.value='';input.dispatchEvent(new Event('input',{bubbles:true}));}
        if(document.getAnimations().length)errors.push('keyboard animation');
        const img=document.querySelector('.media-frame img,.reading-layout img');
        if(img){img.dispatchEvent(new Event('error'));if(img.isConnected&&getComputedStyle(img).visibility!=='hidden')errors.push('image fallback');}
        await pause(0);return errors;
      })()`)
      expect({path,errors}).toEqual({path,errors:[]})
    }
  },120000)
}

test('native page navigation, history and homepage dialog keyboard focus',()=>{
  browser('open',origin+'/')
  browser('click','[data-expand="portrait"]')
  browser('press','Tab')
  expect(evaluate<boolean>(`document.querySelector('dialog[open]').contains(document.activeElement)`)).toBe(true)
  browser('press','Tab')
  expect(evaluate<boolean>(`document.querySelector('dialog[open]').contains(document.activeElement)`)).toBe(true)
  browser('press','Escape')
  browser('click','.collection-header nav a[href="/about"]')
  expect(browser('get','url').trim()).toBe(origin+'/about')
  browser('back')
  expect(browser('get','url').trim()).toBe(origin+'/')
  browser('forward')
  expect(browser('get','url').trim()).toBe(origin+'/about')
  browser('open',origin+'/about#experiences-heading')
  expect(evaluate<boolean>(`!!document.getElementById('experiences-heading')`)).toBe(true)
})

test('script-blocked page families retain content and usable links',()=>{
  for(const path of ['/','/about','/speaker','/book','/manhwa','/projects','/blogs','/projects/ts-hooks-kit','/blogs/state-management-in-reactjs']) {
    browser('open','http://127.0.0.1:4343'+path)
    expect(evaluate<boolean>(`!!document.querySelector('main') && document.querySelectorAll('main a[href]').length>0 && !document.querySelector('.copy-code') && !document.querySelector('[data-expand]:not([hidden])')`)).toBe(true)
  }
})
