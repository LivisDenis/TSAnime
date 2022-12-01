import React, {useState} from 'react';
import Search from "../components/Search";
import ListBox from "../components/Listbox";
import Card from "../components/Card";
import {useDebounce} from "../hooks/useDebounce";
import {CardSkeleton} from "../components/Skeleton";
import {useGetAnimeQuery} from "../redux/anime/apiQuery";

const filters = [
    'Selected filter',
    'averageRating',
    'episodeCount',
    'startDate',
]

const Home: React.FC = () => {
    const [searchValue, setSearchValue] = useState('')
    const [offset, setOffset] = useState(1)
    const [selected, setSelected] = useState(filters[0])
    const debounced = useDebounce(searchValue)

    const queryOffset = offset > 0 ? `&page[offset]=${offset}` : ''
    const querySearch = searchValue ? `&filter[text]=${searchValue}` : ''
    const rating = filters.includes(selected) && selected !== filters[0] ? `sort=-${selected}` : ''

    const {data, isLoading} = useGetAnimeQuery({
        queryOffset,
        querySearch,
        rating
    })

    return (
        <div>
            <h1 className={'text-3xl'}>Home</h1>
            <hr className={'bg-black'}/>
            <div className={'flex items-center mt-3'}>
                <Search offset={offset}
                        setOffset={setOffset}
                        debounced={debounced}
                        setSearchValue={setSearchValue}
                        searchValue={searchValue}/>
                <ListBox setSelected={setSelected} selected={selected} filters={filters}/>
            </div>
            <div
                className={'mt-10 grid grid-cols-4 gap-5 max-[740px]:gap-3 max-[580px]:mt-5 max-[830px]:grid-cols-3 max-[490px]:grid-cols-2'}>
                {isLoading
                    ? [...Array(8)].map((_, i) => <CardSkeleton key={i}/>)
                    : data?.map(item => <Card key={item.id} {...item}/>)
                }
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