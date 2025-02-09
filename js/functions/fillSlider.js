
export function fillSlider (array, storiesGalleri, scale, mobVideo) {
  array.forEach((item) => {

    let storiesEl = document.createElement('div')
    storiesEl.classList.add('galleri__el')
    storiesEl.style.setProperty('--img-scale', scale)

    if(item.hasAttribute('data-video-el')) {
      let storiesElVideo = document.createElement('video')

      let sourceElement1 = document.createElement('source')
      let sourceElement2 = document.createElement('source')

      if(window.innerWidth <= 768 && mobVideo) {
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

      storiesElVideo.setAttribute('loop', true)
      storiesElVideo.setAttribute('playsinline', true)
      //storiesElVideo.setAttribute('poster', "../../content/preload.png")

      // storiesElVideo.muted = "muted"
      // storiesElVideo.style.width = "100%"
      // storiesElVideo.controls = true

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