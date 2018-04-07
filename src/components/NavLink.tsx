import * as React from 'react';
import { withPrefix } from 'gatsby-link'
import Link from 'gatsby-link';
import {IoSocialGithub, IoSocialTwitter} from 'react-icons/lib/io'

const maybeRenderIcon = (icon: string) => {
    switch (icon) {
        case 'github':
            return <IoSocialGithub />
        case 'twitter':
            return <IoSocialTwitter />
        default:
            return null;
    }
}

export const NavLink = (props: {text?: string, url: string, icon?: string}) => {
    return (
        <a
            className="nav-link"
            href={props.url}
        >
            {maybeRenderIcon(props.icon) || <span>{props.text}</span>}
        </a>

    )
}
