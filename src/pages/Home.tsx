import React, {useEffect, useState} from 'react';
import Search from "../components/Search";
import ListBox from "../components/Listbox";
import Card from "../components/Card";
import {useAppDispatch, useAppSelector} from "../redux/store";
import {fetchAnime} from "../redux/anime/AsyncActions";
import {PuffLoader} from "react-spinners";
import {useDebounce} from "../hooks/useDebounce";

const filters = [
    'Selected filter',
    'averageRating',
    'episodeCount',
    'startDate',
]

const Home = () => {
    const dispatch = useAppDispatch()
    const {data, status} = useAppSelector(state => state.anime)
    const [searchValue, setSearchValue] = useState('')
    const [offset, setOffset] = useState(1)
    const [selected, setSelected] = useState(filters[0])
    const debounced = useDebounce(searchValue)

    useEffect(() => {
        const queryOffset = offset > 0 ? `&page[offset]=${offset}` : ''
        const querySearch =  searchValue ? `&filter[text]=${searchValue}` : ''
        const rating = filters.includes(selected) && selected !== filters[0] ? `&sort=-${selected}` : ''

        dispatch(fetchAnime({
            queryOffset,
            querySearch,
            rating
        }))
    }, [debounced, offset, selected])

    return (
        <div>
            <h1 className={'text-3xl'}>Home</h1>
            <hr className={'bg-black'}/>
            <div className={'flex items-center mt-3'}>
                <Search setSearchValue={setSearchValue} searchValue={searchValue}/>
                <ListBox setSelected={setSelected} selected={selected} filters={filters}/>
            </div>
            <PuffLoader color="rgb(239 68 68)" className={'mx-auto mt-12'} loading={status === 'loading'} size={120} />
            <div className={'mt-10 grid grid-cols-4 gap-5'}>
                {data.map(item =>
                    <Card key={item.id} {...item}/>
                )}
            </div>
            <div className={'flex justify-center'}>
                <button onClick={() => setOffset(offset - 8)}
                        className={'rounded-md mr-2 mt-6 text-center block w-[100px] p-3 bg-red-500 hover:bg-red-600 uppercase text-amber-50'}>
                    PREV
                </button>
                <button onClick={() => setOffset(offset + 8)}
                        className={'rounded-md ml-2 mt-6 text-center block w-[100px] p-3 bg-red-500 hover:bg-red-600 uppercase text-amber-50'}>
                    NEXT
                </button>
            </div>
        </div>
    );
};

export default Home;