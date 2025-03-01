
import { getDistanceStories } from "./functions/slidesControl.js"
import { rightMovement } from "./functions/functions.js"
import { leftMovement } from "./functions/functions.js"

import { storiesExit } from "./functions/storiesOut.js"
import { storiesExitBtn } from "./functions/storiesExit.js"
import { closeStories } from "./functions/closeStories.js"
import { sliderOpen } from "./functions/sliderOpen.js"
import { disableScroll } from "./functions/scrollFunc.js"

import { storiesGallery } from "./functions/storiesGallery.js"
import { storiesContainerEl } from "./functions/storiesContainer.js"
import { fillSlider } from "./functions/fillSlider.js"

import { appHeight } from "./functions/appResize.js"

class croakSlider {
  constructor(object) {
    this.stories = false
    this.buttons = false
    this.keyboard = false
    this.gap
    this.scale
    this.opacity
    this.DOMElement
    this.mobileVideo = false
    this.deskStories = false

    Object.entries(object).forEach((element) => {
      if(element[0] === "stories") {
        this.stories = true
        document.querySelector('.marker').classList.add('marker-stories')
        if(element[1].DOMElement) {
          this.DOMElement = element[1].DOMElement
        }
        if(element[1].buttons) {
          this.buttons = element[1].buttons
        }
        if(element[1].keyboard) {
          this.keyboard = element[1].keyboard
        }
        if(element[1].gap) {
          this.gap = `${element[1].gap}px`
        }
        if(element[1].scale) {
          this.scale = element[1].scale
        }
        if(element[1].opacity) {
          this.opacity = element[1].opacity
        }
        if(element[1].mobileVideo === true) {
          this.mobileVideo = true
        }
        if(element[1].deskStories === true) {
          this.deskStories = true
        }
      }
    })

    console.log(this.mobileVideo)

    window.countIndex = undefined
    window.buttons = this.buttons
    window.keyboard = this.keyboard

    if(this.DOMElement) {

      document.querySelectorAll(this.DOMElement).forEach((elContainer) => {
        elContainer.querySelectorAll('[data-el], [data-video-el]').forEach((elSlider, index, array) => {
          elSlider.addEventListener('click', () => {
            console.log(elSlider + `${index}`)

            window.countIndex = index
            setTimeout(() => {
              disableScroll()
            }, 350)

            let storiesGalleri = storiesGallery(this.gap)
            fillSlider(array, storiesGalleri, this.scale, this.mobileVideo, this.deskStories)

            let storiesOut = storiesExitBtn()
            let storiesContainer = storiesContainerEl()

            let storiesWrapper = document.createElement("div")
            storiesWrapper.classList.add('stories-wrapper')

            storiesContainer.appendChild(storiesWrapper)
            storiesWrapper.appendChild(storiesGalleri)
            storiesContainer.appendChild(storiesOut)
            storiesContainer.style.setProperty('--galleri-opacity', this.opacity)

            if(storiesGalleri) {
              document.querySelectorAll('.galleri .galleri__el').forEach(element => {
                element.classList.remove('stories-el_active')
              })
              document.querySelectorAll('.galleri .galleri__el')[window.countIndex].classList.add('stories-el_active')
              getDistanceStories(document.querySelectorAll('.galleri .galleri__el')[window.countIndex], storiesGalleri)
              setTimeout(() => {
                storiesGalleri.classList.add('galleri_transform')
              }, 200)
            }

            let dist = 50
            let startXSwipe = 0
            let startYSwipe = 0 
            function mobTouchStart (e) {
              
              startXSwipe = e.touches[0].clientX
              startYSwipe = e.touches[0].clientY
            }
            function mobTouchEnd (e) {

              let xEnd = e.changedTouches[0].clientX
              let yEnd = e.changedTouches[0].clientY
              let diffX = startXSwipe - xEnd
              let diffY = startYSwipe - yEnd
          
              if(Math.abs(diffX - diffY) > 0 && Math.abs(diffX) > dist) {
                if(diffX > 0) {
                  if(window.countIndex === storiesGalleri.querySelectorAll('.galleri__el').length - 1) { 
                    return
                  }
                  rightMovement(storiesGalleri)
                }
                else if(diffX < 0){
                  if(window.countIndex === 0) { 
                    return
                  }
                  leftMovement(storiesGalleri)
                }
              }
            }

            function keyEvent (event) {
              if(event.key === 'ArrowRight') {
                if(window.countIndex !== (array.length - 1))
                rightMovement(storiesGalleri)
              }
              if(event.key === 'ArrowLeft') {
                if(window.countIndex !== 0)
                leftMovement(storiesGalleri)
              }
              if(event.key === 'd') {
                if(window.countIndex !== (array.length - 1))
                rightMovement(storiesGalleri)
              }
              if(event.key === 'a') {
                if(window.countIndex !== 0)
                leftMovement(storiesGalleri)
              }
              if(event.key === 'Escape') {
                console.log("escape")
                closeStories(startXSwipe, startYSwipe, storiesContainer, storiesGalleri, keyEvent, mobTouchStart, mobTouchEnd)
              }
            }

            storiesExit(storiesOut, startXSwipe, startYSwipe, storiesContainer, storiesGalleri, keyEvent, mobTouchStart, mobTouchEnd)

            if(window.buttons) {
              let customPrevArrow = document.querySelector(this.DOMElement).querySelector('.stories-prev').cloneNode()//custom buttons must be not here
              let customNextArrow = document.querySelector(this.DOMElement).querySelector('.stories-next').cloneNode()//custom buttons must be not here 
  
              storiesContainer.appendChild(customPrevArrow)
              storiesContainer.appendChild(customNextArrow)
              customPrevArrow.classList.add('custom-left')
              customNextArrow.classList.add('custom-right')
  
              if(window.countIndex == 0) {
                storiesGalleri.parentElement.parentElement.querySelector('.stories-prev').setAttribute('disabled', true)
                storiesGalleri.parentElement.parentElement.querySelector('.stories-prev').classList.add('btn_disabled')
              }
              else if(window.countIndex == storiesGalleri.querySelectorAll('.galleri__el').length - 1) {
                console.log(window.countIndex)
                storiesGalleri.parentElement.parentElement.querySelector('.stories-next').setAttribute('disabled', true)
                storiesGalleri.parentElement.parentElement.querySelector('.stories-next').classList.add('btn_disabled')
              }
  
              customPrevArrow.addEventListener('click', () => {
                leftMovement(storiesGalleri)
              })
              customNextArrow.addEventListener('click', () => {
                rightMovement(storiesGalleri)
              })
            }

            if(window.keyboard) {
              document.addEventListener('keydown', keyEvent)
            
              if(window.innerWidth <= 768) {
                document.removeEventListener('keydown', keyEvent)
              }
            }

            document.addEventListener('touchstart', mobTouchStart)
            document.addEventListener('touchend', mobTouchEnd)

            sliderOpen(storiesGalleri)
              
          })
        })
      })
    }
  }
}

appHeight()
window.addEventListener('resize', appHeight)

let frog = new croakSlider({
  stories: {
    DOMElement: "div[data-croak-container]",
    gap: 50,
    scale: .75,
    opacity: 0.95,
    //mobileVideo: true,
    deskStories: true,
    //keyboard: true,
    //buttons: true,
  },
});
