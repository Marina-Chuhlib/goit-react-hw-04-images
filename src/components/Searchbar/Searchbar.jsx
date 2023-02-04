import { useState } from 'react';
import PropTypes from 'prop-types';

import initialState from './initialState';

import css from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [state, setState] = useState({ ...initialState });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ ...state });
    setState({ ...initialState });
  };

  // const [search, setSearch] = useState('');

  // const handleChange = e => setSearch(e.target.value);

  // const handleSubmit = e => {
  //   e.preventDefault();

  //   onSubmit(...search);

  //   setSearch('');
  // };

  const { search } = state;

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.button}>
          <span className={css.label}>Search</span>
        </button>

        <input
          className={css.input}
          name="search"
          type="text"
          value={search}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          required
        />
      </form>
    </header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
