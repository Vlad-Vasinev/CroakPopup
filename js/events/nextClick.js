import { galleriSwipe } from "./galleriSwipe.js"

export function nextClick(storiesGalleri) {

  let lengthEl = storiesGalleri.querySelectorAll('.galleri .galleri__el').length

  document.querySelectorAll('.galleri .galleri__el').forEach(element => {
    element.classList.remove('stories-el_active')
  })

  if(window.croakAPP.buttonsParam) {
    let storiesContainer = storiesGalleri.parentElement.parentElement
    if(window.croakAPP.activeSlide <= 1) {
      let prevBtn = storiesContainer.querySelector('.stories-prev')
      prevBtn.removeAttribute('disabled')
      prevBtn.classList.remove('btn_disabled')
      prevBtn.classList.add('stories-el_active')
    }
    if(window.croakAPP.activeSlide === lengthEl - 2) {
      let nextBtn = storiesContainer.querySelector('.stories-next')
      nextBtn.setAttribute('disabled', true)
      nextBtn.classList.add('btn_disabled')
    }
  }
  if(window.croakAPP.activeSlide < (lengthEl - 1)) {

    window.croakAPP.activeSlide += 1

    let elActive = storiesGalleri.querySelectorAll('.galleri .galleri__el')[window.croakAPP.activeSlide]
    elActive.classList.add('stories-el_active')
    galleriSwipe(elActive, storiesGalleri)
  }
}