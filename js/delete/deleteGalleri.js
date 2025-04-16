
import { delContainer } from "./deleteContainer.js"
import { enableScroll } from "../appControl/scrollControl.js"

export function deleteGalleri(startXSwipe, startYSwipe, storiesContainer, storiesGalleri, keyEvent, mobTouchStart, mobTouchEnd) {
  document.removeEventListener('keydown', keyEvent)
  startXSwipe = 0
  startYSwipe = 0
  document.removeEventListener('touchstart', mobTouchStart)
  document.removeEventListener('touchend', mobTouchEnd)
  window.croakAPP.activeSlide = undefined
  delContainer(storiesContainer)
  enableScroll()
  storiesGalleri.classList.remove('galleri_transform')
  if(window.croakAPP.buttonsParam) {

    let storiesContainer = storiesGalleri.parentElement.parentElement
    let prevBtn = storiesContainer.querySelector('.stories-prev')
    let storiesNext = storiesContainer.querySelector('.stories-next')

    setTimeout(() => {

      prevBtn.removeAttribute('disabled')
      prevBtn.classList.remove('btn_disabled')
      storiesNext.removeAttribute('disabled')
      storiesNext.classList.remove('btn_disabled')
      
      window.croakAPP.buttonsParam = false
    }, 300)
  }
}