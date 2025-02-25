import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, smoothScroll } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  form: document.querySelector('#search-form'),
  input: document.querySelector('#search-input'),
  loader: document.querySelector('#loader'),
  gallery: document.querySelector('#gallery'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
};

const params = {
  query: '',
  page: 1,
  totalHits: 0,
};

function showLoader() {
  refs.loader.classList.remove('hidden');
}

function hideLoader() {
  refs.loader.classList.add('hidden');
}

function showLoadMoreBtn() {
  refs.loadMoreBtn.classList.remove('hidden');
}

function hideLoadMoreBtn() {
  refs.loadMoreBtn.classList.add('hidden');
}

refs.form.addEventListener('submit', async (event) => {
  event.preventDefault();
  params.query = refs.input.value.trim();
  params.page = 1;

  if (!params.query) {
    iziToast.error({
      title: 'Error',
      message: 'Oops! You forgot to enter a search term.',
      position: 'topRight',
      timeout: 2000,
    });
    return;
  }

  showLoader();
  hideLoadMoreBtn();

  try {
    const { hits, totalHits: totalResults } = await fetchImages(
      params.query,
      params.page
    );
    params.totalHits = totalResults;
    hideLoader();

    if (hits.length === 0) {
      renderGallery([], true); 
      iziToast.info({
        title: 'Oops!',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        timeout: 3000,
      });
    } else {
      renderGallery(hits, true);
      if (hits.length < params.totalHits) {
        showLoadMoreBtn();
      }
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong! Please try again later.',
      position: 'topRight',
      timeout: 3000,
    });
    console.error('Error fetching images:', error);
  }
});

refs.loadMoreBtn.addEventListener('click', async () => {
  params.page += 1;
  hideLoadMoreBtn();
  showLoader();

  try {
    const { hits } = await fetchImages(params.query, params.page);
    hideLoader();
    showLoadMoreBtn();

    if (hits.length === 0) {
      hideLoadMoreBtn();
      iziToast.info({
        title: 'End of results',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        timeout: 3000,
      });
    } else {
      renderGallery(hits);
      smoothScroll();

      if (params.page * 40 >= params.totalHits) {
        hideLoadMoreBtn();
        iziToast.info({
          title: 'End of results',
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
          timeout: 3000,
        });
      }
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong! Please try again later.',
      position: 'topRight',
      timeout: 3000,
    });
    console.error('Error fetching images:', error);
  }
});

