import './app.scss';

import Navbar from '../Navbar';
import Page from '../Page';

import data from '../../data';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Page campgrounds={data} />
    </div>
  );
}

export default App;