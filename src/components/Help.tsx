import './Help.css';
import { Dispatch, SetStateAction } from 'react';
export default function Help({ setShowHelp }: { setShowHelp: Dispatch<SetStateAction<boolean>> }) {
    return <div className='modal'>
        <div className='modal-content'>
            <h2 className='close-help' onClick={() => setShowHelp(false)}>X</h2>
            <h1>HOW TO PLAY</h1>
            <h2>1. Download the replay at the top of the browser to your device.</h2>
            <h2>2. Open TETR.IO {"(or click the pink TETR.IO button)"} to watch the replay.</h2>
            <h2>3. Upload the replay to TETR.IO by dragging it into your browser.</h2>
            <h2>4. Enter your guess to both players' ratings!</h2>
            <img className='example' src="/download-replay.gif" alt="how to download" />
        </div>
    </div>
}