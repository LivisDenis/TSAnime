import React from 'react';

type ButtonProps = {
    handleClick: () => void
    changeBtn: boolean
}

const Button: React.FC<ButtonProps> = ({handleClick, changeBtn}) => {
    return (
        <button onClick={handleClick}
                className={`my-5 rounded-md p-3 ${changeBtn ? 'bg-blue-500 hover:bg-blue-600' : 'bg-red-500 hover:bg-red-600'} uppercase text-amber-50 max-[590px]:w-full`}
        >
            {changeBtn ? 'ADD TO FAVOURITE' : 'REMOVE'}
        </button>
    );
};

export default Button;