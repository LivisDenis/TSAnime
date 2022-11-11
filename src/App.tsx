import Header from "./components/Header";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import {ANIME_PAGE, FAVOURITE, HOME} from "./utils/consts";
import AnimePage from "./pages/AnimePage";

const App = () => {
    return (
        <div>
            <Header/>
            <main className={'max-w-[1020px] px-3 mx-auto my-11'}>
                <Routes>
                    <Route path={HOME} element={<Home />} />
                    <Route path={ANIME_PAGE} element={<AnimePage />} />
                    <Route path={FAVOURITE} />
                </Routes>
            </main>
        </div>
    )
}

export default App
