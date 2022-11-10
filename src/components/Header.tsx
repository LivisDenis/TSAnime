import logo from '../assets/logo.svg'
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <div className={'shadow-lg'}>
            <nav className={'flex justify-between items-center max-w-[1020px] px-3 mx-auto py-3'}>
                <Link to='/'>
                    <img src={logo} alt="logo" width={70}/>
                </Link>
                <ul>
                    <li>
                        <Link to='/favourite'
                              className={'rounded-md p-3 bg-red-500 hover:bg-red-600 uppercase text-amber-50'}>favourite</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;