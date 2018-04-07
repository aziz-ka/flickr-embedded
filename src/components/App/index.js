import React, { Component } from 'react';
import axios from 'axios';

import Carousel from 'components/Carousel';
import { FLICKR_API_URL, getFlickrAPIParams } from '../../constants';
import './index.css';


class App extends Component {
  state = {
    gallery_id: '',
    photos: null
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ photos: 'loading' });

    axios
      .get(FLICKR_API_URL, { params: getFlickrAPIParams(this.state.gallery_id) })
      .then(res => this.setState({ photos: res.data.photos.photo}))
      .catch(err => console.error(err));
  }

  render = () => (
    <main className='container-fluid py-3'>
      <form className='form-row mb-5' onSubmit={this.handleSubmit}>
        <div className='col-8 col-lg-3 offset-lg-4'>
          <label className='sr-only' htmlFor='gallery_id'>Gallery ID</label>
          <input
            className='form-control col p-2'
            id='gallery_id'
            name='gallery_id'
            onChange={this.handleChange}
            placeholder='Gallery ID'
            type='text'
            value={this.state.gallery_id} />
        </div>
        <div className='col-4 col-lg-1'>
          <button
            className='btn btn-primary col py-2'
            disabled={!this.state.gallery_id}
            type='submit'
          >
            Submit
          </button>
        </div>
      </form>
      <Carousel photos={this.state.photos} />
    </main>
  )
}


export default App;
