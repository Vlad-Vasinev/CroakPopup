# Croak Popup(JavaScript popup)💻

## This project is using:
- HTML: basic html-layout 💡
- CSS: popup's styling 💡
- JS: popup's logic 💡

## Features:
- keyboard control (left/right) 💡
- custom buttons control (left/right) 💡
- slide click control 💡
- swipe control (mobile only) 💡

# Let's get started

1. Add croak container
```
<div data-croak-container>

</div>
```

2. Add control buttons if you need it
```
<div data-croak-container>
  <button class="stories-prev"></button>
  <button class="stories-next"></button>
</div>
```

3. Add following attribute: data-el
```
data-el
```
to your desirable popup elements

4. Fill your popup element with img:
```
<img src="slider/yourimage.jpg" data-el>
```
5. Video(img inside div as a preview)
```
<div data-el data-video-el data-src-webm="slider/yourvideo.webm" data-src-mp4="slider/yourvideo.mp4">
  <img src="slider/yourimage.jpg">
</div>
```
6. Video(you can use img and put **data-video-el** to specify video element):
```
<img src="slider/yourimage.jpg" data-el data-video-el data-src-webm="slider/yourvideo.webm" data-src-mp4="slider/yourvideo.mp4">
```

7. Add the "marker" to your HTML, it allows Croak to count slides properly
```
<hr class="marker">
```

8. Your basic HTML for images only:
```
<hr class="marker">
<div data-croak-container>
  <button class="stories-prev"></button>
  <button class="stories-next"></button>

  <img src="content/yourimage.png" data-el>
  <img src="content/yourimage.png" data-el>
  <img src="content/yourimage.png" data-el>
</div>
```

9. Your basic HTML for images + video:
```
<hr class="marker">
<div data-croak-container>
  <button class="stories-prev"></button>
  <button class="stories-next"></button>

  <img src="content/yourimage.png" data-el>
  <div data-el data-video-el data-src-webm="content/yourvideo.webm" data-src-mp4="content/yourvideo.mp4">
    <img src="content/yourimage.jpg">
  </div>
  <img src="content/yourimage.png" data-el>
  <div data-el data-video-el data-src-webm="content/yourvideo.webm" data-src-mp4="content/yourvideo.mp4">
    <img src="content/yourimage.jpg">
  </div>
</div>
```

10. Create basic popup essence:
```
let frog22 = new croakSlider({
  stories: {
    DOMElement: "div[data-croak-container]",
    customGap: {
      customGapValue: 160
    },
    customScale: {
      customScaleValue: 1.25
    },
    customOpacity: {
      customOpacityValue: 0.95
    }
  },
});
```

11. use 
- customGapValue
- customScaleValue
- customOpacityValue 
in order to set **gap** between slides, **scale** of slides and **opacity** of the background respectively

# How does it work?

- the main logic hides behind getDistanceStories function, it takes 2 parametres: current element aka as "el"
and galleri wrapper, aka as "storiesGallery"
- simply put, the function counts the distance between the marker and the element's distance from the right screen corner

- whole function's code: 
```
function getDistanceStories(el, galleriEssence) {
  let elRight = el.getBoundingClientRect().right
  let markerRight = document.querySelector('.marker').getBoundingClientRect().left
  let distanceCheck = markerRight - elRight

  galleriEssence.style.transform = `translateX(${distanceCheck + galleriEssence.getBoundingClientRect().left + (el.getBoundingClientRect().width / 2)}px) translateY(-50%)`
}
```
# Examples:

- https://croak-popup-v1.vercel.app/
- 
- 

# Code Examples:

- 
- 
- 
