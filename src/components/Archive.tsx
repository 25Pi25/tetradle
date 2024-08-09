import './Help.css';
import { Dispatch, SetStateAction } from 'react';
export default function Help({ setLearnMore }: { setLearnMore: Dispatch<SetStateAction<boolean>> }) {
    return <div className='modal'>
        <div className='modal-content'>
            <p className='close-help' onClick={() => setLearnMore(false)}>X</p>
            <h1>ARCHIVED</h1>
            <p>
                Hello to whoever's reading this! I'm the creator of the website, and it's been a full year since I last checked in.
                This is a website I designed to add to my resume and in general expand my horizons for coding projects, and this
                is the result of 3 days of nonstop frustration. The true experience I gained from making this project was the
                struggle to learn how to manage databases and what would be the best for my project.
            </p>
            <p>
                If you're looking through my resume, hi! This project currently features a single replay that you can view.
                Click the ? button to find out how to play.
            </p>
            <p>
                If you've been playing this game on and off, I appreciate you playing tetradle. Unfortunately, due to current API changes,
                I most likely won't be keeping up on maintaining this project. If you are a regular player, feel free to message me
                on discord! (username is 25pi25)
            </p>
            <p>
                I currently have a spreadsheet which stores all the replays and metadata for tetradle, 1-376.
                If you want access, feel free to ask.
            </p>
            <p>
                Thank you for following along with TETRADLE!
            </p>
        </div>
    </div>
}