
export function gallerySwipe(el, galleryEssence, deskSwipe) {
  
  let elRight = el.getBoundingClientRect().right
  el.parentElement.querySelectorAll('video').forEach((el) => {
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
    return elCenter <= ((window.innerWidth / 2) + (el.getBoundingClientRect().width / window.elementScale / 2)) && elCenter >= ((window.innerWidth / 2) - (el.getBoundingClientRect().width / window.elementScale / 2))
  }

  let distanceCheck = (galleryEssence.getBoundingClientRect().width / 2) - elRight

  const galleryEssenceRect = galleryEssence.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();
  let translateX = -(distanceCheck + galleryEssenceRect.left + (elRect.width / 2));

  galleryEssence.style.transform = `translate3d(${-Math.round(translateX)}px, ${-50}%, 0)`

  let galleryScrW = galleryEssence.scrollWidth
  let galleryWrapper = galleryEssence.parentElement
  let galleryWrapperClW = galleryWrapper.clientWidth

  let startX = 0 
  let isActive = false

  let prevDiff = -translateX
  let diff = 0
  let counter = 0

  let rightBoundary = (galleryWrapperClW - galleryScrW - elRect.width - elRect.width / 2)
  let leftBoundary = -(galleryScrW - galleryWrapperClW + elRect.width + elRect.width / 2)

  function startSwipe (e) {
    e.preventDefault()

    galleryEssence.querySelectorAll('.gallery__el').forEach((el, index, array) => {
      if(el.querySelector('video')) {
        el.querySelector('video').pause()
      }
    })

    galleryEssence.style.cursor = "grabbing"
    isActive = true
    galleryEssence.classList.remove('gallery_transform')

    startX = e.clientX
  }
  function moveSwipe (e) {
    e.preventDefault()
    if(!isActive) {
      return
    }

    if(counter === 0) {
      prevDiff = -translateX
      galleryEssence.querySelectorAll('.gallery__el')[window.croakAPP.activeSlide].classList.remove('stories-el_active')
      counter++
    }

    diff = (startX - e.clientX - prevDiff)
    let currDiff = -diff

    if(diff < leftBoundary) {
      diff += currDiff + (leftBoundary + 20)
    }
    if(currDiff < rightBoundary){
      diff += currDiff - (rightBoundary - 20)
    }

    galleryEssence.style.transform = `translate3d(${-diff}px, ${-50}%, 0)`

  }
  function endSwipe () {
    if(window.deskSwipeFocus) {
      galleryEssence.querySelectorAll('.gallery__el').forEach((item, index, array) => {
        if(checkCenter(item)) {

            let distanceCheck = (galleryEssence.getBoundingClientRect().width / 2) - item.getBoundingClientRect().right

            const galleryEssenceRect = galleryEssence.getBoundingClientRect();
            const elRect = item.getBoundingClientRect();
            translateX = -(distanceCheck + galleryEssenceRect.left + (elRect.width / 2));

            window.croakAPP.activeSlide = index
        }
      })
    }

    setTimeout(() => {

      galleryEssence.classList.add('gallery_transform')
      galleryEssence.style.transform = `translate3d(${-Math.round(translateX)}px, ${-50}%, 0)`

      let newActive = galleryEssence.getElementsByClassName('gallery__el')[window.croakAPP.activeSlide]
      newActive.classList.add('stories-el_active')
      if(newActive.querySelector('video')) {
        newActive.querySelector('video').play()
      }
    }, 200)

    isActive = false
    galleryEssence.style.cursor = "grab"

    prevDiff = -diff
    counter = 0
  }

  if(window.innerWidth >= 768 && window.deskSwipe) {
    galleryWrapper.addEventListener('mousedown', startSwipe)
    galleryWrapper.addEventListener('mousemove', moveSwipe)
    galleryWrapper.addEventListener('mouseup', endSwipe)
    galleryWrapper.addEventListener('mouseleave', endSwipe)
  }
  if(window.innerWidth <= 768 && window.deskSwipe) {
    galleryEssence.classList.add('gallery_transform')
  }

}