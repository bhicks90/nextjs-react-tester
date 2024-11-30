import React from "react";

interface URL {
    url: string;
}

const LINK_ATTRIBUTES = {
    target: "_blank",
    rel: "noopener",
    className: "hover:underline"
};

const Link: React.FC<URL> = ({ url }) => {
    return (
        <a href={url} {...LINK_ATTRIBUTES}>{url}</a>
    );
};

export default Link;