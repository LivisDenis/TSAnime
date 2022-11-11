import React, {useEffect} from 'react';
import Search from "../components/Search";
import ListBox from "../components/Listbox";
import Card from "../components/Card";
import {useAppDispatch, useAppSelector} from "../redux/store";
import {fetchAnime} from "../redux/anime/AsyncActions";
import {PuffLoader} from "react-spinners";

const Home = () => {
    const dispatch = useAppDispatch()
    const {data, status} = useAppSelector(state => state.anime)

    useEffect(() => {
        dispatch(fetchAnime())
    }, [])

    return (
        <div>
            <h1 className={'text-3xl'}>Home</h1>
            <hr className={'bg-black'}/>
            <div className={'flex items-center mt-3'}>
                <Search/>
                <ListBox/>
            </div>
            <PuffLoader color="rgb(239 68 68)" className={'mx-auto mt-12'} loading={status === 'loading'} size={120} />
            <div className={'mt-10 grid grid-cols-4 gap-5'}>
                {data.map(item =>
                    <Card key={item.id} {...item}/>
                )}
            </div>
        </div>
    );
};

export default Home;