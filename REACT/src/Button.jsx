import React from 'react'

export const Button = ({hat}) => {
    const {title, description, price} = hat;
    return(
    <div style={{ border: "1px solid white", margin: "10px", padding: "10px" }}>
        <img src = "/public/vite.svg" alt="hat image" style={{ width: "100px", height: "100px" }} />
        <h1>{title}</h1>
        <p>{description}</p>
        <p style={{color: "green"}}>Price {price}</p>
        <hr />
        <button>Click Me</button>
    </div>
    )
}
