import './App.css';
import response from './response';
import Explorer from './Explorer';
import { useState } from 'react';

function App() {

  const [openedFile, setOpenedFile] = useState('No File Selected');

  return (
    <div className="App">
      <div className='explorer-wrapper'>
        File Explorer
        <hr />
        <Explorer explorerData={response} level={1} customClass={''} openedFile={(filename) => setOpenedFile(filename)} />
      </div>

      <div style={{ width: '100%', color: 'white' }}>
        <p style={{ margin: '0', padding: '10px 0 0 10px' }}>{openedFile}</p>
        <hr />
      </div>
    </div>
  );
}

export default App;