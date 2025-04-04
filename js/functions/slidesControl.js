
export function getDistanceStories(el, galleriEssence, deskSwipe) {
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
  galleriEssence.style.transform = `translate3d(${-translateX}px, ${-50}%, 0)`

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

    galleriEssence.style.transform = `translate3d(${-diff}px, ${-(galleriEssence.getBoundingClientRect().height / 2)}px, 0)`
  
    if(window.deskSwipeFocus) {
      galleriEssence.querySelectorAll('.galleri__el').forEach((item, index, array) => {
        if(checkCenter(item)) {
          item.classList.add('stories-el_active')
          window.countIndex = index
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