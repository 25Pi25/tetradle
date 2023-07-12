import Cookies from 'universal-cookie';
import { ReplayInfo } from '../App';
const cookies = new Cookies();
import './Modal.css';

//calculated in python because i could not be bothered
const getMinimumCorrectRating = (tr: number) => 1.5 * (-0.000008707 * Math.pow(tr, 2) + 0.178725036 * tr + 976.46);

export default function Modal({ replayInfo: { player1, player2, id } }: { replayInfo: ReplayInfo }) {
    const rating1 = cookies.get("player1") as number || 0;
    const rating2 = cookies.get("player2") as number || 0;

    const ratingDifference1 = rating1 - player1.rating
    const ratingDifference2 = rating2 - player2.rating

    const emoji1 = Math.abs(ratingDifference1) < getMinimumCorrectRating(player1.rating) ? "🟩" : "🟥";
    const emoji2 = Math.abs(ratingDifference2) < getMinimumCorrectRating(player2.rating) ? "🟩" : "🟥";
    const ratingAsString1 = ratingDifference1 < 0 ? ratingDifference1.toString() : `+${ratingDifference1}`;
    const ratingAsString2 = ratingDifference2 < 0 ? ratingDifference2.toString() : `+${ratingDifference2}`;

    const shareText = `Tetradle #${id}\nPlayer 1: ${ratingAsString1} ${emoji1}\nPlayer 2: ${ratingAsString2} ${emoji2}`;
    return <div className='modal'>
        <div className='modal-content'>
            <h1>RESULTS</h1>
            <div className='player-modals'>
                <div className='player-modal p1'>
                    <div className='show'>
                        <h2>Player: <a
                            href={`https://ch.tetr.io/u/${player1.id}`}
                            target="_blank"
                            className='hide-link'
                        >{player1.username}</a>
                        </h2>
                        <h2>Rank: {player2.rank.toUpperCase()}</h2>
                        <h2>Actual TR: {player1.rating} <strong className={emoji1 == "🟩" ? "right" : "wrong"}>({ratingAsString1})</strong></h2>
                        <h2>Your Guess: {rating1}</h2>
                    </div>
                </div>
                <div className='player-modal p2'>
                    <div className='show'>
                        <h2>Player: <a
                            href={`https://ch.tetr.io/u/${player2.id}`}
                            target="_blank"
                            className='hide-link'
                        >{player2.username}</a>
                        </h2>
                        <h2>Rank: {player2.rank.toUpperCase()}</h2>
                        <h2>Actual TR: {player2.rating} <strong className={emoji2 == "🟩" ? "right" : "wrong"}>({ratingAsString2})</strong></h2>
                        <h2>Your Guess: {rating2}</h2>
                    </div>
                </div>
            </div>


            <div className='share-buttons'>
                <a className="twitter-share-button button"
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
                ><img src="/twitter.png" alt="Twitter" width="75" height="75" /></a>

                <img className="copy-button button" src="/share.png" alt="Share" width="75" height="75" onClick={() => {
                    navigator.clipboard.writeText(shareText).catch(() => console.log("error"))
                }} />
            </div>
        </div>
    </div>
}