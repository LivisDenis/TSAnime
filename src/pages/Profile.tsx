import React from 'react';
import {useAppSelector} from "../redux/store";
import Dropdown from "../components/Dropdown";

const Profile: React.FC = () => {
    const {user} = useAppSelector(state => state.user)
    const {favourite} = useAppSelector(state => state.anime)

    return (
        <div>
            <div className={'flex'}>
                <div className={'w-[150px] h-[150px] rounded-[50%] bg-gray-400 mr-10'}></div>
                <div>
                    <h1 className={'text-[28px]'}>{user?.fullName}</h1>
                    <p>
                        <span className={'font-medium'}>Id: </span>
                        {user?._id}
                    </p>
                    <p>
                        <span className={'font-medium'}>Email: </span>
                        {user?.email}
                    </p>
                    <p>
                        <span className={'font-medium'}>Your anime: </span>
                        {favourite.length}
                    </p>
                    <p>
                        <span className={'font-medium'}>Created: </span>
                        {user?.createdAt.split('T')[0]}
                    </p>
                </div>
                <div className={'flex-auto'}>
                    <Dropdown />
                </div>
            </div>
            <div>
                <h2 className={'text-center text-[30px]'}>Top anime</h2>
                <ul>
                    <li>

                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Profile;