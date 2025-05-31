
export function createGallery (gap) {
  let stories = document.createElement('div')
  stories.classList.add('gallery')
  stories.style.setProperty('--gallery-gap', gap)
  stories.classList.add('gallery-opened')

  return stories

}