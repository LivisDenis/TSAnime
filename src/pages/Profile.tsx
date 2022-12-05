import React, {useEffect} from 'react';
import Dropdown from "../components/Dropdown";
import {useGetAnimeByUserQuery, useGetUserQuery} from "../redux/anime/apiQuery";

const Profile: React.FC = () => {
    const { data, refetch } = useGetAnimeByUserQuery()
    const {data: userInfo, refetch: userRefetch} = useGetUserQuery()

    useEffect(() => {
        refetch()
        userRefetch()
    }, [])

    return (
        <div>
            <div className={'relative flex items-center'}>
                <div className={'w-[150px] h-[150px] rounded-[50%] bg-gray-400 mr-10 max-[580px]:mr-5 max-[580px]:w-[90px] max-[580px]:h-[90px]'}></div>
                <div>
                    <h1 className={'text-[28px]'}>{userInfo?.fullName}</h1>
                    <p>
                        <span className={'font-medium'}>Id: </span>
                        {userInfo?._id}
                    </p>
                    <p>
                        <span className={'font-medium'}>Email: </span>
                        {userInfo?.email}
                    </p>
                    <p>
                        <span className={'font-medium'}>Your anime: </span>
                        {data?.length}
                    </p>
                    <p>
                        <span className={'font-medium'}>Created: </span>
                        {userInfo?.createdAt.split('T')[0]}
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