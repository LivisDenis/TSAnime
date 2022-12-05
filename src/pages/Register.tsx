import React, {useState} from 'react';
import {Link, Navigate} from "react-router-dom";
import {HOME, LOGIN} from "../utils/consts";
import {SubmitHandler, useForm} from "react-hook-form";
import axios from "../axios";
import {PuffLoader} from "react-spinners";
import {UserType} from "../redux/anime/apiQuery";

type Inputs = {
    fullName: string,
    email: string,
    password: string,
};

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({mode: "onChange"})
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit: SubmitHandler<Inputs> = async (params) => {
        setIsLoading(true)
        const {data} = await axios.post<UserType>(`/auth/registration`, params)

        if (!data) {
            alert('Не удалось зарегистрироваться')
        }

        if ('token' in data) {
            localStorage.setItem('token', data.token!)
        }
        console.log(data)
        setIsLoading(false)
    }

    if (localStorage.getItem('token')) {
        return <Navigate to={HOME}/>
    }

    return (
        <div className={'w-[400px] rounded-3xl p-4 bg-gray-300 mx-auto mt-[150px] max-[500px]:w-full max-[500px]:mt-[50px]'}>
            <h1 className={'text-center text-[32px]'}>Registration</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={'grid grid-rows-3 gap-6 mt-3'}>
                    <label className={'relative uppercase text-[14px]'}>
                        Name
                        <input type="Name"
                               {...register("fullName", {required: "Type your password", minLength: 2})}
                               required
                               placeholder={'Type your name...'}
                               className={'shadow-md w-full py-3 pl-3 rounded-md mx-auto'}/>
                        {errors.fullName && <span className={'absolute bottom-[-20px] left-0 text-[12px] text-red-700'}>
                            Minimum name length 2 characters
                        </span>
                        }
                    </label>
                    <label className={'uppercase text-[14px]'}>
                        email
                        <input type="email"
                               {...register("email")}
                               required
                               placeholder={'Type your email...'}
                               className={'shadow-md w-full py-3 pl-3 rounded-md mx-auto'}/>
                    </label>
                    <label className={'relative uppercase text-[14px]'}>
                        password
                        <input type="password"
                               {...register("password",{required: "Type your password", minLength: 6})}
                               required
                               placeholder={'Type your password...'}
                               className={'shadow-md w-full py-3 pl-3 rounded-md mx-auto'}/>
                        {errors.password && <span className={'absolute bottom-[-20px] left-0 text-[12px] text-red-700'}>
                                Minimum password length 6 characters
                            </span>
                        }
                    </label>
                </div>
                <div className={'mt-8 flex justify-between items-center'}>
                    <p className={'text-[14px] mr-2'}>
                        Does the account already exist?
                        <Link className={'text-blue-600'} to={LOGIN}> Login</Link>
                    </p>
                    <button
                        className={'relative block h-[42px] w-[98px] ml-auto text-[16px] rounded-md py-[10px] px-[12px] bg-red-500 hover:bg-red-600 uppercase text-amber-50'}>

                        {isLoading ? '' : 'register'}

                        <span className={'absolute left-[39%] top-[50%] translate-x-0 translate-y-[-50%]'}>
                            <PuffLoader loading={isLoading} size={20}/>
                        </span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Register;