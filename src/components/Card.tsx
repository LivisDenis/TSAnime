import React from 'react';
import {Link} from "react-router-dom";
import {AnimeType} from "../redux/anime/types";
import {useRemoveFavouriteMutation} from "../redux/anime/apiQuery";
import {PuffLoader} from "react-spinners";

const Card: React.FC<AnimeType> = (props) => {
    const {titles, averageRating, posterImage, startDate, slug} = props?.attributes
    const [deleteFavourite, {isLoading}] = useRemoveFavouriteMutation()

    const removeFavourite = () => {
        deleteFavourite(props._id!)
    }

    return (
        <div
            className={'relative max-w-max h-full border border-neutral-400 flex flex-col rounded-2xl bg-blue-100 drop-shadow-xl'}>
            <Link to={`/anime/${slug}`}>
                <img src={posterImage?.large} alt="animeImg" width={260} height={280} className={'rounded-t-2xl'}/>
            </Link>
            <div className={'flex flex-col px-[8px] pb-[8px] mt-[10px] flex-auto'}>
                <h4 className={'text-[18px] max-[930px]:text-[15px] font-semibold flex-auto'}>{titles?.en || titles?.en_jp}</h4>
                <hr className={'bg-black'}/>
                <div className={'flex justify-between mt-[10px]'}>
                    <p className={'max-[930px]:text-[14px]'}>Rating</p>
                    <p className={'max-[930px]:text-[14px]'}>{averageRating}</p>
                </div>
                <div className={'flex justify-between'}>
                    <p className={'max-[930px]:text-[14px]'}>Date</p>
                    <p className={'max-[930px]:text-[14px]'}>{startDate}</p>
                </div>
            </div>
            {props.favRemove && <button onClick={removeFavourite}
                                        disabled={isLoading}
                                        className={'absolute h-[40px] w-[81px] top-[5px] right-[5px] rounded-md p-2 bg-blue-500 hover:bg-red-600 uppercase text-amber-50'}>
                {isLoading ? '' : 'REMOVE'}
                <span className={'absolute left-[37%] top-[50%] translate-x-0 translate-y-[-50%]'}>
                    <PuffLoader loading={isLoading} size={20}/>
                </span>
            </button>}
        </div>
    );
};

export default Card;