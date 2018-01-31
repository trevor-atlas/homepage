import * as React from 'react';

interface AvatarProps {
    imageUri: string
    size: number
}

const Avatar = (props: AvatarProps) => {
    return (
        <svg
            viewBox="0 0 100 100"
            style={{height: props.size, width: props.size, flex: 1}}
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
        >
            <image
                height={props.size}
                width={props.size}
                x="-50%"
                y="-50%"
                xlinkHref={props.imageUri}
                clipPath="url(#hex)"
                preserveAspectRatio="xMidYMid"
            />
            <g>
                <clipPath id="hex">
                    <polygon points="50 1 95 25 95 75 50 99 5 75 5 25" fill="#333333"/>
                </clipPath>
            </g>
        </svg>
    )
};

export { Avatar };
