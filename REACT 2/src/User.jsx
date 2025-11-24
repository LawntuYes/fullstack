import React from "react";

export const User = ({ user }) => {
    const { _id, name, email } = user;
    return (
        <div style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
            <h2>{name}</h2>
            <p>{email}</p>
            <p>ID: {_id}</p>
        </div>
    );
}