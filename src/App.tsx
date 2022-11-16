import Header from "./components/Header";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import {ANIME_PAGE, FAVOURITE, HOME} from "./utils/consts";
import AnimePage from "./pages/AnimePage";
import Favourite from "./pages/Favourite";
import {useEffect} from "react";
import {addFavourite} from "./redux/anime/slice";
import {useAppDispatch} from "./redux/store";

const App = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        const favStorage = localStorage.getItem('fv')?.slice(0, -1).slice(1).split(',')
        favStorage && favStorage.forEach(item =>
            dispatch(addFavourite(item))
        )
    }, [])

    return (
        <div>
            <Header/>
            <main className={'max-w-[1020px] px-3 mx-auto my-11 max-[740px]:mt-5'}>
                <Routes>
                    <Route path={HOME} element={<Home />} />
                    <Route path={ANIME_PAGE} element={<AnimePage />} />
                    <Route path={FAVOURITE} element={<Favourite />} />
                </Routes>
            </main>
        </div>
    )
}

export default App
