import React, {useEffect, useState} from 'react';
import axios from "axios";
import Card from "../components/Card";
import {AnimeType} from "../redux/anime/types";
import {useAppSelector} from "../redux/store";
import {Link} from "react-router-dom";
import Skeleton from "../components/Skeleton";
import {apiUrl} from "../axios";

const Favourite = () => {
    const favouriteStorageId = localStorage.getItem('fv')?.slice(0, -1).slice(1)
    const [isLoading, setIsLoading] = useState(true)
    const [favouriteData, setFavouriteData] = useState<AnimeType[]>()
    const {favourite} = useAppSelector(state => state.anime)

    useEffect(() => {
        axios.get(`${apiUrl}?filter[id]=${favouriteStorageId}`)
            .then(res => setFavouriteData(res.data.data))
            .then(() => setIsLoading(false))
    }, [])

    return (
        <div>
            <h1 className={'text-3xl'}>Favourite</h1>
            {favourite.length < 1 && <div className={'mt-[100px]'}>
                <h1 className={'text-4xl text-center'}>
                    You don't have any favorite anime
                </h1>
                <Link to='/' className={'rounded-md mx-auto mt-6 text-center block w-[100px] p-3 bg-red-500 hover:bg-red-600 uppercase text-amber-50'}>
                    Home
                </Link>
            </div>}
            <div className={'mt-10 grid grid-cols-4 gap-5 max-[740px]:gap-3 max-[580px]:mt-5 max-[830px]:grid-cols-3 max-[490px]:grid-cols-2'}>
                {isLoading
                    ? [...Array(8)].map((_, i) => <Skeleton key={i}/>)
                    : favouriteData?.filter(item => favourite.includes(item.id))
                        .map(item => <Card favRemove={true} key={item.id} {...item}/>)
                }
            </div>
        </div>
    );
};

export default Favourite;