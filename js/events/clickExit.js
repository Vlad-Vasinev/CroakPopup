
import { deleteGallery } from "../delete/deleteGallery.js"

export function clickExit (storiesOut, startXSwipe, startYSwipe, storiesContainer, storiesGallery, keyEvent, mobTouchStart, mobTouchEnd) {
  storiesOut.addEventListener('click', () => {
    deleteGallery(startXSwipe, startYSwipe, storiesContainer, storiesGallery, keyEvent, mobTouchStart, mobTouchEnd)
  })
}