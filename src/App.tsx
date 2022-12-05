import Header from "./components/Header";
import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import Home from "./pages/Home";
import {ANIME_PAGE, FAVOURITE, HOME, LOGIN, PROFILE, REGISTER} from "./utils/consts";
import AnimePage from "./pages/AnimePage";
import Favourite from "./pages/Favourite";
import {useEffect} from "react";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Login from "./pages/Login";
import {useGetUserQuery} from "./redux/anime/apiQuery";

const App = () => {
    useLocation()
    const token = localStorage.getItem('token')
    const {refetch} = useGetUserQuery()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            refetch()
        }
    }, [])

    return (
        <div>
            <Header/>
            <main className={'max-w-[1020px] px-3 mx-auto my-11 max-[740px]:mt-5'}>
                <Routes>
                    <Route path={HOME} element={<Home />} />
                    <Route path={ANIME_PAGE} element={<AnimePage />} />
                    {token && <>
                        <Route path={FAVOURITE} element={<Favourite />} />
                        <Route path={PROFILE} element={<Profile />} />
                    </>}
                    {!token && <>
                        <Route path={REGISTER} element={<Register />} />
                        <Route path={LOGIN} element={<Login />} />
                    </>}
                    <Route path="*" element={<Navigate to={HOME} replace />}/>
                </Routes>
            </main>
        </div>
    )
}

export default App
