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

export type FiltersType = {
    name: string
    filterProperty: string
}

const filters: FiltersType[] = [
    {name: 'Default', filterProperty: 'Selected filter'},
    {name: 'Rating', filterProperty: 'averageRating'},
    {name: '-Rating', filterProperty: '-averageRating'},
    {name: 'Episode', filterProperty: 'episodeCount'},
    {name: '-Episode', filterProperty: '-episodeCount'},
    {name: 'Date', filterProperty: 'startDate'},
    {name: '-Date', filterProperty: '-startDate'},
]

const Home: React.FC = () => {
    const [searchValue, setSearchValue] = useState('')
    const [offset, setOffset] = useState(1)
    const [page, setPage] = useState(1)
    const [selected, setSelected] = useState<FiltersType>(filters[0])
    const debounced = useDebounce(searchValue)
    const navigate = useNavigate()
    const location = useLocation()

    // Requests for api
    const queryOffset = offset > 0 ? `&page[offset]=${offset}` : ''
    const querySearch = debounced ? `&filter[text]=${debounced}` : ''
    const rating = selected && selected.name !== filters[0].name ? `sort=${selected.filterProperty}` : ''

    const {data, isFetching} = useGetAnimeQuery({
        queryOffset,
        querySearch,
        rating
    })

    // If the parameters were changed and there was a first render
    useEffect(() => {
        window.scrollTo(0, 0);
        const search = searchValue?.length > 1 ? searchValue : null

        const params = {
            page: page,
            filter: selected?.name !== filters[0]?.name ? selected?.name : 'Default',
            search
        }

        const queryString = qs.stringify(params, {skipNulls: true});

        navigate(`/?${queryString}`);
    }, [offset, selected, debounced])

    // Parsing parameters on first render
    useEffect(() => {
        if (location.search) {
            const params = qs.parse(location.search.substring(1)) as unknown as SearchAnimeParams

            if (params.page == 2) {
                setOffset(9)
            }
            if (params.page > 2) {
                setOffset((params.page * 8 + 1) - 8)
            }
            if (params.filter !== 'Default') {
                const paramsFilter = filters.filter(filter => filter.name == params.filter)
                setSelected(paramsFilter[0] || filters[0])
            }
            setPage(Number(params.page))
            setSearchValue(params.search ?? '')
        }
    }, []);

    // Reset page after changes
    useEffect(() => {
        if (searchValue) {
            setOffset(1)
            setPage(1)
        }
    }, [debounced, selected])

    const onPagePlus = () => {
        setOffset(offset => offset + 8)
        setPage(page => page + 1)
    }
    const onPageMinus = () => {
        if (offset - 8 > 0) {
            setOffset(offset => offset - 8)
            setPage(page => page - 1)
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
                        selected={selected}
                        debounced={debounced}
                        filters={filters}
                        setSearchValue={setSearchValue}
                        searchValue={searchValue}/>
                <ListBox setSelected={setSelected} selected={selected} filters={filters}/>
            </div>
            <div
                className={'mt-10 grid grid-cols-4 gap-5 max-[740px]:gap-3 max-[580px]:mt-5 max-[830px]:grid-cols-3 max-[490px]:grid-cols-2'}>
                {isFetching ? skeletons : anime}
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