import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "../axios";
import {useGetAnimeByUserQuery, useGetOneAnimeQuery} from "../redux/anime/apiQuery";
import PageSkeleton from "../components/PageSkeleton";
import Button from "../components/Button";
import {LOGIN} from "../utils/consts";

const AnimePage: React.FC = () => {
    const {slug} = useParams()
    const navigate = useNavigate()
    const [changeBtn, setChangeBtn] = useState(true)
    const [saveLoading, setSaveLoading] = useState(false)
    const token = localStorage.getItem('token')

    const {data} = useGetOneAnimeQuery(slug!)
    const {data: favourite, refetch} = useGetAnimeByUserQuery()

    const isRemove = favourite?.filter(item => item.id === data?.id)

    if (!data) {
        return <PageSkeleton/>
    }

    const handleClick = async () => {
        setSaveLoading(true)
        if (!token) return navigate(LOGIN)

        isRemove?.length! > 0
            ? await axios.post(`/favourite/remove/${isRemove![0]._id}`)
                .then(() => setSaveLoading(false))
                .then(() => setChangeBtn(!changeBtn))
                .then(() => refetch())

            : await axios.post('/favourite/save', data)
                .then(() => setSaveLoading(false))
                .then(() => setChangeBtn(!changeBtn))
                .then(() => refetch())
    }

    const {
        averageRating, posterImage, startDate, ageRatingGuide, endDate,
        titles, description, youtubeVideoId, episodeCount
    } = data?.attributes

    const info = [
        {name: 'Rating:', value: averageRating},
        {name: 'Released:', value: startDate},
        {name: 'Episode count:', value: episodeCount},
        {name: 'Age:', value: ageRatingGuide},
    ]

    return (
        <div>
            <h1 className={'text-[28px] max-[590px]:text-center'}>{titles.en || titles.en_jp}</h1>
            <h2 className={'text-[18px] text-gray-500 max-[590px]:text-center'}>{titles.ja_jp}</h2>
            <div className={'flex mt-4 max-[590px]:flex-col'}>
                <img src={posterImage.large} width={280} alt="posterImage" className={'mr-7 max-[670px]:w-[250px] max-[590px]:mx-auto'}/>
                <div className={'flex flex-col max-w-[400px] w-full max-[590px]:mt-5 max-[590px]:mx-auto max-[590px]:max-w-full'}>
                    {info.map((item, i) =>
                        <div key={i} className={'grid grid-cols-2 gap-5 py-1 even:bg-slate-300 odd:bg-white'}>
                            <h2>{item.name}</h2>
                            <p>{item.value}</p>
                        </div>
                    )}
                    {episodeCount !== 1 && <div className={'grid grid-cols-2 gap-5 py-1'}>
                        <h2>Finished:</h2>
                        <p>{endDate}</p>
                    </div>
                    }
                </div>
            </div>
            <Button changeBtn={changeBtn}
                    loading={saveLoading}
                    handleClick={handleClick}
                    isRemove={isRemove}
                    token={token}/>
            <div>
                <h3 className={'text-2xl'}>About «{titles.en || titles.en_jp}»:</h3>
                <p className={'mt-2'}>{description}</p>
            </div>
            <div>
                <iframe src={`https://www.youtube.com/embed/${youtubeVideoId}`} frameBorder="0"
                        className={'mx-auto mt-8 w-[640px] h-[360px] max-[710px]:w-[540px] max-[710px]:h-[305px] max-[590px]:w-[370px] max-[590px]:h-[210px] max-[400px]:w-[300px] max-[400px]:h-[170px]'}></iframe>
            </div>
        </div>
    );
};

export default AnimePage;