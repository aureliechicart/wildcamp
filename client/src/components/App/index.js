import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import './app.scss';

import Navbar from '../../containers/Navbar';
import Page from '../../containers/Page';

const App = ({ loadCampgrounds }) => {

  useEffect(() => {
    loadCampgrounds();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Page />
    </div>
  );
}

App.propTypes = {
  loadCampgrounds: PropTypes.func.isRequired,
};

export default App;