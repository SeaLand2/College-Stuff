import { useEffect } from 'react';
import './App.css';
import Game from './game';

function App() {
  useEffect(() => {
    document.title = 'Simon Says';
  }, []);

  return (
    <>
      <div className='main center'>
        <h1 id='level-title'>Press A Key to Start</h1>
        <div>
          <div className='row'>

            <button id='green' className='btn' onClick={() => {Game('green')}}>

            </button>

            <button id='red' className='btn' onClick={() => {Game('red')}}>

            </button>
          </div>

          <div className='row'>

            <button id='yellow' className='btn' onClick={() => {Game('yellow')}}>

            </button>

            <button id='blue' className='btn' onClick={() => {Game('blue')}}>

            </button>

          </div>

        </div>
      </div>
    </>
  );
}

export default App;
