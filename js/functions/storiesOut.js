
import { delStoriesContainer } from "./delStoriesContainer.js"
import { enableScroll } from "./scrollFunc.js"

export function storiesExit (storiesOut, startXSwipe, startYSwipe, storiesContainer, storiesGalleri, keyEvent, mobTouchStart, mobTouchEnd) {
  storiesOut.addEventListener('click', () => {
    document.removeEventListener('keydown', keyEvent)
    startXSwipe = 0
    startYSwipe = 0
    document.removeEventListener('touchstart', mobTouchStart)
    document.removeEventListener('touchend', mobTouchEnd)
    window.countIndex = undefined
    delStoriesContainer(storiesContainer)
    enableScroll()
    storiesGalleri.classList.remove('galleri_transform')

    setTimeout(() => {

      storiesGalleri.parentElement.parentElement.querySelector('.stories-prev').removeAttribute('disabled')
      storiesGalleri.parentElement.parentElement.querySelector('.stories-prev').classList.remove('btn_disabled')

      storiesGalleri.parentElement.parentElement.querySelector('.stories-next').removeAttribute('disabled')
      storiesGalleri.parentElement.parentElement.querySelector('.stories-next').classList.remove('btn_disabled')
    }, 300)
  })
}