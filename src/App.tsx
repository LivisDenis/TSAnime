import Header from "./components/Header";
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import {ANIME_PAGE, FAVOURITE, HOME, LOGIN, PROFILE, REGISTER} from "./utils/consts";
import AnimePage from "./pages/AnimePage";
import Favourite from "./pages/Favourite";
import {useEffect} from "react";
import {addFavourite} from "./redux/anime/slice";
import {useAppDispatch} from "./redux/store";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Login from "./pages/Login";

const App = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        const favStorage = localStorage.getItem('fv')?.slice(0, -1).slice(1).split(',')
        favStorage && favStorage.forEach(item =>
            dispatch(addFavourite(item))
        )
        // if (localStorage.getItem('token')) {
        //     axios.get('/auth/me')
        //         .then(res => console.log(res.data))
        // }
    }, [])

    return (
        <div>
            <Header/>
            <main className={'max-w-[1020px] px-3 mx-auto my-11 max-[740px]:mt-5'}>
                <Routes>
                    <Route path={HOME} element={<Home />} />
                    <Route path={ANIME_PAGE} element={<AnimePage />} />
                    <Route path={FAVOURITE} element={<Favourite />} />
                    <Route path={PROFILE} element={<Profile />} />
                    <Route path={REGISTER} element={<Register />} />
                    <Route path={LOGIN} element={<Login />} />
                    <Route path="*" element={<Navigate to={HOME} replace />}/>
                </Routes>
            </main>
        </div>
    )
}

export default App
