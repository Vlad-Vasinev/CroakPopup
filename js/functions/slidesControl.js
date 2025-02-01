
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