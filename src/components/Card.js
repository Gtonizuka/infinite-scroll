import React from 'react';
import './Card.css'

const Card = ({ data }) => {
    const { address, homeowner, photoURL, price } = data;
    const mystyle = {
        backgroundImage: `url(${photoURL})`,
    };

    let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });


    return (
        <div className={'media'}>
            <div className={'media__img'}>
                <div className={'img-bg'} style={mystyle}></div>
                <p className={'media__meta'}>{formatter.format(price)}</p>
            </div>
            <div className={'media-body'}>
                <h3 className={'media__title'}>{address}</h3>
                <p className={'media__info'}>Sold by: {homeowner}</p>
                <p className={'media__para'}>
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                </p>
                <span className={'favourites'}>Save to my favourites <img src={'/heart.svg'} alt="heart icon" /></span>
            </div>
        </div >
    )
}

export default Card;
