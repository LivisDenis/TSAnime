import React from 'react';
import {DescSkeleton, ImgSkeleton, TableSkeleton, TitleSkeleton} from "./Skeleton";

const PageSkeleton = () => {
    return (
        <div>
            <div className={'text-[28px] max-[590px]:text-center'}>
                <TitleSkeleton className={'text-[28px] max-w-full max-[590px]:text-center'} />
            </div>
            <div className={'flex mt-4 gap-7 max-[590px]:flex-col'}>
                <div className={'flex items-start max-[670px]:max-w-[250px] max-[590px]:mx-auto'}>
                    <ImgSkeleton />
                </div>
                <div className={'flex items-start max-w-[400px] w-full max-[590px]:mx-auto max-[590px]:max-w-full'}>
                    <TableSkeleton className={'flex items-start max-w-[400px] w-full max-[590px]:mx-auto max-[590px]:max-w-full'} />
                </div>
            </div>
            <button
                className={'relative h-[48px] min-w-[172px] my-5 rounded-md p-3 bg-blue-500 hover:bg-blue-600 uppercase text-amber-50 max-[590px]:w-full'}
            >
                ADD TO FAVOURITE
            </button>
            <DescSkeleton />
        </div>
    );
};

export default PageSkeleton;