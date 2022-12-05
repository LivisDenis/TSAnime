import React, {useEffect} from 'react';
import Card from "../components/Card";
import {Link} from "react-router-dom";
import {HOME} from "../utils/consts";
import {useGetAnimeByUserQuery} from "../redux/anime/apiQuery";
import {CardSkeleton} from "../components/Skeleton";

const Favourite: React.FC = () => {
    const { data, error, isLoading, refetch } = useGetAnimeByUserQuery()

    // const favourite = data?.filter((el, ind) => ind === data.indexOf(el));

    useEffect(() => {
        refetch()
    }, [])

    return (
        <div>
            <h1 className={'text-3xl'}>Favourite</h1>
            {(error || data?.length! < 1) && <div className={'mt-[100px]'}>
                <h1 className={'text-4xl text-center'}>
                    {error
                        ? "An error has occurred 😢"
                        : "You don't have any favorite anime"
                    }
                </h1>
                <Link to={HOME} className={'rounded-md mx-auto mt-6 text-center block w-[100px] p-3 bg-red-500 hover:bg-red-600 uppercase text-amber-50'}>
                    Home
                </Link>
            </div>}
            <div className={'mt-10 grid grid-cols-4 gap-5 max-[740px]:gap-3 max-[580px]:mt-5 max-[830px]:grid-cols-3 max-[490px]:grid-cols-2'}>
                {isLoading
                    ? [...Array(4)].map((_, i) => <CardSkeleton key={i}/>)
                    : data?.map(item => <Card favRemove={true} key={item.id} {...item}/>)
                }
            </div>
        </div>
    );
};

export default Favourite;