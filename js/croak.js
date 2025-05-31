

import { createContainer } from "./create/createContainer.js"
import { createGallery } from "./create/createGallery.js"
import { createElements } from "./create/createElements.js"
import { createExitBtn } from "./create/createExitBtn.js"
import { createNextButton, createPrevButton } from "./create/createButtons.js"

import { clickGallery } from "./events/clickGallery.js"
import { gallerySwipe } from "./events/gallerySwipe.js"
import { nextClick } from "./events/nextClick.js"
import { prevClick } from "./events/prevClick.js"

import { clickExit } from "./events/clickExit.js"
import { deleteGallery } from "./delete/deleteGallery.js"
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
    this.clickGallery = false

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
    if(params.clickGallery === true) {
      this.clickGallery = true
    }

    if(this.DOMElement) {

      document.querySelectorAll(this.DOMElement).forEach((elContainer) => {
        elContainer.querySelectorAll('[data-el], [data-video-el]').forEach((elSlider, index, array) => {
          elSlider.addEventListener('click', () => {

            window.croakAPP.activeSlide = index
            setTimeout(() => {
              disableScroll()
            }, 350)

            let storiesGallery = createGallery(this.gap)
            createElements(array, storiesGallery, this.scale, this.mobileVideo, this.deskStories)

            let storiesOut = createExitBtn()
            let storiesContainer = createContainer(this.buttons)

            let storiesWrapper = document.createElement("div")
            storiesWrapper.classList.add('stories-wrapper')

            if(!this.deskStories) {
              storiesWrapper.classList.add('gallery-fullsize')
            }

            storiesContainer.appendChild(storiesWrapper)
            storiesWrapper.appendChild(storiesGallery)
            storiesContainer.appendChild(storiesOut)
            storiesContainer.style.setProperty('--gallery-opacity', this.opacity)

            if(storiesGallery) {
              storiesGallery.querySelectorAll('.gallery .gallery__el')[window.croakAPP.activeSlide].classList.add('stories-el_active')
              gallerySwipe(storiesGallery.querySelectorAll('.gallery .gallery__el')[window.croakAPP.activeSlide], storiesGallery, this.deskSwipe)
              setTimeout(() => {
                storiesGallery.classList.add('gallery_transform')
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
                  if(window.croakAPP.activeSlide === storiesGallery.querySelectorAll('.gallery__el').length - 1) { 
                    return
                  }
                  nextClick(storiesGallery)
                }
                else if(diffX < 0){
                  if(window.croakAPP.activeSlide === 0) { 
                    return
                  }
                  prevClick(storiesGallery)
                }
              }
            }

            function keyEvent (event) {
              if(event.key === 'ArrowRight') {
                nextClick(storiesGallery)
              }
              if(event.key === 'ArrowLeft') {
                prevClick(storiesGallery)
              }
              if(event.key === 'd') {
                nextClick(storiesGallery)
              }
              if(event.key === 'a') {
                prevClick(storiesGallery)
              }
              if(event.key === 'Escape') {
                deleteGallery(startXSwipe, startYSwipe, storiesContainer, storiesGallery, keyEvent, mobTouchStart, mobTouchEnd)
              }
            }

            clickExit(storiesOut, startXSwipe, startYSwipe, storiesContainer, storiesGallery, keyEvent, mobTouchStart, mobTouchEnd)

            if(this.buttons) {
              let nextBtn = createNextButton(storiesContainer, storiesGallery, this.DOMElement)
              let prevBtn = createPrevButton(storiesContainer, storiesGallery, this.DOMElement)
  
              nextBtn.addEventListener('click', () => {
                nextClick(storiesGallery)
              })
              prevBtn.addEventListener('click', () => {
                prevClick(storiesGallery)
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

            if(this.clickGallery) {
              clickGallery(storiesGallery)
            }
            //clickGallery(storiesGallery) //works only when "keyboard" and "deskSwipe" and "deskSwipeFocus" are turned of
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
  deskSwipe: true,   // works only when "clickGallery" is turned of
  deskSwipeFocus: true,
  //clickGallery: true,
  keyboard: true,
  //buttons: true,
});