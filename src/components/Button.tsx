import React from 'react';
import {AnimeType} from "../redux/anime/types";
import {PuffLoader} from "react-spinners";

type ButtonProps = {
    handleClick: () => void
    changeBtn: boolean
    isRemove: AnimeType[] | undefined
    loading: boolean
    token?: string | null
}

const Button: React.FC<ButtonProps> = ({handleClick, changeBtn, isRemove, loading, token}) => {
    const checkFavouriteArr = isRemove?.length === 0 && changeBtn ? 'ADD TO FAVOURITE' : 'REMOVE'
    const checkLoadingAndDisplay = !loading && checkFavouriteArr

    const colorBtn = isRemove?.length === 0 && changeBtn || !token ? 'bg-blue-500 hover:bg-blue-600' : 'bg-red-500 hover:bg-red-600'

    return (
        <button onClick={handleClick}
                disabled={loading}
                className={`relative h-[48px] min-w-[172px] my-5 rounded-md p-3 ${colorBtn} uppercase text-amber-50 max-[590px]:w-full`}
        >
            <span className={'absolute left-[46%] top-[50%] translate-x-0 translate-y-[-50%]'}>
                <PuffLoader loading={loading} size={20} />
            </span>
            {!token ? 'ADD TO FAVOURITE' : checkLoadingAndDisplay}
        </button>
    );
};

export default Button;