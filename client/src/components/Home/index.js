import React from 'react';
import './home.scss';
import CampgroundSmall from './CampgroundSmall';

const Home = () => (
  <main className="home">
    <h1 className="home-title">Bienvenue dans Wildcamp</h1>
    <p className="home-subtitle">Découvrez les meilleurs spots de camping sauvage partagés par la communauté Wildcamp :</p>
    <div className="campgrounds-small">
      <CampgroundSmall />
      <CampgroundSmall />
      <CampgroundSmall />
      <CampgroundSmall />
      <CampgroundSmall />
      <CampgroundSmall />
      <CampgroundSmall />
    </div>
  </main>
);

export default Home;