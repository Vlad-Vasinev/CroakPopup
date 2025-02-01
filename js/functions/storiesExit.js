
export function storiesExitBtn () {
  let storiesOutBtn = document.createElement('button')
  storiesOutBtn.classList.add('close-gallery')
  const svgString = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.63599 18.364L18.3639 5.63603M5.63599 5.63604L18.3639 18.364" stroke="black" stroke-width="1.5" stroke-linecap="round"/></svg>';
  const parser = new DOMParser()
  const svgElement = parser.parseFromString(svgString, 'image/svg+xml').querySelector('svg')
  storiesOutBtn.append(svgElement)

  return storiesOutBtn

}