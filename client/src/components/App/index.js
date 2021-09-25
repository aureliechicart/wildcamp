import axios from 'axios';

import './app.scss';

import Navbar from '../Navbar';
import Page from '../../containers/Page';
import { useEffect } from 'react';

function App() {

  // testing API request through proxy
  const loadAPIText = () => {
    axios.get('/api')
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    loadAPIText();
  }, []);


  return (
    <div className="App">
      <Navbar />
      <Page />
    </div>
  );
}

export default App;