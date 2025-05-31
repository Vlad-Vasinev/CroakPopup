import { gallerySwipe } from "./gallerySwipe.js"

export function nextClick(storiesGallery) {

  let storiesGalleryItems = storiesGallery.querySelectorAll('.gallery .gallery__el')
  let lengthEl = storiesGallery.querySelectorAll('.gallery .gallery__el').length

  storiesGalleryItems[window.croakAPP.activeSlide].classList.remove('stories-el_active')

  if(window.croakAPP.buttonsParam) {
    let storiesContainer = storiesGallery.parentElement.parentElement
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

    let elActive = storiesGalleryItems[window.croakAPP.activeSlide]
    elActive.classList.add('stories-el_active')
    gallerySwipe(elActive, storiesGallery)
  }
}