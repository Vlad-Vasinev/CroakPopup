
export function storiesGallery (gap) {
  let stories = document.createElement('div')
  stories.classList.add('galleri')
  stories.style.setProperty('--galleri-gap', gap)
  stories.classList.add('galleri-stories')

  return stories

}