import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../redux/store";
import Dropdown from "../components/Dropdown";
import {fetchUser} from "../redux/user/AsyncActions";
import {useGetAnimeByUserQuery} from "../redux/anime/apiQuery";

const Profile: React.FC = () => {
    const dispatch = useAppDispatch()
    const {user} = useAppSelector(state => state.user)
    const { data, refetch } = useGetAnimeByUserQuery()

    useEffect(() => {
        refetch()
    }, [])

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(fetchUser())
        }
    }, [])

    return (
        <div>
            <div className={'relative flex items-center'}>
                <div className={'w-[150px] h-[150px] rounded-[50%] bg-gray-400 mr-10 max-[580px]:mr-5 max-[580px]:w-[90px] max-[580px]:h-[90px]'}></div>
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
                        {data?.length}
                    </p>
                    <p>
                        <span className={'font-medium'}>Created: </span>
                        {user?.createdAt.split('T')[0]}
                    </p>
                </div>
                <div className={'absolute top-0 right-0 flex-auto'}>
                    <Dropdown />
                </div>
            </div>
            {/*<div>*/}
            {/*    <h2 className={'text-center text-[30px]'}>Top anime</h2>*/}
            {/*    <ul>*/}
            {/*        <li>*/}

            {/*        </li>*/}
            {/*    </ul>*/}
            {/*</div>*/}
        </div>
    );
};

export default Profile;