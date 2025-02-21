import { getDistanceStories } from "./slidesControl.js"

export function rightMovement(storiesGalleri) {

  let lengthEl = document.querySelectorAll('.galleri .galleri__el').length
  let elActiveIn = window.countIndex
  let elActive = document.querySelectorAll('.galleri .galleri__el')[elActiveIn]

  console.log(elActiveIn)

  document.querySelectorAll('.galleri .galleri__el').forEach(element => {
    element.classList.remove('stories-el_active')
  })

  if(window.countIndex <= 1) {
    let prevBtn = storiesGalleri.parentElement.parentElement.querySelector('.stories-prev')
    prevBtn.removeAttribute('disabled')
    prevBtn.classList.remove('btn_disabled')
    prevBtn.classList.add('stories-el_active')
  }
  if(window.countIndex === lengthEl - 2) {
    let nextBtn = storiesGalleri.parentElement.parentElement.querySelector('.stories-next')
    nextBtn.setAttribute('disabled', true)
    nextBtn.classList.add('btn_disabled')
  }

  if(elActiveIn < (lengthEl - 1)) {
    elActiveIn += 1
    window.countIndex += 1
    elActive = document.querySelectorAll('.galleri .galleri__el')[elActiveIn]
    elActive.classList.add('stories-el_active')
    getDistanceStories(elActive, storiesGalleri)
  }
}

export function leftMovement(storiesGalleri) {

  let lengthEl = document.querySelectorAll('.galleri .galleri__el').length
  let elActiveIn = window.countIndex

  if(window.countIndex === lengthEl - 1) {
    storiesGalleri.parentElement.parentElement.querySelector('.stories-next').removeAttribute('disabled')
    storiesGalleri.parentElement.parentElement.querySelector('.stories-next').classList.remove('btn_disabled')
  }
  if(window.countIndex === 1) {
    console.log('here is left end')
    storiesGalleri.parentElement.parentElement.querySelector('.stories-prev').setAttribute('disabled', true)
    storiesGalleri.parentElement.parentElement.querySelector('.stories-prev').classList.add('btn_disabled')
  }

  let elActive = document.querySelectorAll('.galleri .galleri__el')[window.countIndex]

  document.querySelectorAll('.galleri .galleri__el').forEach(element => {
    element.classList.remove('stories-el_active')
  })

  if(window.countIndex != 0) {
    window.countIndex -= 1
    elActive = document.querySelectorAll('.galleri .galleri__el')[window.countIndex]
    elActive.classList.add('stories-el_active')
    getDistanceStories(elActive, storiesGalleri)
  }
}
