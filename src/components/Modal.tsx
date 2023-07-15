import Cookies from 'universal-cookie';
import { ReplayInfo } from '../App';
const cookies = new Cookies();
import './Modal.css';

//calculated in python because i could not be bothered
const getMinimumCorrectRating = (tr: number, mult = 1) => 1.5 * mult * (-0.000008707 * Math.pow(tr, 2) + 0.178725036 * tr + 976.46);
const getCorrespondingEmoji = (ratingDifference: number, realRating: number) => {
    if (ratingDifference == 0) return "🟦";
    if (Math.abs(ratingDifference) < getMinimumCorrectRating(realRating)) return "🟩";
    if (Math.abs(ratingDifference) < getMinimumCorrectRating(realRating, 1.25)) return "🟨";
    return "🟥";
}
export default function Modal({ replayInfo: { player1, player2, id } }: { replayInfo: ReplayInfo }) {
    const rating1 = cookies.get("player1") as number || 0;
    const rating2 = cookies.get("player2") as number || 0;

    const ratingDifference1 = rating1 - player1.rating;
    const ratingDifference2 = rating2 - player2.rating;

    const emoji1 = getCorrespondingEmoji(ratingDifference1, player1.rating);
    const emoji2 = getCorrespondingEmoji(ratingDifference2, player2.rating);
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