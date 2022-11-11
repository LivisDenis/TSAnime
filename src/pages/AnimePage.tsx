import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {AnimeType} from "../redux/anime/types";
import {PuffLoader} from "react-spinners";

const AnimePage = () => {
    const {slug} = useParams()
    const [data, setData] = useState<AnimeType | undefined>()

    console.log(data)

    useEffect(() => {
        axios.get(`https://kitsu.io/api/edge/anime?filter[slug]=${slug}`)
            .then(res => setData(res.data.data[0]))
    }, [])

    if (!data) {
        return <PuffLoader color="rgb(239 68 68)" className={'mx-auto mt-12'} loading={!data}
                           size={120}/>
    }

    const {
        averageRating, posterImage, startDate, ageRatingGuide, coverImage, endDate,
        titles, canonicalTitle, status, description, synopsis, youtubeVideoId, episodeCount
    } = data.attributes

    return (
        <div>
            <h1 className={'text-[28px]'}>{titles.en || titles.en_jp}</h1>
            <h2 className={'text-[18px] text-gray-500'}>{titles.ja_jp}</h2>
            <div className={'flex mt-4'}>
                <img src={posterImage.large} width={280} alt="posterImage" className={'mr-7'}/>
                <div className={'flex flex-col max-w-[400px] w-full'}>
                    <div className={'grid grid-cols-2 gap-5 mt-1'}>
                        <h2>Rating:</h2>
                        <p>{averageRating}</p>
                    </div>
                    <div className={'grid grid-cols-2 gap-5 mt-1'}>
                        <h2>Released:</h2>
                        <p>{startDate}</p>
                    </div>
                    <div className={'grid grid-cols-2 gap-5 mt-1'}>
                        <h2>Episode count:</h2>
                        <p>{episodeCount}</p>
                    </div>
                    <div className={'grid grid-cols-2 gap-5 mt-1'}>
                        <h2>Age:</h2>
                        <p>{ageRatingGuide}</p>
                    </div>
                    {episodeCount !== 1 && <div className={'grid grid-cols-2 gap-5'}>
                        <h2>Finished:</h2>
                        <p>{endDate}</p>
                    </div>
                    }
                </div>
            </div>
            <hr className={'bg-black my-8'}/>
            <div>
                <h3 className={'text-2xl'}>About «{titles.en || titles.en_jp}»:</h3>
                <p className={'mt-2'}>{description}</p>
            </div>
            <div>
                <iframe src={`https://www.youtube.com/embed/${youtubeVideoId}`}  width="640"
                        height="360" frameBorder="0" className={'mx-auto mt-8'}></iframe>
            </div>
            <button className={'my-10 rounded-md p-3 bg-blue-500 hover:bg-blue-600 uppercase text-amber-50'}>ADD TO FAVOURITE</button>
        </div>
    );
};

export default AnimePage;