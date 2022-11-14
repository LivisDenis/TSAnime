import {removeFavourite} from "../redux/anime/slice";

export const deleteFavourite = (id: string, dispatch: any) => {
    dispatch(removeFavourite(id))
    const favStorageArr = localStorage.getItem('fv')?.slice(0, -1).split(',')
    const removeFavId = favStorageArr?.filter(item => item !== id).join(',')
    localStorage.setItem('fv', `${removeFavId},`)
}