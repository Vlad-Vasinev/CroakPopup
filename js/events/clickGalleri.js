import { galleriSwipe } from "./galleriSwipe.js"

export function clickGalleri (storiesGalleri) {

  let storiesGalleriItems = storiesGalleri.querySelectorAll('.galleri .galleri__el')

  document.querySelectorAll('.galleri .galleri__el').forEach((element, indexEl) => {
    element.addEventListener('click', (e) => {

      storiesGalleriItems[window.croakAPP.activeSlide].classList.remove('stories-el_active')

      window.croakAPP.activeSlide = indexEl
      e.currentTarget.classList.add('stories-el_active')
      galleriSwipe(e.currentTarget, storiesGalleri)

      if(window.croakAPP.buttonsParam) {
        
        let storiesContainer = storiesGalleri.parentElement.parentElement
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
        if(window.croakAPP.activeSlide == storiesGalleri.getElementsByClassName('galleri__el').length - 1) {
          storiesNext.setAttribute('disabled', true)
          storiesNext.classList.add('btn_disabled')
        }
        // if(window.croakAPP.activeSlide == storiesGalleri.querySelectorAll('.galleri__el').length - 1) {
        //   storiesNext.setAttribute('disabled', true)
        //   storiesNext.classList.add('btn_disabled')
        // }
        else {
          storiesNext.removeAttribute('disabled')
          storiesNext.classList.remove('btn_disabled')
        }
      }

    })
  })
}