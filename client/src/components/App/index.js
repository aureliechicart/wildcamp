import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import './app.scss';

import Navbar from '../../containers/Navbar';
import Page from '../../containers/Page';
import Footer from '../layout/Footer';

const App = ({
  loadCampgrounds,
  checkUser }) => {

  // we check if user is authenticated after each rendering of the component
  useEffect(() => {
    checkUser();
  });

  useEffect(() => {
    loadCampgrounds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app">
      <Navbar />
      <Page />
      <Footer />
    </div>
  );
}

App.propTypes = {
  loadCampgrounds: PropTypes.func.isRequired,
  checkUser: PropTypes.func.isRequired,
};

export default App;