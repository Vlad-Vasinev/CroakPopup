function remClassContainer (storiesContainer) {
  return new Promise((resolve) => {
    storiesContainer.classList.remove('stories-container_active')
    resolve()
  })
}
function remFromBody(storiesContainer) {
  document.body.removeChild(storiesContainer)
}
export async function delContainer (storiesContainer) {
  await remClassContainer(storiesContainer)
  setTimeout(() => {
    remFromBody(storiesContainer)
  }, 300)
}