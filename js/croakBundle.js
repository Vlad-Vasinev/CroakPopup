
export function getDistanceStories(el, galleriEssence) {
  let elRight = el.getBoundingClientRect().right
  el.parentElement.querySelectorAll('video').forEach((el) => {
    el.removeAttribute('autoplay')
    el.pause()
  })

  let videoEl = el.querySelector('video')

  if(videoEl && el.classList.contains('stories-el_active')) {
    videoEl.setAttribute('autoplay', true)
    videoEl.play()
  }
  let markerRight = document.querySelector('.marker').getBoundingClientRect().left
  let distanceCheck = markerRight - elRight
  galleriEssence.style.transform = `translateX(${distanceCheck + galleriEssence.getBoundingClientRect().left + (el.getBoundingClientRect().width / 2)}px) translateY(-50%)`
}

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
  console.log(elActiveIn)

  if(window.countIndex === lengthEl - 1) {
    storiesGalleri.parentElement.parentElement.querySelector('.stories-next').removeAttribute('disabled')
    storiesGalleri.parentElement.parentElement.querySelector('.stories-next').classList.remove('btn_disabled')
  }
  if(window.countIndex === 1) {
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

function remClassContainer (storiesContainer) {
  return new Promise((resolve) => {
    storiesContainer.classList.remove('stories-container_active')
    resolve()
  })
}
function remFromBody(storiesContainer) {
  document.body.removeChild(storiesContainer)
}
export async function delStoriesContainer (storiesContainer) {
  await remClassContainer(storiesContainer)
  setTimeout(() => {
    remFromBody(storiesContainer)
  }, 300)
}

export function storiesExit (storiesOut, startXSwipe, startYSwipe, storiesContainer, storiesGalleri, keyEvent, mobTouchStart, mobTouchEnd) {
  storiesOut.addEventListener('click', () => {
    document.removeEventListener('keydown', keyEvent)
    startXSwipe = 0
    startYSwipe = 0
    document.removeEventListener('touchstart', mobTouchStart)
    document.removeEventListener('touchend', mobTouchEnd)
    window.countIndex = undefined
    delStoriesContainer(storiesContainer)
    enableScroll()
    storiesGalleri.classList.remove('galleri_transform')

    setTimeout(() => {

      storiesGalleri.parentElement.parentElement.querySelector('.stories-prev').removeAttribute('disabled')
      storiesGalleri.parentElement.parentElement.querySelector('.stories-prev').classList.remove('btn_disabled')

      storiesGalleri.parentElement.parentElement.querySelector('.stories-next').removeAttribute('disabled')
      storiesGalleri.parentElement.parentElement.querySelector('.stories-next').classList.remove('btn_disabled')
    }, 300)
  })
}

export function storiesExitBtn () {
  let storiesOutBtn = document.createElement('button')
  storiesOutBtn.classList.add('close-gallery')
  const svgString = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.63599 18.364L18.3639 5.63603M5.63599 5.63604L18.3639 18.364" stroke="black" stroke-width="1.5" stroke-linecap="round"/></svg>';
  const parser = new DOMParser()
  const svgElement = parser.parseFromString(svgString, 'image/svg+xml').querySelector('svg')
  storiesOutBtn.append(svgElement)

  return storiesOutBtn

}

export function sliderOpen (storiesGalleri) {
  document.querySelectorAll('.galleri .galleri__el').forEach((element, indexEl) => {
    element.addEventListener('click', (e) => {
      document.querySelectorAll('.galleri .galleri__el').forEach(element => {
        element.classList.remove('stories-el_active')
      })

      window.countIndex = indexEl
      e.currentTarget.classList.add('stories-el_active')
      getDistanceStories(e.currentTarget, storiesGalleri)

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

    })
  })
}

let scrollPosition = 0
let bodyEl = document.querySelector('body')
export function disableScroll () {
  scrollPosition = window.pageYOffset;
  bodyEl.style.overflow = 'hidden';
  bodyEl.style.position = 'fixed';
  bodyEl.style.top = `-${scrollPosition}px`;
  bodyEl.style.width = '100%';
}
export function enableScroll () {
  bodyEl.style.removeProperty('overflow');
  bodyEl.style.removeProperty('position');
  bodyEl.style.removeProperty('top');
  bodyEl.style.removeProperty('width');
  window.scrollTo(0, scrollPosition);
}

export function storiesGallery (gap) {
  let stories = document.createElement('div')
  stories.classList.add('galleri')
  stories.style.setProperty('--galleri-gap', gap)
  stories.classList.add('galleri-opened')

  return stories

}

export function storiesContainerEl () {
  let storiesContainerElement = document.createElement("div")
  document.body.append(storiesContainerElement)
  storiesContainerElement.classList.add('stories-container')
  setTimeout(() => {
    storiesContainerElement.classList.add('stories-container_active')
  }, 100)

  return storiesContainerElement

}

export function fillSlider (array, storiesGalleri, scale, mobVideo, deskStories) {
  
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

export const appHeight = () => {
  const doc = document.documentElement
  doc.style.setProperty('--app-height', `${window.innerHeight}px`)
}

class croakSlider {
  constructor(object) {
    this.stories = false
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
                console.log('move left')
                if(window.countIndex !== 0)
                leftMovement(storiesGalleri)
              }
            }

            storiesExit(storiesOut, startXSwipe, startYSwipe, storiesContainer, storiesGalleri, keyEvent, mobTouchStart, mobTouchEnd)

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

            document.addEventListener('keydown', keyEvent)
            
            if(window.innerWidth <= 768) {
              document.removeEventListener('keydown', keyEvent)
              document.addEventListener('touchstart', mobTouchStart)
              document.addEventListener('touchend', mobTouchEnd)
            }

            customPrevArrow.addEventListener('click', () => {
              leftMovement(storiesGalleri)
            })
            customNextArrow.addEventListener('click', () => {
              rightMovement(storiesGalleri)
            })

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
  },
});
