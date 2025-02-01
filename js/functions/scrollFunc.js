let scrollPosition = 0
let bodyEl = document.querySelector('body')
export function disableScroll () {
  scrollPosition = window.pageYOffset;
  bodyEl.style.overflow = 'hidden';
  bodyEl.style.position = 'fixed';
  bodyEl.style.top = `-${scrollPosition}px`;
  bodyEl.style.width = '100%';
}
export function enableScroll () {
  bodyEl.style.removeProperty('overflow');
  bodyEl.style.removeProperty('position');
  bodyEl.style.removeProperty('top');
  bodyEl.style.removeProperty('width');
  window.scrollTo(0, scrollPosition);
}