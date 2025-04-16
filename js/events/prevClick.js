import { galleriSwipe } from "./galleriSwipe.js"

export function prevClick(storiesGalleri) {

  if(window.croakAPP.buttonsParam) {

    let lengthEl = storiesGalleri.querySelectorAll('.galleri .galleri__el').length
    let storiesContainer = storiesGalleri.parentElement.parentElement
    let storiesNext = storiesContainer.querySelector('.stories-next')
    let storiesprev = storiesContainer.querySelector('.stories-prev')

    if(window.croakAPP.activeSlide === lengthEl - 1) {
      storiesNext.removeAttribute('disabled')
      storiesNext.classList.remove('btn_disabled')
    }
    if(window.croakAPP.activeSlide === 1) {
      storiesprev.setAttribute('disabled', true)
      storiesprev.classList.add('btn_disabled')
    }
  }

  document.querySelectorAll('.galleri .galleri__el').forEach(element => {
    element.classList.remove('stories-el_active')
  })

  if(window.croakAPP.activeSlide != 0) {
    window.croakAPP.activeSlide -= 1
    let elActive = storiesGalleri.querySelectorAll('.galleri .galleri__el')[window.croakAPP.activeSlide]
    elActive.classList.add('stories-el_active')
    galleriSwipe(elActive, storiesGalleri)
  }
}