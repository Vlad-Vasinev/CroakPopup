
export function createElements (array, storiesGalleri, scale, mobVideo, deskStories) {
  
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
      storiesElVideo.setAttribute('poster', "../../../CroakPopup/content/preload.JPG")

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