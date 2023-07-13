import Cookies from 'universal-cookie';
import { ReplayInfo } from '../App';
const cookies = new Cookies();
import './Modal.css';

//calculated in python because i could not be bothered
const getMinimumCorrectRating = (tr: number, mult = 1) => 1.5 * mult * (-0.000008707 * Math.pow(tr, 2) + 0.178725036 * tr + 976.46);

export default function Modal({ replayInfo: { player1, player2, id } }: { replayInfo: ReplayInfo }) {
    const rating1 = cookies.get("player1") as number || 0;
    const rating2 = cookies.get("player2") as number || 0;

    const ratingDifference1 = player1.rating - rating1;
    const ratingDifference2 = player2.rating - rating2;

    const emoji1 = Math.abs(ratingDifference1) < getMinimumCorrectRating(player1.rating) ? "🟩" :
        Math.abs(ratingDifference1) < getMinimumCorrectRating(player1.rating, 1.25) ? "🟨" : "🟥";
    const emoji2 = Math.abs(ratingDifference2) < getMinimumCorrectRating(player2.rating) ? "🟩" :
        Math.abs(ratingDifference2) < getMinimumCorrectRating(player2.rating, 1.25) ? "🟨" : "🟥";
    const ratingAsString1 = ratingDifference1 < 0 ? ratingDifference1.toString() : `+${ratingDifference1}`;
    const ratingAsString2 = ratingDifference2 < 0 ? ratingDifference2.toString() : `+${ratingDifference2}`;

    const shareText = `Tetradle #${id}\nPlayer 1: ${ratingAsString1} ${emoji1}\nPlayer 2: ${ratingAsString2} ${emoji2}`;
    return <div className='modal'>
        <div className='modal-content'>
            <h1>RESULTS</h1>
            <div className='player-modals'>
                <div className='player-modal p1'>
                    <div className='show'>
                        <p>Player: <a
                            href={`https://ch.tetr.io/u/${player1.id}`}
                            target="_blank"
                            className='username'
                        >{player1.username}</a>
                        </p>
                        <p>Rank: {player2.rank.toUpperCase()}</p>
                        <p>Actual TR: {player1.rating} <strong className={emoji1}>({ratingAsString1})</strong></p>
                        <p>Your Guess: {rating1}</p>
                    </div>
                </div>
                <div className='player-modal p2'>
                    <div className='show'>
                        <p>Player: <a
                            href={`https://ch.tetr.io/u/${player2.id}`}
                            target="_blank"
                            className='username'
                        >{player2.username}</a>
                        </p>
                        <p>Rank: {player2.rank.toUpperCase()}</p>
                        <p>Actual TR: {player2.rating} <strong className={emoji2}>({ratingAsString2})</strong></p>
                        <p>Your Guess: {rating2}</p>
                    </div>
                </div>
            </div>

            <p>Click a share button to show your results without spoilers!</p>
            <strong className='promotion'>Post your TETR.IO username on twitter with Tetradle for a chance to win supporter!</strong>
            <div className='share-buttons'>
                <a className="twitter-share-button button"
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
                ><img src="/twitter.png" alt="Twitter" width="75" height="75" /></a>

                <img className="copy-button button" src="/share.png" alt="Share" width="75" height="75" onClick={() => {
                    navigator.clipboard.writeText(shareText)
                        .then(() => alert("copied!"))
                        .catch(() => console.log("error"))
                }} />
            </div>
        </div>
    </div>
}