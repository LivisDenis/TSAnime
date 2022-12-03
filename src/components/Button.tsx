import React from 'react';
import {AnimeType} from "../redux/anime/types";
import {PuffLoader} from "react-spinners";

type ButtonProps = {
    handleClick: () => void
    changeBtn: boolean
    isRemove: AnimeType[] | undefined
    loading: boolean
}

const Button: React.FC<ButtonProps> = ({handleClick, changeBtn, isRemove, loading}) => {

    return (
        <button onClick={handleClick}
                disabled={loading}
                className={`relative h-[48px] min-w-[172px] my-5 rounded-md p-3 ${isRemove?.length === 0 && changeBtn ? 'bg-blue-500 hover:bg-blue-600' : 'bg-red-500 hover:bg-red-600'} uppercase text-amber-50 max-[590px]:w-full`}
        >
            <span className={'absolute left-[46%] top-[50%] translate-x-0 translate-y-[-50%]'}>
                <PuffLoader loading={loading} size={20} />
            </span>
            {!loading && (isRemove?.length === 0 && changeBtn ? 'ADD TO FAVOURITE' : 'REMOVE')}
        </button>
    );
};

export default Button;