import logo from '../assets/logo.svg'
import {Link} from "react-router-dom";
import React from "react";

const Header = () => {
    return (
        <header className={'shadow-lg'}>
            <nav className={'flex justify-between items-center max-w-[1020px] px-3 mx-auto py-3'}>
                <Link to='/'>
                    <img src={logo} alt="logo" width={70}/>
                </Link>
                <ul>
                    <li>
                        <Link to='/favourite'
                              className={'relative rounded-md p-3 bg-red-500 hover:bg-red-600 uppercase text-amber-50'}>
                            favourite
                            {/*<span className={'absolute right-0 top-0 w-5 h-5 rounded-[50%]'}>0</span>*/}
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;