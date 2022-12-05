import React, {useEffect, useState} from 'react';
import Search from "../components/Search";
import ListBox from "../components/Listbox";
import Card from "../components/Card";
import {useDebounce} from "../hooks/useDebounce";
import {CardSkeleton} from "../components/Skeleton";
import {useGetAnimeQuery} from "../redux/anime/apiQuery";
import {useLocation, useNavigate} from "react-router-dom";
import {SearchAnimeParams} from "../redux/anime/types";
import qs from 'qs';

const filters = [
    'Selected filter',
    'averageRating',
    'episodeCount',
    'startDate',
]

const Home: React.FC = () => {
    const [searchValue, setSearchValue] = useState('')
    const [offset, setOffset] = useState(1)
    const [page, setPage] = useState(1)
    const [selected, setSelected] = useState(filters[0])
    const debounced = useDebounce(searchValue)
    const navigate = useNavigate()
    const location = useLocation()

    // Requests for api
    const queryOffset = offset > 0 ? `&page[offset]=${offset}` : ''
    const querySearch = debounced ? `&filter[text]=${debounced}` : ''
    const rating = filters.includes(selected) && selected !== filters[0] ? `sort=-${selected}` : ''

    const {data, isFetching} = useGetAnimeQuery({
        queryOffset,
        querySearch,
        rating
    })

    // If the parameters were changed and there was a first render
    useEffect(() => {
        const search = searchValue?.length > 1 ? searchValue : null

        const params = {
            page: page,
            filter: selected !== filters[0] ? selected : 'default',
            search
        }

        const queryString = qs.stringify(params, {skipNulls: true});

        navigate(`/?${queryString}`);
    }, [offset, selected, debounced])

    // Parsing parameters on first render
    useEffect(() => {
        if (location.search) {
            const params = qs.parse(location.search.substring(1)) as unknown as SearchAnimeParams

            if (params.page === 2) {
                setOffset(9)
            }
            if (params.page > 2) {
                setOffset((params.page * 8 + 1) - 8)
            }
            if (params.filter !== 'default') {
                setSelected(params.filter)
            }
            setPage(Number(params.page))
            setSearchValue(params.search ?? '')
        }
    }, []);

    const onPagePlus = () => {
        setOffset(offset + 8)
        setPage(page + 1)
    }
    const onPageMinus = () => {
        if (offset - 8 > 0) {
            setOffset(offset - 8)
            setPage(page - 1)
        }
    }

    const skeletons = [...Array(8)].map((_, i) => <CardSkeleton key={i}/>)
    const anime = data?.map(item => <Card key={item.id} {...item}/>)

    return (
        <div>
            <h1 className={'text-3xl'}>Home</h1>
            <hr className={'bg-black'}/>
            <div className={'flex items-center mt-3'}>
                <Search offset={offset}
                        setOffset={setOffset}
                        setPage={setPage}
                        debounced={debounced}
                        setSearchValue={setSearchValue}
                        searchValue={searchValue}/>
                <ListBox setSelected={setSelected} selected={selected} filters={filters}/>
            </div>
            <div
                className={'mt-10 grid grid-cols-4 gap-5 max-[740px]:gap-3 max-[580px]:mt-5 max-[830px]:grid-cols-3 max-[490px]:grid-cols-2'}>
                {isFetching ? skeletons : anime}
                {/*{skeletons}*/}
            </div>
            <div className={'flex justify-center'}>
                <button onClick={onPageMinus}
                        disabled={page === 1}
                        className={'rounded-md mr-2 mt-6 text-center block w-[100px] p-3 bg-red-500 hover:bg-red-600 uppercase text-amber-50'}>
                    PREV
                </button>
                <button onClick={onPagePlus}
                        className={'rounded-md ml-2 mt-6 text-center block w-[100px] p-3 bg-red-500 hover:bg-red-600 uppercase text-amber-50'}>
                    NEXT
                </button>
            </div>
        </div>
    );
};

export default Home;