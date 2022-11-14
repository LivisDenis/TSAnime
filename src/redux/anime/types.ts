
export type AnimeStateType = {
    data: AnimeType[]
    favourite: string[]
    offset: number
    status: AnimeSliceEnum
}

export enum AnimeSliceEnum {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

export type AnimeAttributesType = {
    ageRatingGuide: string
    averageRating: string
    canonicalTitle: string
    coverImage: AnimeCoverImageType
    startDate: string
    description: string
    endDate: string
    episodeCount: number
    posterImage: AnimePosterImageType
    slug: string
    status: string
    synopsis: string
    titles: AnimeTitlesType
    youtubeVideoId: string
}
type AnimeTitlesType = {
    en: string
    en_jp: string
    ja_jp: string
}
type AnimePosterImageType = {
    large: string
    medium: string
    original: string
    small: string
    tiny: string
}
type AnimeCoverImageType = {
    large: string
    original: string
    small: string
    tiny: string
}


export type AnimeType = {
    id: string
    attributes: AnimeAttributesType
    favRemove?: boolean
}

export type fetchParamsType = {
    queryOffset: string
    querySearch: string
    rating: string
}
