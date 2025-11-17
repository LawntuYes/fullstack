import React from "react";

export const Post = ({ post }) => {
    const { id, title, body } = post;
    return (
        <div style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
            <h2>{title}</h2>
            <p>{body}</p>
            <p>ID: {id}</p>
        </div>
    );
}