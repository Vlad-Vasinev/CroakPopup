import { getDistanceStories } from "./slidesControl.js"

export function sliderOpen (storiesGalleri) {
  document.querySelectorAll('.galleri .galleri__el').forEach((element, indexEl) => {
    element.addEventListener('click', (e) => {
      document.querySelectorAll('.galleri .galleri__el').forEach(element => {
        element.classList.remove('stories-el_active')
      })

      window.countIndex = indexEl
      e.currentTarget.classList.add('stories-el_active')
      getDistanceStories(e.currentTarget, storiesGalleri)

      if(window.buttons) {
        if(window.countIndex == 0) {
          storiesGalleri.parentElement.parentElement.querySelector('.stories-prev').setAttribute('disabled', true)
          storiesGalleri.parentElement.parentElement.querySelector('.stories-prev').classList.add('btn_disabled')
        }
        else {
          storiesGalleri.parentElement.parentElement.querySelector('.stories-prev').removeAttribute('disabled')
          storiesGalleri.parentElement.parentElement.querySelector('.stories-prev').classList.remove('btn_disabled')
        }
        if(window.countIndex == storiesGalleri.querySelectorAll('.galleri__el').length - 1) {
          storiesGalleri.parentElement.parentElement.querySelector('.stories-next').setAttribute('disabled', true)
          storiesGalleri.parentElement.parentElement.querySelector('.stories-next').classList.add('btn_disabled')
        }
        else {
          storiesGalleri.parentElement.parentElement.querySelector('.stories-next').removeAttribute('disabled')
          storiesGalleri.parentElement.parentElement.querySelector('.stories-next').classList.remove('btn_disabled')
        }
      }

    })
  })
}