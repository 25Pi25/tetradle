import './App.css';
import json from '../replays/replay.json' assert {type: "json"};
function App() {

  const blob = new Blob([JSON.stringify(json)], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);

  return <div className='main'>
    <h1>TETRADLE</h1>
    <div className='download'>
      <h2>Download Here: </h2>
      <a className='download-btn' href={url} download={"replay.ttrm"}>Ǿ</a>
    </div>
    <div className='players'>
      <div className='player p1'>

      </div>
      <div className='player p2 '>

      </div>
    </div>
  </div>
}

export default App;
