// import React from 'react';
// import {Link} from 'react-router-dom';
// import defaultImg from '../images/room-1.jpeg';
// import propTypes from 'prop-types';

// export default function Room({room}) {
//     if(room){
//     const {name,slug,images,price}=room;
//      return <article className="room">
//         <div className="img-container">
//            <img src={images[0]||defaultImg} alt="featured Room"/>
        
//         <div className="price-top">
//         <h6>${price}</h6>
//         <p>per night</p>
//         </div>
//         <Link to={`/rooms/${slug}`} className="btn-primary room-link"> 
//         Features
//         </Link>
//         </div>
//         <p className="room-info">{name}</p>
//         </article>
    
// }
// if(!room){
//  return <div style={{display:"none"}}>Loading</div>;}
    

// }


// Room.propTypes={
//     room:propTypes.shape({
//         name:propTypes.string.isRequired,
//         slug:propTypes.string.isRequired,
//         images:propTypes.arrayOf(propTypes.string).isRequired,
//         price:propTypes.number.isRequired,
//     })
// }


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import defaultImg from '../images/room-1.jpeg';
import propTypes from 'prop-types';
import BookingModal from './BookingModel';

export default function Room({ room }) {
    const [showBookingModal, setShowBookingModal] = useState(false);
    
    if (!room) {
        return <div style={{ display: "none" }}>Loading</div>;
    }
    
    const { name, slug, images, price } = room;
    
    return (
        <article className="room">
            <div className="img-container">
                <img src={images[0] || defaultImg} alt="featured Room" />
                
                <div className="price-top">
                    <h6>${price}</h6>
                    <p>per night</p>
                </div>
                
                <Link to={`/rooms/${slug}`} className="btn-primary room-link"> 
                    Features
                </Link>
                
                <button 
                    className="btn-primary room-link" 
                    style={{ top: '80%',
                        padding: '10px'
                     }}
                    onClick={() => setShowBookingModal(true)}
                >
                    Book Now
                </button>
            </div>
            
            <p className="room-info">{name}</p>
            
            {showBookingModal && (
                <BookingModal 
                    room={room}
                    onClose={() => setShowBookingModal(false)}
                    onConfirm={(bookingData) => {
                        console.log('Booking confirmed:', bookingData);
                        setShowBookingModal(false);
                    }}
                />
            )}
        </article>
    );
}

Room.propTypes = {
    room: propTypes.shape({
        name: propTypes.string.isRequired,
        slug: propTypes.string.isRequired,
        images: propTypes.arrayOf(propTypes.string).isRequired,
        price: propTypes.number.isRequired,
    })
};