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

1. Add croak container:
```
<div data-croak-container>

</div>
```

2. Add control buttons(optional):
```
<div data-croak-container>
  <button class="stories-prev"></button>
  <button class="stories-next"></button>
</div>
```

3. Add **`data-el`** attribute to specify **`img`** elements:
```
<img src="slider/yourimage.jpg" data-el>
```

4. Add **`data-video-el`**, **`data-src`** attributes to specify **`video`** elements:
```
<div
  data-video-el
  data-src-webm="content/yourvideo.webm"
  data-src-mp4="content/yourvideo.mp4"
  data-src-mob-mp4="content/yourvideo.mp4"
  data-src-mob-mp4="content/yourvideo.webm"
  >

  <img src="content/yourimage.jpg">
</div>
```

5. Add **`data-video-el`**, **`data-src`** attributes to your **`img`** to specify video elements:
```
<img src="slider/yourimage.jpg" data-el data-video-el data-src-webm="slider/yourvideo.webm" data-src-mp4="slider/yourvideo.mp4">
```

6. Add the "marker" to your HTML:
```
<hr class="marker">
```

7. Your basic HTML for images only:
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

8. Your basic HTML for images + video:
```
<hr class="marker">
<div data-croak-container>
  <button class="stories-prev"></button>
  <button class="stories-next"></button>

  <img src="content/yourimage.png" data-el>
  <div data-video-el data-src-webm="content/yourvideo.webm" data-src-mp4="content/yourvideo.mp4">
    <img src="content/yourimage.jpg">
  </div>
  <img src="content/yourimage.png" data-el>
  <div data-video-el data-src-webm="content/yourvideo.webm" data-src-mp4="content/yourvideo.mp4">
    <img src="content/yourimage.jpg">
  </div>
</div>
```

9. Create basic popup essence:
```
let frog = new croakSlider({
  stories: {
    DOMElement: "div[data-croak-container]",
    gap: 50,
    scale: .75,
    opacity: 0.95,
    mobileVideo: true
  },
});
```

10. use 
- gap
- scale
- opacity 
in order to set **`gap`** between slides, **`scale`** of slides and **`opacity`** of the background respectively

# How does it work?

- the main logic hides behind getDistanceStories function, it takes 2 parametres: current element aka as **`el`**
and galleri wrapper, aka as **`storiesGallery`**
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
- https://croak-popup-v21.vercel.app/
- 

# Code Examples:

- 
- 
- 
