import './App.css';
import Player from './components/Player';
import { useEffect, useRef, useState } from 'react';
import defaultCaps from './data/defaultcaps.json' assert {type: "json"};
import firebaseConfig from './data/firebase.config.json' assert {type: "json"};
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage"
import Cookies from 'universal-cookie';
import Modal from './components/Modal';
import Help from './components/Help';
import Archive from './components/Archive';
const cookies = new Cookies();
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

interface Player {
  id: string,
  username: string,
  rating: number,
  rank: string
}
export interface ReplayInfo {
  id: number
  player1: Player,
  player2: Player
}
export interface RankInfo {
  threshold: number,
  url: string
}

function App() {
  const [replayURL, setReplayURL] = useState<string>();
  const [replayInfo, setReplayInfo] = useState<ReplayInfo>();
  const [finished, setFinished] = useState<boolean>(false);
  const [showHelp, setShowHelp] = useState<boolean>(false);
  const [learnMore, setLearnMore] = useState<boolean>(false);
  const [rankInfo, setRankInfo] = useState<RankInfo[]>(defaultCaps);
  const slider1Ref = useRef<HTMLInputElement>();
  const slider2Ref = useRef<HTMLInputElement>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const capsData = await fetch(await getDownloadURL(ref(storage, "caps.json")));
        const dailyData = await fetch(await getDownloadURL(ref(storage, "answers.json")));
        if (!capsData || !dailyData) return;
        const capsJson = await capsData.json() as RankInfo[];
        const dailyJson = await dailyData.json() as ReplayInfo;
        setReplayInfo(dailyJson);
        setRankInfo(capsJson);
        setReplayURL(await getDownloadURL(ref(storage, "replay.ttrm")));
      } catch (error) {
        console.log(error);
      }
    };
    void fetchData();
  }, []);

  const disabled = finished || !replayInfo;
  return <div className={`main ${finished || showHelp ? 'dark-page' : ''}`}>
    <h1 className='help-btn' onClick={() => !finished && setShowHelp(lastState => !lastState)}>?</h1>
    <h1 className='help-btn bright' onClick={() => !finished && setLearnMore(lastState => !lastState)}>!!!</h1>
    <h1 className='main-title'>TETRADLE{replayInfo?.id && ` #${replayInfo.id}`}</h1>
    {finished && replayInfo && <Modal replayInfo={replayInfo} />}
    {showHelp && <Help setShowHelp={setShowHelp} />}
    {learnMore && <Archive setLearnMore={setLearnMore} />}
    {replayURL && (
      <div className='download'>
        <h2 className='download-text'>Download: </h2>
        <a className='download-btn' href={replayURL ?? "#"} download={"replay.ttrm"}>Ǿ</a>
        <a className='tetrio-btn' onClick={() => window.open("https://tetr.io", "_blank")}>
          <img className='tetrio-img' src="/tetrio.png" alt="TETR.IO" />
        </a>
      </div>
    )}
    <div className='players'>
      <Player player={1}
        rankInfo={rankInfo}
        disabled={disabled}
        sliderRef={slider1Ref} />
      <Player player={2}
        rankInfo={rankInfo}
        disabled={disabled}
        sliderRef={slider2Ref} />
    </div>
    <p>All replays are trimmed to FT3, and stats/players are anonymous! </p>
    <div>
      <button className='submit'
        disabled={disabled}
        onClick={() => {
          cookies.set("lastFinish", replayInfo?.id.toString())
          cookies.set("player1", slider1Ref.current?.value ?? 0)
          cookies.set("player2", slider2Ref.current?.value ?? 0)
          setFinished(true);
        }}>Submit</button>
    </div>
  </div>
}

export default App;
