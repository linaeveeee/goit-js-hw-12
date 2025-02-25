import axios from 'axios';

const API_KEY = '48830775-40ff68ea61f2bc47ba43ee541';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 40;

export async function fetchImages(query, page) {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          key: API_KEY,
          q: query,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          page,
          per_page: PER_PAGE
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching data from Pixabay API:', error);
      throw error;
    }
  }
  