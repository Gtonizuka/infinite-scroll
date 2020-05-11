import React from 'react';
import './Card.css'

const Card = ({ data }) => {
    const { id, address, homeowner, photoURL, price } = data;
    return (
        <div className={'media'}>
            <div className={'media__img'}>
                <img
                    alt={id}
                    src={photoURL}
                />
            </div>
            <div className={'media-body'}>
                <h3 className={'media__title'}>{address}</h3>
                <p className={'media__meta'}>${price}</p>
                <p className={'media__info'}>Sold by: {homeowner}</p>
                <p>
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                </p>
                <span className={'favourites'}>Save to my favourites</span>
            </div>
        </div>
    )
}

export default Card;
