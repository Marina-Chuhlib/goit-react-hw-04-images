import { useEffect, useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';

import { searchImages } from '../services/api';

import css from './App.module.css';

const App = () => {
  const [search, setSearch] = useState('');
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    if (!search) {
      return;
    }

    const fetchPictures = async () => {
      try {
        setLoading({ loading: true });

        const hits = await searchImages(search, page);

        if (hits.length === 0) {
          toast.info(
            '🦄 Sorry, there are no available images. Please try again.'
          );
        }
        setPictures(prevPictures => [...prevPictures, ...hits]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPictures();
  }, [search, page]);

  const searchPictures = ({ search }) => {
    setSearch(search);
    setPictures([]);
    setPage(1);
  };

  const showPicture = img => {
    setCurrentImage(img);
  };

  const closeModal = () => {
    setCurrentImage(null);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={searchPictures} />
      {!search && <p className={css.requestMassage}>Please enter a request</p>}
      {error && <p className={css.errorMassage}>{error}</p>}
      {loading && <Loader />}
      {ImageGallery && (
        <ImageGallery pictures={pictures} showPicture={showPicture} />
      )}
      {Boolean(pictures.length) && !loading && <Button loadMore={loadMore} />}
      {currentImage && (
        <Modal currentImage={currentImage} closeModal={closeModal} />
      )}
      <ToastContainer position="top-right" theme="colored" />
    </div>
  );
};

export default App;
