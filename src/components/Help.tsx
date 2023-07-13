import './Help.css';
import { Dispatch, SetStateAction } from 'react';
export default function Help({ setShowHelp }: { setShowHelp: Dispatch<SetStateAction<boolean>> }) {
    return <div className='modal'>
        <div className='modal-content'>
            <p className='close-help' onClick={() => setShowHelp(false)}>X</p>
            <h1>HOW TO PLAY</h1>
            <p>1. Download the replay at the top of the browser to your device.</p>
            <p>2. Open TETR.IO {"(or click the pink TETR.IO button)"} to watch the replay.</p>
            <p>3. Upload the replay to TETR.IO by dragging it into your browser.</p>
            <p>4. Enter your guess to both players' ratings!</p>
            <img className='example' src="/download-replay.gif" alt="how to download" />
        </div>
    </div>
}