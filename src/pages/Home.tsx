import React, {useEffect} from 'react';
import Search from "../components/Search";
import ListBox from "../components/Listbox";
import Card from "../components/Card";
import {useAppDispatch, useAppSelector} from "../redux/store";
import {fetchAnime} from "../redux/anime/AsyncActions";

const Home = () => {
    const dispatch = useAppDispatch()
    const {data, status} = useAppSelector(state => state.anime)

    useEffect(() => {
        dispatch(fetchAnime())
    }, [])

    if (status === 'loading') {
        return <h1>loading</h1>
    }

    return (
        <main className={'max-w-[1020px] px-3 mx-auto mt-11'}>
            <h1 className={'text-3xl'}>Home</h1>
            <hr className={'bg-black'}/>
            <div className={'flex items-center mt-3'}>
                <Search/>
                <ListBox/>
            </div>
            <div className={'mt-10 grid grid-cols-5 gap-4'}>
                {data.map(item =>
                    <Card key={item.id} {...item}/>
                )}
            </div>
        </main>
    );
};

export default Home;