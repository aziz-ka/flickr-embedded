import React, { Component } from 'react';
import io from 'socket.io-client';

import Loader from 'components/Loader';
import { FLICKR_PHOTO_URL } from '../../constants';
import { isEnter } from 'utils';
import './index.css';


const socket = io(process.env.REACT_APP_API_URL);

class Carousel extends Component {
  state = { slide: null }

  getPhotoUrl = ({ farm, id, secret, server }) => `http://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`

  handleSlideChange = step => {
    let currentSlideIndex = this.props.photos.indexOf(this.state.slide);

    if (currentSlideIndex < 0) currentSlideIndex = 0
    if (currentSlideIndex === 0 && step === -1) currentSlideIndex = this.props.photos.length

    let slide = this.props.photos[currentSlideIndex + step];

    this.setState({ slide });
  }

  renderThumbnails = (photo, key) => (
    <li className='carousel__thumbnails--li d-inline-block' key={key}>
      <img
        alt={photo.title}
        className='carousel__thumbnails--img'
        onClick={() => this.setState({ slide: photo })}
        onKeyPress={e => isEnter(e) && this.setState({ slide: photo })}
        src={this.getPhotoUrl(photo)}
        tabIndex='0' />
    </li>
  )

  render = () => {
    const { photos } = this.props;

    if (!photos) return null;

    if (photos === 'loading') return <Loader />;

    if (!photos.length) return (
      <div className='alert alert-warning' role='alert'>
        Nothing found :/
      </div>
    );

    const slide = this.state.slide || photos[0];

    socket.emit('photo_selected', slide);

    return (
      <section className='carousel row'>
        <div className='carousel__slides col-12'>
          <img
            alt={slide.title}
            className='carousel__slides--img d-block w-100'
            src={this.getPhotoUrl(slide)}
          />
          <div className='row'>
            <div className='carousel__nav col-12'>
              <button
                onClick={this.handleSlideChange.bind(this, -1)}
                className='carousel__nav--prev btn btn-light'
              >&lt;</button>
              <button
                onClick={this.handleSlideChange.bind(this, 1)}
                className='carousel__nav--next btn btn-light float-right'
              >&gt;</button>
            </div>
          </div>
        </div>
        <ul className='carousel__thumbnails col-12 mt-3'>
          <div className='carousel__thumbnails--scrollbar text-center'>{ photos.map(this.renderThumbnails) }</div>
        </ul>
      </section>
    );
  }
}


export default Carousel;
