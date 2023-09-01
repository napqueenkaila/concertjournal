/* eslint-disable react/prop-types */
import React from 'react'

export default function Concert(props) {
    return (
        <div className="concert-container">
            <img className="concert-img" src={props.imageUrl} />
            <div className="outer-container">
                <h1 className="concert-tour">{props.tour}</h1>
                <h2 className="concert-band">{props.band}</h2>
                <p className="concert-acts">{props.otherActs}</p>
                <p className="concert-date">{props.date}</p>
                <div className="inner-container">
                    <i className="fa-solid fa-location-dot location-icon"></i>
                    <p className="concert-location">{props.location}</p>
                </div>
            </div>
        </div>
    )
}



// maybe add in a link next to location for more photos?