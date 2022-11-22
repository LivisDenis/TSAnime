import React from 'react';
import {useNavigate} from "react-router-dom";

const Profile: React.FC = () => {
    const navigate = useNavigate()

    const onClickLogout = () => {
        localStorage.removeItem('token')
        navigate('/')
    }
    return (
        <div>
            <button onClick={onClickLogout}>remove</button>
        </div>
    );
};

export default Profile;