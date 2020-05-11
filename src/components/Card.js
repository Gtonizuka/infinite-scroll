import React from 'react';
import './Card.css'

const Card = ({ data }) => {
    const { id, address, homeowner, photoURL, price } = data;
    return (
        <div className="card" >
            <div className="card-body">
                <img
                    alt={id}
                    src={photoURL}
                />
            </div>
            <div className="card-footer">
                <p>{address}</p>
                <p>{price}</p>
                <p>{homeowner}</p>
            </div>
        </div>
    )
}

export default Card;
