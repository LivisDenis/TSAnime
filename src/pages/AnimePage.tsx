import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {AnimeType} from "../redux/anime/types";
import {PuffLoader} from "react-spinners";
import {addFavourite} from "../redux/anime/slice";
import {useAppDispatch, useAppSelector} from "../redux/store";
import {deleteFavourite} from "../utils/deleteFavourite";
import {LOGIN} from "../utils/consts";

const AnimePage: React.FC = () => {
    const navigate = useNavigate()
    const {slug} = useParams()
    const dispatch = useAppDispatch()
    const [data, setData] = useState<AnimeType | undefined>()
    const {favourite} = useAppSelector(state => state.anime)
    const isFavouriteId = favourite.join(',').split(',').find(id => id === data?.id)
    const token = localStorage.getItem('token')

    console.log(data)

    useEffect(() => {
        axios.get(`https://kitsu.io/api/edge/anime?filter[slug]=${slug}`)
            .then(res => setData(res.data.data[0]))
    }, [])

    const addToFavourite = (id: string) => {
        dispatch(addFavourite(id))
        localStorage.setItem('fv', (localStorage.getItem('fv') || '') + `${id},`)
    }

    if (!data) {
        return <PuffLoader color="rgb(239 68 68)" className={'mx-auto mt-12'} loading={!data} size={120}/>
    }

    const removeFavourite = () => {
        deleteFavourite(data.id, dispatch)
    }

    const {
        averageRating, posterImage, startDate, ageRatingGuide, endDate,
        titles, description, youtubeVideoId, episodeCount
    } = data.attributes

    const info = [
        {name: 'Rating:', value: averageRating},
        {name: 'Released:', value: startDate},
        {name: 'Episode count:', value: episodeCount},
        {name: 'Age:', value: ageRatingGuide},
    ]

    return (
        <div>
            <h1 className={'text-[28px] max-[590px]:text-center'}>{titles.en || titles.en_jp}</h1>
            <h2 className={'text-[18px] text-gray-500 max-[590px]:text-center'}>{titles.ja_jp}</h2>
            <div className={'flex mt-4 max-[590px]:flex-col'}>
                <img src={posterImage.large} width={280} alt="posterImage" className={'mr-7 max-[670px]:w-[250px] max-[590px]:mx-auto'}/>
                <div className={'flex flex-col max-w-[400px] w-full max-[590px]:mt-5 max-[590px]:mx-auto max-[590px]:max-w-full'}>
                    {info.map((item, i) =>
                        <div key={i} className={'grid grid-cols-2 gap-5 py-1 even:bg-slate-300 odd:bg-white'}>
                            <h2>{item.name}</h2>
                            <p>{item.value}</p>
                        </div>
                    )}
                    {episodeCount !== 1 && <div className={'grid grid-cols-2 gap-5'}>
                        <h2>Finished:</h2>
                        <p>{endDate}</p>
                    </div>
                    }
                </div>
            </div>
            {!isFavouriteId && <button onClick={() => !token ? navigate(LOGIN) : addToFavourite(data.id)}
                                       className={'my-5 rounded-md p-3 bg-blue-500 hover:bg-blue-600 uppercase text-amber-50 max-[590px]:w-full'}
            >
                ADD TO FAVOURITE
            </button>}
            {isFavouriteId && token && <button onClick={removeFavourite}
                                      className={'my-5 rounded-md p-3 bg-red-500 hover:bg-red-600 uppercase text-amber-50 max-[590px]:w-full'}
            >
                REMOVE
            </button>}
            <div>
                <h3 className={'text-2xl'}>About «{titles.en || titles.en_jp}»:</h3>
                <p className={'mt-2'}>{description}</p>
            </div>
            <div>
                <iframe src={`https://www.youtube.com/embed/${youtubeVideoId}`} frameBorder="0"
                        className={'mx-auto mt-8 w-[640px] h-[360px] max-[710px]:w-[540px] max-[710px]:h-[305px] max-[590px]:w-[370px] max-[590px]:h-[210px] max-[400px]:w-[300px] max-[400px]:h-[170px]'}></iframe>
            </div>
        </div>
    );
};

export default AnimePage;