import './App.css';
import Player from './components/Player';
import { useEffect, useState } from 'react';
import defaultCaps from './data/defaultcaps.json' assert {type: "json"};
import firebaseConfig from './data/firebase.config.json' assert {type: "json"};
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage"
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
  data: unknown
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
        const app = initializeApp(firebaseConfig);
        const storage = getStorage(app);
        const capsData = await fetch(await getDownloadURL(ref(storage, "caps.json")));
        const dailyData = await fetch(await getDownloadURL(ref(storage, "daily.json")));
        if (!capsData || !dailyData) return;
        const capsJson = await capsData.json() as RankInfo[];
        const dailyJson = await dailyData.json() as ReplayInfo;
        setReplayInfo(dailyJson);
        setRankInfo(capsJson);
        setReplayURL(URL.createObjectURL(new Blob([JSON.stringify(dailyJson?.data ?? {})], { type: 'application/json' })));
        if (cookies.get("lastFinish") && cookies.get("lastFinish") === dailyJson?.id.toString())
          setFinished(true);
      } catch (error) {
        console.log(error)
      }
    };
    void fetchData();
  }, []);

  const disabled = finished || !replayInfo
  return <div className={`main ${finished ? 'dark-page' : ''}`}>
    <h1 className='main-title'>TETRADLE{replayInfo?.id && ` #${replayInfo.id}`}</h1>
    {finished && replayInfo && <Modal replayInfo={replayInfo} />}
    {replayURL && (
      <div className='download'>
        <h2 className='download-text'>Download: </h2>
        <a className='download-btn' href={replayURL ?? "#"} download={"replay.ttrm"}>Ǿ</a>
        <a className='tetrio-btn' onClick={() => window.open("https://tetr.io", "_blank")}><img src="/tetrio.png" alt="TETR.IO" width="50" height="50" /></a>
      </div>
    )}
    <div className='players'>
      <Player player={1}
        rankInfo={rankInfo}
        disabled={disabled} />
      <Player player={2}
        rankInfo={rankInfo}
        disabled={disabled} />
    </div>
    <h2>All replays are trimmed to FT3, and stats/players are anonymous! </h2>
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
