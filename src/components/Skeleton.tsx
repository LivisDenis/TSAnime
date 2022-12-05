import React from "react"
import ContentLoader from "react-content-loader"

const CardSkeleton = (props: any) => (
    <ContentLoader
        speed={2}
        max-width={232}
        max-height={463}
        viewBox="0 0 232 463"
        backgroundColor="#bababa"
        foregroundColor="#ffffff"
        {...props}
    >
        <rect x="0" y="344" rx="0" ry="0" width="234" height="27" />
        <rect x="153" y="289" rx="0" ry="0" width="0" height="87" />
        <rect x="153" y="289" rx="0" ry="0" width="0" height="88" />
        <rect x="85" y="121" rx="0" ry="0" width="53" height="0" />
        <rect x="0" y="0" rx="16" ry="16" width="232" height="329" />
        <rect x="0" y="404" rx="0" ry="0" width="234" height="19" />
        <rect x="0" y="435" rx="0" ry="0" width="234" height="19" />
    </ContentLoader>
)
const ImgSkeleton = (props: any) => (
    <ContentLoader
        speed={2}
        width={280}
        max-height={397}
        viewBox="0 0 280 397"
        backgroundColor="#bababa"
        foregroundColor="#ffffff"
        {...props}
    >
        <rect x="153" y="289" rx="0" ry="0" width="0" height="87" />
        <rect x="153" y="289" rx="0" ry="0" width="0" height="88" />
        <rect x="85" y="121" rx="0" ry="0" width="53" height="0" />
        <rect x="0" y="0" rx="0" ry="0" width="280" height="397" />
        <rect x="0" y="404" rx="0" ry="0" width="234" height="19" />
        <rect x="0" y="435" rx="0" ry="0" width="234" height="19" />
    </ContentLoader>
)
const TitleSkeleton = (props: any) => (
    <ContentLoader
        speed={2}
        width={500}
        height={70}
        viewBox="0 0 500 70"
        backgroundColor="#bababa"
        foregroundColor="#ffffff"
        {...props}
    >
        <rect x="0" y="1" rx="0" ry="0" width="500" height="40" />
        <rect x="0" y="45" rx="0" ry="0" width="500" height="20" />
    </ContentLoader>
)
const TableSkeleton = (props: any) => (
    <ContentLoader
        speed={2}
        max-width={400}
        max-height={160}
        viewBox="0 0 400 160"
        backgroundColor="#bababa"
        foregroundColor="#ffffff"
        {...props}
    >
        <rect x="0" y="0" rx="0" ry="0" width="400" height="400" {...props} />
    </ContentLoader>
)
const DescSkeleton = (props: any) => (
    <ContentLoader
        speed={2}
        max-width={996}
        max-height={140}
        viewBox="0 0 996 140"
        backgroundColor="#bababa"
        foregroundColor="#ffffff"
        {...props}
    >
        <rect x="0" y="44" rx="0" ry="0" width="996" height="90" />
        <rect x="0" y="0" rx="0" ry="0" width="400" height="36" />
    </ContentLoader>
)



export {
    CardSkeleton,
    ImgSkeleton,
    TitleSkeleton,
    TableSkeleton,
    DescSkeleton
}