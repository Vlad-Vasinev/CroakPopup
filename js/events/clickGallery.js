import { gallerySwipe } from "./gallerySwipe.js"

export function clickGallery (storiesGallery) {

  let storiesGalleryItems = storiesGallery.querySelectorAll('.gallery .gallery__el')

  document.querySelectorAll('.gallery .gallery__el').forEach((element, indexEl) => {
    element.addEventListener('click', (e) => {

      storiesGalleryItems[window.croakAPP.activeSlide].classList.remove('stories-el_active')

      window.croakAPP.activeSlide = indexEl
      e.currentTarget.classList.add('stories-el_active')
      gallerySwipe(e.currentTarget, storiesGallery)

      if(window.croakAPP.buttonsParam) {
        
        let storiesContainer = storiesGallery.parentElement.parentElement
        let prevBtn = storiesContainer.querySelector('.stories-prev')
        let storiesNext = storiesContainer.querySelector('.stories-next')
        
        if(window.croakAPP.activeSlide == 0) {
          prevBtn.setAttribute('disabled', true)
          prevBtn.classList.add('btn_disabled')
        }
        else {
          prevBtn.removeAttribute('disabled')
          prevBtn.classList.remove('btn_disabled')
        }
        if(window.croakAPP.activeSlide == storiesGallery.getElementsByClassName('gallery__el').length - 1) {
          storiesNext.setAttribute('disabled', true)
          storiesNext.classList.add('btn_disabled')
        }
        else {
          storiesNext.removeAttribute('disabled')
          storiesNext.classList.remove('btn_disabled')
        }
      }

    })
  })
}