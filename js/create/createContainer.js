
export function createContainer (btnParam) {

  if(btnParam) {
    window.croakAPP.buttonsParam = true
  }

  let storiesContainerElement = document.createElement("div")
  document.body.append(storiesContainerElement)
  storiesContainerElement.classList.add('stories-container')
  setTimeout(() => {
    storiesContainerElement.classList.add('stories-container_active')
  }, 100)

  return storiesContainerElement

}