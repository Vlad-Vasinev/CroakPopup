
export function galleriSwipe(el, galleriEssence, deskSwipe) {
  
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
    return elCenter <= ((window.innerWidth / 2) + (el.getBoundingClientRect().width / window.elementScale / 2)) && elCenter >= ((window.innerWidth / 2) - (el.getBoundingClientRect().width / window.elementScale / 2))
    // return elCenter <= ((window.innerWidth / 2) + (el.getBoundingClientRect().width / window.elementScale / 2)) && elCenter >= ((window.innerWidth / 2) - (el.getBoundingClientRect().width / window.elementScale / 3))
  }

  let distanceCheck = (galleriEssence.getBoundingClientRect().width / 2) - elRight

  const galleriEssenceRect = galleriEssence.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();
  let translateX = -(distanceCheck + galleriEssenceRect.left + (elRect.width / 2));
  galleriEssence.style.transform = `translate3d(${-Math.round(translateX)}px, ${-50}%, 0)`
  //galleriEssence.classList.add('galleri_transform')
  //galleriEssence.style.transform = `translate3d(${-translateX}px, ${-50}%, 0)`

  let galleriScrW = galleriEssence.scrollWidth
  let galleriWrapper = galleriEssence.parentElement
  let galleriWrapperClW = galleriWrapper.clientWidth

  let startX = 0 
  let isActive = false

  let prevDiff = -translateX
  let diff = 0
  let counter = 0

  let rightBoundary = (galleriWrapperClW - galleriScrW - elRect.width - elRect.width / 2)
  let leftBoundary = -(galleriScrW - galleriWrapperClW + elRect.width + elRect.width / 2)

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
      prevDiff = -translateX
      galleriEssence.querySelectorAll('.galleri__el').forEach((el, index, array) => {
        el.classList.remove('stories-el_active')
        el.style.pointerEvents = "none"
        el.parentElement.querySelectorAll('video').forEach((el) => {
          el.removeAttribute('autoplay')
          el.pause()
        })
      })
      galleriEssence.classList.remove('galleri_transform')
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

    galleriEssence.style.transform = `translate3d(${-diff}px, ${-50}%, 0)`

  }
  function endSwipe () {
    if(window.deskSwipeFocus) {
      galleriEssence.querySelectorAll('.galleri__el').forEach((item, index, array) => {
        if(checkCenter(item)) {

            let distanceCheck = (galleriEssence.getBoundingClientRect().width / 2) - item.getBoundingClientRect().right

            const galleriEssenceRect = galleriEssence.getBoundingClientRect();
            const elRect = item.getBoundingClientRect();
            translateX = -(distanceCheck + galleriEssenceRect.left + (elRect.width / 2));

            window.croakAPP.activeSlide = index
        }
      })
    }
    //prevDiff = -translateX
    setTimeout(() => {
      galleriEssence.classList.add('galleri_transform')
      
      // galleriEssence.style.transform = `translate3d(${-diff}px, ${-50}%, 0)` getElementsByClassName
      galleriEssence.style.transform = `translate3d(${-Math.round(translateX)}px, ${-50}%, 0)`
      //let newActive = galleriEssence.querySelectorAll('.galleri__el')[window.croakAPP.activeSlide]
      let newActive = galleriEssence.getElementsByClassName('galleri__el')[window.croakAPP.activeSlide]
      newActive.classList.add('stories-el_active')
      if(newActive.querySelector('video')) {
        newActive.querySelector('video').play()
      }
    }, 200)

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
  if(window.innerWidth <= 768 && window.deskSwipe) {
    galleriEssence.classList.add('galleri_transform')
  }

}