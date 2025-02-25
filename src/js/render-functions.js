import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function renderGallery(images, isNewSearch = false) {
    const gallery = document.querySelector('#gallery');
  
    if (isNewSearch) {
      gallery.innerHTML = '';
    }
  
    const markup = images.map(({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => `
    <a href="${largeImageURL}" class="gallery-item">
      <img src="${webformatURL}" alt="${tags}" />
      <div class="image-info">
        <p><b>Likes</b> ${likes}</p>
        <p><b>Views</b> ${views}</p>
        <p><b>Comments</b> ${comments}</p>
        <p><b>Downloads</b> ${downloads}</p>
      </div>
    </a>
  `).join('');
  
    gallery.insertAdjacentHTML('beforeend', markup);

      lightbox.refresh();
    }

    export function smoothScroll() {
        const cardElement = document.querySelector('.gallery-item');
        let cardHeight = 100;

        if (cardElement) {
          cardHeight = cardElement.getBoundingClientRect().height;
        }
      
        window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
      }
      