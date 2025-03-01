
import { closeStories } from "./closeStories.js"

export function storiesExit (storiesOut, startXSwipe, startYSwipe, storiesContainer, storiesGalleri, keyEvent, mobTouchStart, mobTouchEnd) {
  storiesOut.addEventListener('click', () => {
    closeStories(startXSwipe, startYSwipe, storiesContainer, storiesGalleri, keyEvent, mobTouchStart, mobTouchEnd)
  })
}