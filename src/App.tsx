import './App.css';
import Player from './components/Player';
import { useEffect, useState } from 'react';
import defaultCaps from './data/defaultcaps.json' assert {type: "json"};
import Cookies from 'universal-cookie';
import Modal from './components/Modal';
const cookies = new Cookies();

interface Player {
  id: string,
  username: string,
  rating: number,
  rank: string
}
export interface ReplayInfo {
  id: number
  player1: Player,
  player2: Player,
  replay: unknown
}
export interface RankInfo {
  threshold: number,
  url: string
}

function App() {
  const [replayURL, setReplayURL] = useState<string>();
  const [replayInfo, setReplayInfo] = useState<ReplayInfo>();
  const [finished, setFinished] = useState<boolean>(false);
  const [rankInfo, setRankInfo] = useState<RankInfo[]>(defaultCaps);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const replayData = await fetch("http://localhost:5000/api/daily.json");
        const capsData = await fetch("http://localhost:5000/api/caps.json");
        if (!replayData) return;
        const replayJson = await replayData.json() as ReplayInfo;
        const capsJson = await capsData.json() as RankInfo[];
        setReplayInfo(replayJson);
        setRankInfo(capsJson);
        setReplayURL(URL.createObjectURL(new Blob([JSON.stringify(replayJson?.replay ?? {})], { type: 'application/json' })));
        if (cookies.get("lastFinish") && cookies.get("lastFinish") === replayJson?.id.toString())
          setFinished(true);
      } catch (error) {
        console.log(error)
      }
    };
    void fetchData();
  }, []);

  const disabled = finished || !replayInfo?.replay
  return <div className={`main ${finished ? 'dark-page' : ''}`}>
    <h1>TETRADLE{replayInfo?.id && ` #${replayInfo.id}`}</h1>
    {finished && replayInfo && <Modal replayInfo={replayInfo} />}
    {replayURL && (
      <div className='download'>
        <h2>Download Here: </h2>
        <a className='download-btn' href={replayURL ?? "#"} download={"replay.ttrm"}>Ǿ</a>
      </div>
    )}
    <div className='players'>
      <Player player={1}
        rankInfo={rankInfo}
        disabled={disabled}
        finished={finished}
        replayInfo={replayInfo} />
      <Player player={2}
        rankInfo={rankInfo}
        disabled={disabled}
        finished={finished}
        replayInfo={replayInfo} />
    </div>
    <div>
      <button className='submit'
        disabled={disabled}
        onClick={() => {
          cookies.set("lastFinish", replayInfo?.id.toString())
          cookies.set("player1", (document.getElementById("p1-slider") as HTMLInputElement)?.value ?? "")
          cookies.set("player2", (document.getElementById("p2-slider") as HTMLInputElement)?.value ?? "")
          setFinished(true);
        }}>Submit</button>
    </div>
  </div>
}

export default App;
