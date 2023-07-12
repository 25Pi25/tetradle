import { useState } from 'react';
import './Player.css';
import { RankInfo, ReplayInfo } from '../App';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const getRankFromIndex = (index: number, rankInfo: RankInfo[]) => rankInfo[index] ?? rankInfo[0];
interface Props {
    player: number,
    rankInfo: RankInfo[],
    disabled: boolean,
    finished: boolean,
    replayInfo: ReplayInfo | undefined
}
export default function Player({ player, rankInfo, disabled, finished, replayInfo }: Props) {
    const [rating, setRating] = useState(parseInt(cookies.get(`player${player}`) as string ?? "0"));
    const playerName = player == 1 ? 'p1' : 'p2';
    const playerInfo = player == 1 ? replayInfo?.player1 : replayInfo?.player2;

    const srcIndex = rankInfo.findIndex(({ threshold }) => threshold >= rating);
    const prevRank = getRankFromIndex(srcIndex - 1, rankInfo);
    const currentRank = getRankFromIndex(srcIndex, rankInfo);
    const nextRank = getRankFromIndex(srcIndex + 1, rankInfo);
    const startRating = prevRank?.threshold || 0;
    const endRating = currentRank?.threshold || 25000;

    const ratingDifference = rating - (playerInfo?.rating ?? 0);
    return <div className={`player ${playerName}`}>
        <img src={currentRank.url} alt="rank" width="100" height="100" />
        <div className='rank-progress'>
            <img src={prevRank.url}
                alt="rank" width="30" height="30" />
            <progress id="file" max="100"
                value={(rating - startRating) / (endRating - startRating) * 100} />
            <img src={nextRank.url}
                alt="rank" width="30" height="30" />
        </div>
        <h1>{rating} TR</h1>
        {finished && (
            <div className='finalBox'>
                <h2>Player: {playerInfo?.username}</h2>
                <h2>Actual TR: {playerInfo?.rating} <strong className={ratingDifference == 0 ? "right" : "wrong"}>({
                    ratingDifference < 0 ? ratingDifference.toString() : `+${ratingDifference}`
                })</strong></h2>
                <h2>Actual Rank: {playerInfo?.rank.toUpperCase()}</h2>
            </div>
        )}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <input type="range"
                disabled={disabled}
                min="0"
                max="25000"
                name={playerName}
                id={`${playerName}-slider`}
                className='slider'
                value={rating}
                onChange={event => setRating(Math.min(Math.max(parseInt(event.target.value), 0), 25000))} />
            <input type="number"
                disabled={disabled}
                className='number-change'
                min="0"
                max="25000"
                step="1"
                value={rating}
                onChange={event => setRating(Math.min(Math.max(parseInt(event.target.value), 0), 25000))} />
        </div>
    </div>
}