const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '38773235-812bf30c777b3325b6df3cb6a';

const fetchImages = async (query, page = 1, perPage = 12) => {
  const response = await fetch(
        `${BASE_URL}/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
    );
    const data = await response.json();
    return data.hits;
};

export { fetchImages };
