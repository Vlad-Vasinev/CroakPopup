function createContainer (btnParam) {

  if(btnParam) {
    window.croakAPP.buttonsParam = true
  }

  let storiesContainerElement = document.createElement("div")
  document.body.append(storiesContainerElement)
  storiesContainerElement.classList.add('stories-container')
  setTimeout(() => {
    storiesContainerElement.classList.add('stories-container_active')
  }, 100)

  return storiesContainerElement

}

function createGallery (gap) {
  let stories = document.createElement('div')
  stories.classList.add('galleri')
  stories.style.setProperty('--galleri-gap', gap)
  stories.classList.add('galleri-opened')

  return stories

}

function createElements (array, storiesGalleri, scale, mobVideo, deskStories) {
  
  array.forEach((item) => {

    let storiesEl = document.createElement('div')
    if(deskStories && window.innerWidth >= 768) {
      storiesEl.classList.add('galleri__el')
      storiesEl.classList.add('galleri__el_stories')
      storiesEl.style.setProperty('--img-scale', scale)
    }
    else {
      storiesEl.classList.add('galleri__el')
      storiesEl.style.setProperty('--img-scale', scale)
    }

    if(item.hasAttribute('data-video-el')) {
      let storiesElVideo = document.createElement('video')

      let sourceElement1 = document.createElement('source')
      let sourceElement2 = document.createElement('source')

      if(mobVideo) {

        if(window.innerWidth <= 768) {
          sourceElement1.setAttribute('src', item.getAttribute('data-src-mob-mp4'))
          sourceElement2.setAttribute('src', item.getAttribute('data-src-mob-webm'))
  
          storiesElVideo.muted = "muted"
          storiesElVideo.style.width = "100%"
          storiesElVideo.controls = true
        }
        else {
          sourceElement1.setAttribute('src', item.getAttribute('data-src-mp4'))
          sourceElement1.setAttribute('type', 'video/mp4')
    
          sourceElement2.setAttribute('src', item.getAttribute('data-src-webm'))
          sourceElement2.setAttribute('type', 'video/webm')
        }

      }

      if(deskStories) { 
        sourceElement1.setAttribute('src', item.getAttribute('data-src-mob-mp4'))
        sourceElement1.setAttribute('type', 'video/mp4')
        sourceElement2.setAttribute('src', item.getAttribute('data-src-mob-webm'))
        sourceElement2.setAttribute('type', 'video/webm')
      }

      if(!deskStories && !mobVideo) {
        sourceElement1.setAttribute('src', item.getAttribute('data-src-mp4'))
        sourceElement1.setAttribute('type', 'video/mp4')
  
        sourceElement2.setAttribute('src', item.getAttribute('data-src-webm'))
        sourceElement2.setAttribute('type', 'video/webm')
      }

      storiesElVideo.setAttribute('loop', true)
      storiesElVideo.setAttribute('playsinline', true)

      storiesElVideo.appendChild(sourceElement1)
      storiesElVideo.appendChild(sourceElement2)
      storiesElVideo.setAttribute('preload', true)
      storiesEl.append(storiesElVideo)
      storiesGalleri.append(storiesEl)
    }
    else {
      let storiesElImg = document.createElement('img')
      storiesElImg.setAttribute('src', item.getAttribute('src'))
      storiesEl.append(storiesElImg)
      storiesGalleri.append(storiesEl)

    }
  })
}

function createExitBtn () {
  let storiesOutBtn = document.createElement('button')
  storiesOutBtn.classList.add('close-gallery')
  const svgString = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.63599 18.364L18.3639 5.63603M5.63599 5.63604L18.3639 18.364" stroke="black" stroke-width="1.5" stroke-linecap="round"/></svg>';
  const parser = new DOMParser()
  const svgElement = parser.parseFromString(svgString, 'image/svg+xml').querySelector('svg')
  storiesOutBtn.append(svgElement)

  return storiesOutBtn

}

function createNextButton (storiesContainer, storiesGalleri, domEl) {
  if(window.croakAPP.buttonsParam) {
    
    let customNextArrow = document.querySelector(domEl).querySelector('.stories-next').cloneNode()

    storiesContainer.appendChild(customNextArrow)
    customNextArrow.classList.add('custom-right')

    if(window.croakAPP.activeSlide == storiesGalleri.querySelectorAll('.galleri__el').length - 1) {
      customNextArrow.setAttribute('disabled', true)
      customNextArrow.classList.add('btn_disabled')
    }

    return customNextArrow
  }
}

function createPrevButton (storiesContainer, storiesGalleri, domEl) {
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

function clickGalleri (storiesGalleri) {
  document.querySelectorAll('.galleri .galleri__el').forEach((element, indexEl) => {
    element.addEventListener('click', (e) => {
      document.querySelectorAll('.galleri .galleri__el').forEach(element => {
        element.classList.remove('stories-el_active')
      })

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
        if(window.croakAPP.activeSlide == storiesGalleri.querySelectorAll('.galleri__el').length - 1) {
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

function galleriSwipe(el, galleriEssence, deskSwipe) {
  let elRight = el.getBoundingClientRect().right
  el.parentElement.querySelectorAll('video').forEach((el) => {
    el.removeAttribute('autoplay')
    el.pause()
  })

  if(deskSwipe === undefined) {
    deskSwipe = false
  }

  let videoEl = el.querySelector('video')

  if(videoEl && el.classList.contains('stories-el_active')) {
    videoEl.setAttribute('autoplay', true)
    videoEl.play()
  }

  function checkCenter (el) {
    let elCenter = el.getBoundingClientRect().left + (el.getBoundingClientRect().width / 2)
    return elCenter <= ((window.innerWidth / 2) + (el.getBoundingClientRect().width / window.elementScale / 2)) && elCenter >= ((window.innerWidth / 2) - (el.getBoundingClientRect().width / window.elementScale / 3))
  }

  let distanceCheck = (galleriEssence.getBoundingClientRect().width / 2) - elRight

  const galleriEssenceRect = galleriEssence.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();
  const translateX = -(distanceCheck + galleriEssenceRect.left + (elRect.width / 2));
  galleriEssence.style.transform = `translate3d(${-Math.round(translateX)}px, ${-50}%, 0)`
  //galleriEssence.style.transform = `translate3d(${-translateX}px, ${-50}%, 0)`

  let galleriScrW = galleriEssence.scrollWidth
  let galleriWrapper = galleriEssence.parentElement
  let galleriWrapperClW = galleriWrapper.clientWidth

  let startX = 0 
  let isActive = false

  let prevDiff = -translateX
  let diff = 0
  let counter = 0

  let rightBoundary = (galleriWrapperClW - galleriScrW)

  function startSwipe (e) {
    e.preventDefault()

    galleriEssence.style.cursor = "grabbing"
    isActive = true

    startX = e.clientX
  }
  function moveSwipe (e) {
    e.preventDefault()
    if(!isActive) {
      return
    }

    if(counter === 0) {
      galleriEssence.querySelectorAll('.galleri__el').forEach((el, index, array) => {
        el.classList.remove('stories-el_active')
        el.style.pointerEvents = "none"
        el.parentElement.querySelectorAll('video').forEach((el) => {
          el.removeAttribute('autoplay')
          el.pause()
        })
      })
      counter++
    }

    diff = (startX - e.clientX - prevDiff)
    let currDiff = -diff

    if(diff < -(galleriScrW - galleriWrapperClW)) {
      diff += currDiff - (galleriScrW - galleriWrapperClW + 20)
    }
    if(currDiff < rightBoundary){
      diff += currDiff - (rightBoundary - 20)
    }

    galleriEssence.style.transform = `translate3d(${-diff}px, ${-50}%, 0)`
  
    if(window.deskSwipeFocus) {
      galleriEssence.querySelectorAll('.galleri__el').forEach((item, index, array) => {
        if(checkCenter(item)) {
          item.classList.add('stories-el_active')
          window.croakAPP.activeSlide = index
        }
        else {
          item.classList.remove('stories-el_active')
        }
      })
    }

  }
  function endSwipe (e) {
    isActive = false
    galleriEssence.style.cursor = "grab"

    prevDiff = -diff

    galleriEssence.querySelectorAll('.galleri__el').forEach((el) => {
      el.style.pointerEvents = "initial"
    })
    counter = 0

  }
  if(window.innerWidth >= 768 && window.deskSwipe) {
    galleriWrapper.addEventListener('mousedown', startSwipe)
    galleriWrapper.addEventListener('mousemove', moveSwipe)
    galleriWrapper.addEventListener('mouseup', endSwipe)
    galleriWrapper.addEventListener('mouseleave', endSwipe)
  }
}

function nextClick(storiesGalleri) {

  let lengthEl = storiesGalleri.querySelectorAll('.galleri .galleri__el').length

  document.querySelectorAll('.galleri .galleri__el').forEach(element => {
    element.classList.remove('stories-el_active')
  })

  if(window.croakAPP.buttonsParam) {
    let storiesContainer = storiesGalleri.parentElement.parentElement
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

    let elActive = storiesGalleri.querySelectorAll('.galleri .galleri__el')[window.croakAPP.activeSlide]
    elActive.classList.add('stories-el_active')
    galleriSwipe(elActive, storiesGalleri)
  }
}

function prevClick(storiesGalleri) {

  if(window.croakAPP.buttonsParam) {

    let lengthEl = storiesGalleri.querySelectorAll('.galleri .galleri__el').length
    let storiesContainer = storiesGalleri.parentElement.parentElement
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

  document.querySelectorAll('.galleri .galleri__el').forEach(element => {
    element.classList.remove('stories-el_active')
  })

  if(window.croakAPP.activeSlide != 0) {
    window.croakAPP.activeSlide -= 1
    let elActive = storiesGalleri.querySelectorAll('.galleri .galleri__el')[window.croakAPP.activeSlide]
    elActive.classList.add('stories-el_active')
    galleriSwipe(elActive, storiesGalleri)
  }
}

function clickExit (storiesOut, startXSwipe, startYSwipe, storiesContainer, storiesGalleri, keyEvent, mobTouchStart, mobTouchEnd) {
  storiesOut.addEventListener('click', () => {
    deleteGalleri(startXSwipe, startYSwipe, storiesContainer, storiesGalleri, keyEvent, mobTouchStart, mobTouchEnd)
  })
}

function remClassContainer (storiesContainer) {
  return new Promise((resolve) => {
    storiesContainer.classList.remove('stories-container_active')
    resolve()
  })
}
function remFromBody(storiesContainer) {
  document.body.removeChild(storiesContainer)
}
async function delContainer (storiesContainer) {
  await remClassContainer(storiesContainer)
  setTimeout(() => {
    remFromBody(storiesContainer)
  }, 300)
}

function deleteGalleri(startXSwipe, startYSwipe, storiesContainer, storiesGalleri, keyEvent, mobTouchStart, mobTouchEnd) {
  document.removeEventListener('keydown', keyEvent)
  startXSwipe = 0
  startYSwipe = 0
  document.removeEventListener('touchstart', mobTouchStart)
  document.removeEventListener('touchend', mobTouchEnd)
  window.croakAPP.activeSlide = undefined
  delContainer(storiesContainer)
  enableScroll()
  storiesGalleri.classList.remove('galleri_transform')
  if(window.croakAPP.buttonsParam) {

    let storiesContainer = storiesGalleri.parentElement.parentElement
    let prevBtn = storiesContainer.querySelector('.stories-prev')
    let storiesNext = storiesContainer.querySelector('.stories-next')

    setTimeout(() => {

      prevBtn.removeAttribute('disabled')
      prevBtn.classList.remove('btn_disabled')
      storiesNext.removeAttribute('disabled')
      storiesNext.classList.remove('btn_disabled')
      
      window.croakAPP.buttonsParam = false
    }, 300)
  }
}

let scrollPosition = 0
let bodyEl = document.querySelector('body')
function disableScroll () {
  scrollPosition = window.pageYOffset;
  bodyEl.style.overflow = 'hidden';
  bodyEl.style.position = 'fixed';
  bodyEl.style.top = `-${scrollPosition}px`;
  bodyEl.style.width = '100%';
}
function enableScroll () {
  bodyEl.style.removeProperty('overflow');
  bodyEl.style.removeProperty('position');
  bodyEl.style.removeProperty('top');
  bodyEl.style.removeProperty('width');
  window.scrollTo(0, scrollPosition);
}

const heightControl = () => {
  const doc = document.documentElement
  doc.style.setProperty('--app-height', `${window.innerHeight}px`)
}

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
              document.querySelectorAll('.galleri .galleri__el').forEach(element => {
                element.classList.remove('stories-el_active')
              })
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

            clickGalleri(storiesGalleri)
              
          })
        })
      })
    }
  }
}

heightControl()
window.addEventListener('resize', heightControl)