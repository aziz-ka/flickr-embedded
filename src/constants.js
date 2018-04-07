const getFlickrAPIParams = id => ({
  api_key: process.env.REACT_APP_FLICKR_API_KEY,
  extras: 'date_taken, owner_name, views',
  gallery_id: id,
  format: 'json',
  method: 'flickr.galleries.getPhotos',
  nojsoncallback: 1
});

const FLICKR_API_URL = 'https://api.flickr.com/services/rest/';
const FLICKR_PHOTO_URL = 'https://www.flickr.com/photos/';


export {
  FLICKR_API_URL,
  FLICKR_PHOTO_URL,
  getFlickrAPIParams
};
