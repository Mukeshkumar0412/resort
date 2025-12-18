// import React, { Component } from 'react';
// import defaultBcg from '../images/room-1.jpeg';
// import Hero from '../components/Hero';
// import Banner from '../components/Banner';
// import {Link} from 'react-router-dom';
// import{RoomContext} from '../context';
// import StyledHero from '../components/StyledHero';

// export default class SingleRoom extends Component {
//     state={
//             slug:this.props.match.params.slug,
//             defaultBcg};
//     static contextType=RoomContext;
    
//     render() {
//         const {getRoom}=this.context;
//         const room=getRoom(this.state.slug);
//         if(!room){
//             return  <div className="error">
//             <h3>No Such Room could be found.....</h3>
//             <Link className="btn-primary">back to rooms</Link>
//         </div>
//         }
//         const {name,description,capacity,size,price,extras,breakfast,pets,images}=room;
//         const [mainImg, ...defaultImg]=images;
//         return<>
//          <StyledHero img={images[0]}>
//             <Banner title={`${name} room`}>
//             <Link className="btn-primary" to="/rooms">back to rooms</Link>
//             </Banner>
          
//         </StyledHero>   
//         <section className="single-room">
//                 <div className="single-room-images">
//                 {
//                      defaultImg.map((item,index)=>{
//                              return <img key={index} src={item} alt={name}/>

//                                      })
//                  }
//                 </div>

//                 <div className="single-room-info">
//                     <article className="desc">
//                         <h3>details</h3>
//                         <p>{description}</p>

//                     </article>
//                     <article className="info">
//                         <h3>info</h3>
//                         <h6>price: ${price}</h6>
//                         <h6>size: ${price} SQFT</h6>
//                         <h6>
//                             {
//                                 capacity>1?`${capacity} people`:`${capacity} person`
//                             }
                            
//                         </h6>
//                         <h6>
//                             {
//                                 pets?'pets Allowed':'no pets allowed'
//                             }

//                         </h6>
//                         <h6>
//                             {
//                                 breakfast&&'free break fast included'
//                             }

//                         </h6>
//                     </article>
//                 </div>
//             </section>
//             <section className="room-extras">
//                   <h6>extras</h6>          
//                     <ul className="extras">
//                             {
//                                 extras.map((item,index)=>{
//                                     return <li key={index} >{item}</li>
//                                 })
//                             }
//                     </ul>
//             </section>
       
            
//         </>
//     }
// }


import React, { Component } from 'react';
import defaultBcg from '../images/room-1.jpeg';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import {Link} from 'react-router-dom';
import {RoomContext} from '../context';
import StyledHero from '../components/StyledHero';
import BookingModal from '../components/BookingModel';

export default class SingleRoom extends Component {
    state = {
        slug: this.props.match.params.slug,
        defaultBcg,
        showBookingModal: false,
        bookingConfirmed: false
    };
    
    static contextType = RoomContext;
    
    handleBookNow = () => {
        this.setState({ showBookingModal: true });
    };
    
    handleCloseModal = () => {
        this.setState({ showBookingModal: false });
    };
    
    handleConfirmBooking = (bookingData) => {
        // Here you would typically send the booking data to your backend
        console.log('Booking confirmed:', bookingData);
        this.setState({ 
            showBookingModal: false,
            bookingConfirmed: true
        });
    };
    
    render() {
        const { getRoom } = this.context;
        const room = getRoom(this.state.slug);
        
        if (!room) {
            return (
                <div className="error">
                    <h3>No Such Room could be found.....</h3>
                    <Link to="/rooms" className="btn-primary">back to rooms</Link>
                </div>
            );
        }
        
        const { name, description, capacity, size, price, extras, breakfast, pets, images } = room;
        const [mainImg, ...defaultImg] = images;
        
        return (
            <>
                <StyledHero img={images[0]}>
                    <Banner title={`${name} room`}>
                        <Link className="btn-primary" to="/rooms">back to rooms</Link>
                        <button 
                            className="btn-primary" 
                            onClick={this.handleBookNow}
                            style={{ marginTop: '10px',
                                marginLeft: "10px",
                                padding:'10px'
                             }}
                        >
                            Book Now
                        </button>
                    </Banner>
                </StyledHero>
                
                {this.state.showBookingModal && (
                    <BookingModal 
                        room={room}
                        onClose={this.handleCloseModal}
                        onConfirm={this.handleConfirmBooking}
                    />
                )}
                
                {this.state.bookingConfirmed && (
                    <div className="banner" style={{ margin: '2rem auto', maxWidth: '600px' }}>
                        <h3>Booking Confirmed!</h3>
                        <p>Thank you for your booking. We've sent a confirmation to your email.</p>
                    </div>
                )}
                
                <section className="single-room">
                    {/* ... rest of your existing single room content ... */}
                </section>
            </>
        );
    }
}