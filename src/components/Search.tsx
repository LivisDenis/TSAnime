import React, {useEffect} from 'react';

type SearchPropsType = {
    setSearchValue: React.Dispatch<React.SetStateAction<string>>
    setOffset: React.Dispatch<React.SetStateAction<number>>
    setPage: React.Dispatch<React.SetStateAction<number>>
    searchValue: string
    debounced: string
    offset: number
}

const Search: React.FC<SearchPropsType> = ({setSearchValue, searchValue, setOffset, debounced, setPage}) => {

    useEffect(() => {
        if (searchValue) {
            setOffset(1)
            setPage(1)
        }
        // if (offset > 1 && !searchValue) {
        //     setOffset(0)
        // }
    }, [debounced])

    return (
        <div className={'relative mr-7 max-[740px]:mr-4 max-[740px]:w-[50%]'}>
            <input type="text"
                   value={searchValue}
                   onChange={e => setSearchValue(e.target.value)}
                   placeholder='Search...'
                   className={'max-w-[600px] min-w-[300px] max-[740px]:min-w-full shadow-md w-full py-3 pl-10 rounded-md mx-auto'}/>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                 stroke="currentColor" className="absolute w-7 h-7 top-[10px] left-[8px]">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
            </svg>
        </div>
    );
};

export default Search;