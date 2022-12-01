import React from 'react';
import {DescSkeleton, ImgSkeleton, TableSkeleton, TitleSkeleton} from "./Skeleton";

const PageSkeleton = () => {
    return (
        <div>
            <TitleSkeleton />
            <div className={'flex mt-4 gap-7 max-[590px]:flex-col'}>
                <ImgSkeleton />
                <TableSkeleton />
            </div>
            <button
                className={'my-5 rounded-md p-3 bg-blue-500 hover:bg-blue-600 uppercase text-amber-50 max-[590px]:w-full'}
            >
                ADD TO FAVOURITE
            </button>
            <DescSkeleton />
        </div>
    );
};

export default PageSkeleton;