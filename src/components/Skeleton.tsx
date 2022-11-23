import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props: any) => (
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

export default Skeleton