import React, {useEffect, useState} from 'react';
import axios from "axios";
import {PuffLoader} from "react-spinners";
import Card from "../components/Card";
import {AnimeType} from "../redux/anime/types";
import {useAppSelector} from "../redux/store";
import {Link} from "react-router-dom";

const Favourite = () => {
    const favouriteStorageId = localStorage.getItem('fv')?.slice(0, -1)
    const [isLoading, setIsLoading] = useState(true)
    const [offset, setOffset] = useState(1)
    const [favouriteData, setFavouriteData] = useState<AnimeType[]>()
    const {favourite} = useAppSelector(state => state.anime)
    console.log(favourite)

    useEffect(() => {
        axios.get(`https://kitsu.io/api/edge/anime?filter[id]=${favouriteStorageId}`)
            .then(res => setFavouriteData(res.data.data))
            .then(() => setIsLoading(false))
    }, [offset])

    return (
        <div>
            <h1 className={'text-3xl'}>Favourite</h1>
            <PuffLoader color="rgb(239 68 68)" className={'mx-auto mt-12'} loading={isLoading} size={120} />
            {favouriteData?.length! < 1 && <div className={'mt-[100px]'}>
                <h1 className={'text-4xl text-center'}>
                    You don't have any favorite anime
                </h1>
                <Link to='/' className={'rounded-md mx-auto mt-6 text-center block w-[100px] p-3 bg-red-500 hover:bg-red-600 uppercase text-amber-50'}>
                    Home
                </Link>
            </div>}
            <div className={'mt-10 grid grid-cols-4 gap-5'}>
                {favouriteData?.map(item =>
                    <Card favRemove={true} key={item.id} {...item}/>
                )}
            </div>
            {/*<div className={'flex justify-center'}>*/}
            {/*    <button onClick={() => setOffset(offset - 8)}*/}
            {/*            className={'rounded-md mr-2 mt-6 text-center block w-[100px] p-3 bg-red-500 hover:bg-red-600 uppercase text-amber-50'}>*/}
            {/*        PREV*/}
            {/*    </button>*/}
            {/*    <button onClick={() => setOffset(offset + 8)}*/}
            {/*            className={'rounded-md ml-2 mt-6 text-center block w-[100px] p-3 bg-red-500 hover:bg-red-600 uppercase text-amber-50'}>*/}
            {/*        NEXT*/}
            {/*    </button>*/}
            {/*</div>*/}
        </div>
    );
};

export default Favourite;