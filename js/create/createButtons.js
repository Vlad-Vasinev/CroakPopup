
export function createNextButton (storiesContainer, storiesGalleri, domEl) {
  if(window.croakAPP.buttonsParam) {
    
    let customNextArrow = document.querySelector(domEl).querySelector('.stories-next').cloneNode()

    storiesContainer.appendChild(customNextArrow)
    customNextArrow.classList.add('custom-right')

    if(window.croakAPP.activeSlide == storiesGalleri.getElementsByClassName('galleri__el').length - 1) {
      customNextArrow.setAttribute('disabled', true)
      customNextArrow.classList.add('btn_disabled')
    }

    return customNextArrow
  }
}

export function createPrevButton (storiesContainer, storiesGalleri, domEl) {
  if(window.croakAPP.buttonsParam) {

    let customPrevArrow = document.querySelector(domEl).querySelector('.stories-prev').cloneNode()

    storiesContainer.appendChild(customPrevArrow)
    customPrevArrow.classList.add('custom-left')

    if(window.croakAPP.activeSlide == 0) {
      customPrevArrow.setAttribute('disabled', true)
      customPrevArrow.classList.add('btn_disabled')
    }

    return customPrevArrow
  }
}