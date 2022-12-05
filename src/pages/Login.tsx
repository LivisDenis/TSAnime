import React, {useState} from 'react';
import {Link, Navigate} from "react-router-dom";
import {HOME, REGISTER} from "../utils/consts";
import {SubmitHandler, useForm} from "react-hook-form";
import axios from "../axios";
import {PuffLoader} from "react-spinners";
import {UserType} from "../redux/anime/apiQuery";

type Inputs = {
    email: string,
    password: string,
};

const Login: React.FC = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>({mode: "onChange"})
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit: SubmitHandler<Inputs> = async (params) => {
        setIsLoading(true)
        const {data} = await axios.post<UserType>(`/auth/login`, params)

        if (!data) {
            alert('Не удалось авторизоваться')
        }

        if ('token' in data) {
            localStorage.setItem('token', data.token!)
        }
        setIsLoading(false)
    }

    if (localStorage.getItem('token')) {
        return <Navigate to={HOME}/>
    }

    return (
        <div className={'w-[400px] rounded-3xl p-4 bg-gray-300 mx-auto mt-[150px] max-[500px]:w-full max-[500px]:mt-[50px]'}>
            <h1 className={'text-center text-[32px]'}>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={'grid grid-rows-2 gap-6 mt-3'}>
                    <label className={'uppercase text-[14px]'}>
                        email
                        <input type="email"
                               defaultValue={'admin@admin.admin'}
                               {...register("email", {required: "Type your email"})}
                               required
                               placeholder={'Type your email...'}
                               className={'shadow-md w-full py-3 pl-3 rounded-md mx-auto'}/>
                    </label>
                    <label className={'relative uppercase text-[14px]'}>
                        password
                        <input type="password"
                               defaultValue={'123456'}
                               {...register("password", {required: "Type your password", minLength: 6})}
                               required
                               placeholder={'Type your password...'}
                               className={'shadow-md w-full py-3 pl-3 rounded-md mx-auto'}/>
                        {errors.password && <span className={'absolute bottom-[-20px] left-0 text-[12px] text-red-700'}>
                            Minimum password length 6 characters
                        </span>
                        }
                    </label>
                </div>
                <label className={'inline-block text-[14px] mt-5'}>
                    <input type="checkbox" className={'mr-1.5'}/>
                    Remember me
                </label>
                <div className={'mt-5 flex justify-between items-center'}>
                    <p className={'text-[14px] mr-2'}>
                        You don't have an account?
                        <Link className={'text-blue-600'} to={REGISTER}> Register</Link>
                    </p>
                    <button
                        disabled={isLoading}
                        className={'relative block h-[44px] w-[72px] text-[16px] rounded-md py-[10px] px-[12px] bg-red-500 hover:bg-red-600 uppercase text-amber-50'}>

                        {isLoading ? '' : 'Login'}

                        <span className={'absolute left-[37%] top-[50%] translate-x-0 translate-y-[-50%]'}>
                            <PuffLoader loading={isLoading} size={20}/>
                        </span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;