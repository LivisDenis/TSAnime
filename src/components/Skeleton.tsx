import React from 'react';
import ContentLoader from "react-content-loader"

const Skeleton = () => (
    <ContentLoader
        speed={2}
        width={234}
        height={463}
        viewBox="0 0 234 463"
        backgroundColor="#dbf0ff"
        foregroundColor="#fffafa"
    >
        <rect x="0" y="344" rx="0" ry="0" width="234" height="27" />
        <rect x="153" y="289" rx="0" ry="0" width="0" height="87" />
        <rect x="153" y="289" rx="0" ry="0" width="0" height="88" />
        <rect x="0" y="0" rx="16" ry="16" width="234" height="332" />
        <rect x="85" y="121" rx="0" ry="0" width="53" height="0" />
        <rect x="2" y="248" rx="0" ry="0" width="165" height="20" />
        <rect x="0" y="404" rx="0" ry="0" width="234" height="19" />
        <rect x="0" y="435" rx="0" ry="0" width="234" height="19" />
    </ContentLoader>
)

export default Skeleton;

