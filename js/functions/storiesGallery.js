
export function storiesGallery (customGap) {
  let stories = document.createElement('div')
  stories.classList.add('galleri')
  stories.style.setProperty('--galleri-gap', customGap)
  stories.classList.add('galleri-stories')

  return stories

}