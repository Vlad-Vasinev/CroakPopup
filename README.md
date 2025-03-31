# Croak Popup(JavaScript popup)💻

## Features:
- keyboard control ("ArrowLeft"/"ArrowRight", "A"/"D", "Escape") 💡
- custom buttons control (left/right) 💡
- slide click control 💡
- swipe control (mobile, desktop(experimental)) 💡🔬

# Let's get started
1. Install croak:
```
npm i vanilla-croakpopup
```

2. Add CSS and JS:
```
<link rel="stylesheet" href="/node_modules/vanilla-croakpopup/css/croak.min.css">

<script type="module" src="/node_modules/vanilla-croakpopup/js/croak.min.js"></script>
<script type="module" src="/js/yourscript.js"></script>
```

3. Add croak container:
```
<div data-croak-container>

</div>
```

4. Add control buttons(optional):
```
<div data-croak-container>
  <button class="stories-prev"></button>
  <button class="stories-next"></button>
</div>
```

5. Add **`data-el`** attribute to specify **`img`** elements:
```
<img src="yourpath/yourimage.jpg" data-el>
```

6. Add **`data-video-el`**, **`data-src`** attributes to specify **`video`** elements:
```
<div
  data-video-el
  data-src-webm="yourpath/yourvideo.webm"
  data-src-mp4="yourpath/yourvideo.mp4"
  data-src-mob-mp4="yourpath/yourvideo.mp4"
  data-src-mob-webm="yourpath/yourvideo.webm"
  >

  <img src="yourpath/yourimage.jpg">
</div>
```

7. Add **`data-video-el`**, **`data-src`** attributes to your **`img`** to specify video elements:
```
<img
  src="yourpath/yourimage.jpg"

  data-video-el
  data-src-webm="yourpath/yourvideo.webm"
  data-src-mp4="yourpath/yourvideo.mp4"
  data-src-mob-mp4="yourpath/yourvideo.mp4"
  data-src-mob-webm="yourpath/yourvideo.webm"
>
```

8. Your basic HTML for images only:
```
<div data-croak-container>
  <button class="stories-prev"></button>
  <button class="stories-next"></button>

  <img src="yourpath/yourimage1.png" data-el>
  <img src="yourpath/yourimage2.png" data-el>
  <img src="yourpath/yourimage3.png" data-el>
</div>
```

9. Your basic HTML for images + video:
```
<div data-croak-container>
  <button class="stories-prev"></button>
  <button class="stories-next"></button>

  <img src="yourpath/yourimage1.png" data-el>
  <div
    data-video-el
    data-src-webm="yourpath/yourvideo1.webm"
    data-src-mp4="yourpath/yourvideo1.mp4"
    data-src-mob-mp4="yourpath/yourvideo1.mp4"
    data-src-mob-webm="yourpath/yourvideo1.webm"
    >

    <img src="yourpath/yourimage1.jpg">
  </div>

  <img src="yourpath/yourimage2.png" data-el>
  <div
    data-video-el
    data-src-webm="yourpath/yourvideo2.webm"
    data-src-mp4="yourpath/yourvideo2.mp4"
    data-src-mob-mp4="yourpath/yourvideo2.mp4"
    data-src-mob-webm="yourpath/yourvideo2.webm"
    >

    <img src="yourpath/yourimage2.jpg">
  </div>
</div>
```

10. Create basic popup essence:
```
import { croakSlider } from "../node_modules/vanilla-croakpopup/js/croak.min.js"

let frog = new croakSlider({
  stories: {
    DOMElement: "div[data-croak-container]",
    gap: 50,
    scale: .75,
    opacity: 0.95,
    deskStories: true, //optional
    deskSwipe: true, // optional🔬
    //mobileVideo: true, //optional
    keyboard: true, //optional
    buttons: true, //optional
  },
});
```

11. use 
- gap
- scale
- opacity 
in order to set **`gap`** between slides, **`scale`** of slides and **`opacity`** of the background respectively

## You have done it🥰

# How does it work?

- the main logic hides behind getDistanceStories function, it takes 2 parametres: current element aka as **`el`**
and galleri wrapper, aka as **`storiesGallery`**
- simply put, the function counts the distance between the center of the screen and the element's distance from the right screen corner

- whole function's code: 
```
function getDistanceStories(el, galleriEssence) {
  let elRight = el.getBoundingClientRect().right

  let distanceCheck = (galleriEssence.getBoundingClientRect().width / 2) - elRight
  galleriEssence.style.transform = `translateX(${distanceCheck + galleriEssence.getBoundingClientRect().left + (el.getBoundingClientRect().width / 2)}px) translateY(-50%)`
}
```
# Examples:

- https://croak-popup-v1.vercel.app/
- https://croak-popup-v21.vercel.app/
- 

# Code Examples:

- https://codepen.io/Vlad_Vasinev/pen/ZYEWwqL **`horizontal-view`**, **`no-buttons`**, **`no-keyboard`**
- https://codepen.io/Vlad_Vasinev/pen/ByaKboN **`vertical-view`**, **`keyboard`**
- https://codepen.io/Vlad_Vasinev/pen/RNwKKGM **`vertical-view`**, **`keyboard`**, **`buttons`**

# Tutorial:

- https://youtu.be/BCNzKoOepxY?si=U0RJ62vWuF2lzJKu
