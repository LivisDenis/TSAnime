import React from 'react';
import {Link} from "react-router-dom";
import {AnimeType} from "../redux/anime/types";

const Card: React.FC<AnimeType> = (props) => {
    const {titles, averageRating, posterImage, startDate} = props?.attributes

    return (
        <div className={'max-w-max flex flex-col border border-black rounded-2xl'}>
            <Link to={'/'}>
                <img src={posterImage?.large} alt="animeImg" width={260} height={280} className={'rounded-t-2xl'}/>
            </Link>
            <div className={'flex flex-col px-[8px] pb-[8px]'}>
                <title>{titles?.en || titles?.en_jp}</title>
                <div className={'flex justify-between mt-[20px]'}>
                    <p>Rating</p>
                    <p>{averageRating}</p>
                </div>
                <div className={'flex justify-between'}>
                    <p>Date</p>
                    <p>{startDate}</p>
                </div>
            </div>
        </div>
    );
};

export default Card;