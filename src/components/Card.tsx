import React from 'react';
import {Link} from "react-router-dom";
import {AnimeType} from "../redux/anime/types";

const Card: React.FC<AnimeType> = (props) => {
    const {titles, averageRating, posterImage, startDate, slug} = props?.attributes

    return (
        <div className={'relative max-w-max h-full border border-neutral-400 flex flex-col rounded-2xl bg-blue-100 drop-shadow-xl'}>
            <Link to={`/anime/${slug}`}>
                <img src={posterImage?.large} alt="animeImg" width={260} height={280} className={'rounded-t-2xl'}/>
            </Link>
            <div className={'flex flex-col px-[8px] pb-[8px] mt-[10px] flex-auto'}>
                <h4 className={'text-[18px] font-semibold flex-auto'}>{titles?.en || titles?.en_jp}</h4>
                <hr className={'bg-black'}/>
                <div className={'flex justify-between mt-[10px]'}>
                    <p>Rating</p>
                    <p>{averageRating}</p>
                </div>
                <div className={'flex justify-between'}>
                    <p>Date</p>
                    <p>{startDate}</p>
                </div>
            </div>
            {props.favRemove && <button className={'absolute top-[5px] right-[5px] rounded-md p-2 bg-blue-500 hover:bg-red-600 uppercase text-amber-50'}>
                REMOVE
            </button>}
        </div>
    );
};

export default Card;