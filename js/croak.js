

import { createContainer } from "./create/createContainer.js"
import { createGallery } from "./create/createGallery.js"
import { createElements } from "./create/createElements.js"
import { createExitBtn } from "./create/createExitBtn.js"
import { createNextButton, createPrevButton } from "./create/createButtons.js"

import { clickGalleri } from "./events/clickGalleri.js"
import { galleriSwipe } from "./events/galleriSwipe.js"
import { nextClick } from "./events/nextClick.js"
import { prevClick } from "./events/prevClick.js"

import { clickExit } from "./events/clickExit.js"
import { deleteGalleri } from "./delete/deleteGalleri.js"
import { disableScroll } from "./appControl/scrollControl.js"

import { heightControl } from "./appControl/heightControl.js"

export class croakSlider {
  constructor(params) {

    window.croakAPP = {
      activeSlide: undefined,
      buttonsParam: false
    }

    this.stories = false
    this.keyboard = false
    this.buttons = false
    this.gap
    this.scale
    this.opacity
    this.DOMElement
    this.mobileVideo = false
    this.deskStories = false
    this.deskSwipeFocus = false
    this.deskSwipe = false
    this.clickGalleri = false

    if(params.DOMElement) {
      this.DOMElement = params.DOMElement
    }
    if(params.buttons) {
      window.croakAPP.buttonsParam = true
      this.buttons = true
    }
    if(params.keyboard) {
      this.keyboard = params.keyboard
    }
    if(params.gap) {
      this.gap = `${params.gap}px`
    }
    if(params.scale) {
      this.scale = params.scale
      window.elementScale = this.scale
    }
    if(params.opacity) {
      this.opacity = params.opacity
    }
    if(params.mobileVideo === true) {
      this.mobileVideo = true
    }
    if(params.deskStories === true) {
      this.deskStories = true
    }
    if(params.deskSwipe === true) {
      window.deskSwipe = true
    }
    if(params.deskSwipeFocus === true) {
      window.deskSwipeFocus = true
    }
    if(params.clickGalleri === true) {
      this.clickGalleri = true
    }

    if(this.DOMElement) {

      document.querySelectorAll(this.DOMElement).forEach((elContainer) => {
        elContainer.querySelectorAll('[data-el], [data-video-el]').forEach((elSlider, index, array) => {
          elSlider.addEventListener('click', () => {

            window.croakAPP.activeSlide = index
            setTimeout(() => {
              disableScroll()
            }, 350)

            let storiesGalleri = createGallery(this.gap)
            createElements(array, storiesGalleri, this.scale, this.mobileVideo, this.deskStories)

            let storiesOut = createExitBtn()
            let storiesContainer = createContainer(this.buttons)

            let storiesWrapper = document.createElement("div")
            storiesWrapper.classList.add('stories-wrapper')

            if(!this.deskStories) {
              storiesWrapper.classList.add('galleri-fullsize')
            }

            storiesContainer.appendChild(storiesWrapper)
            storiesWrapper.appendChild(storiesGalleri)
            storiesContainer.appendChild(storiesOut)
            storiesContainer.style.setProperty('--galleri-opacity', this.opacity)

            if(storiesGalleri) {
              storiesGalleri.querySelectorAll('.galleri .galleri__el')[window.croakAPP.activeSlide].classList.add('stories-el_active')
              galleriSwipe(storiesGalleri.querySelectorAll('.galleri .galleri__el')[window.croakAPP.activeSlide], storiesGalleri, this.deskSwipe)
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
                  if(window.croakAPP.activeSlide === storiesGalleri.querySelectorAll('.galleri__el').length - 1) { 
                    return
                  }
                  nextClick(storiesGalleri)
                }
                else if(diffX < 0){
                  if(window.croakAPP.activeSlide === 0) { 
                    return
                  }
                  prevClick(storiesGalleri)
                }
              }
            }

            function keyEvent (event) {
              if(event.key === 'ArrowRight') {
                nextClick(storiesGalleri)
              }
              if(event.key === 'ArrowLeft') {
                prevClick(storiesGalleri)
              }
              if(event.key === 'd') {
                nextClick(storiesGalleri)
              }
              if(event.key === 'a') {
                prevClick(storiesGalleri)
              }
              if(event.key === 'Escape') {
                deleteGalleri(startXSwipe, startYSwipe, storiesContainer, storiesGalleri, keyEvent, mobTouchStart, mobTouchEnd)
              }
            }

            clickExit(storiesOut, startXSwipe, startYSwipe, storiesContainer, storiesGalleri, keyEvent, mobTouchStart, mobTouchEnd)

            if(this.buttons) {
              let nextBtn = createNextButton(storiesContainer, storiesGalleri, this.DOMElement)
              let prevBtn = createPrevButton(storiesContainer, storiesGalleri, this.DOMElement)
  
              nextBtn.addEventListener('click', () => {
                nextClick(storiesGalleri)
              })
              prevBtn.addEventListener('click', () => {
                prevClick(storiesGalleri)
              })
            }

            if(this.keyboard) {
              document.addEventListener('keydown', keyEvent)
            
              if(window.innerWidth <= 768) {
                document.removeEventListener('keydown', keyEvent)
              }
            }

            document.addEventListener('touchstart', mobTouchStart)
            document.addEventListener('touchend', mobTouchEnd)

            if(this.clickGalleri) {
              clickGalleri(storiesGalleri)
            }
            //clickGalleri(storiesGalleri) //works only when "keyboard" and "deskSwipe" and "deskSwipeFocus" are turned of
          })
        })
      })
    }
  }
}

heightControl()
window.addEventListener('resize', heightControl)

let frog = new croakSlider({
  DOMElement: "div[data-croak-container]",
  gap: 10,
  scale: .75,
  opacity: 0.95,
  //mobileVideo: true,
  deskStories: true,
  deskSwipe: true,   // works only when "clickGalleri" is turned of
  deskSwipeFocus: true,
  //clickGalleri: true,
  keyboard: true,
  //buttons: true,
});