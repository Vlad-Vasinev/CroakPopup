import { gallerySwipe } from "./gallerySwipe.js"

export function prevClick(storiesGallery) {

  let storiesGalleryItems = storiesGallery.querySelectorAll('.gallery .gallery__el')

  if(window.croakAPP.buttonsParam) {

    let lengthEl = storiesGallery.querySelectorAll('.gallery .gallery__el').length
    let storiesContainer = storiesGallery.parentElement.parentElement
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

  storiesGalleryItems[window.croakAPP.activeSlide].classList.remove('stories-el_active')

  if(window.croakAPP.activeSlide != 0) {
    window.croakAPP.activeSlide -= 1
    let elActive = storiesGalleryItems[window.croakAPP.activeSlide]
    elActive.classList.add('stories-el_active')
    gallerySwipe(elActive, storiesGallery)
  }
}