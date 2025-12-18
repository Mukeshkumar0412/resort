import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BookingModal = ({ room, onClose, onConfirm }) => {
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    name: '',
    email: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm({
      ...bookingData,
      roomId: room.id,
      roomName: room.name,
      totalPrice: calculateTotalPrice()
    });
  };

  const calculateTotalPrice = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return room.price;
    const nights = (new Date(bookingData.checkOut) - new Date(bookingData.checkIn)) / (1000 * 60 * 60 * 24);
    return nights * room.price;
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Book {room.name}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Check-in Date:</label>
            <input
              type="date"
              name="checkIn"
              value={bookingData.checkIn}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div className="form-group">
            <label>Check-out Date:</label>
            <input
              type="date"
              name="checkOut"
              value={bookingData.checkOut}
              onChange={handleChange}
              required
              min={bookingData.checkIn || new Date().toISOString().split('T')[0]}
            />
          </div>
          <div className="form-group">
            <label>Number of Guests:</label>
            <input
              type="number"
              name="guests"
              value={bookingData.guests}
              onChange={handleChange}
              min="1"
              max={room.capacity}
              required
            />
          </div>
          <div className="form-group">
            <label>Full Name:</label>
            <input
              type="text"
              name="name"
              value={bookingData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={bookingData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input
              type="tel"
              name="phone"
              value={bookingData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <p>Total Price: ${calculateTotalPrice()}</p>
          </div>
          <button type="submit" className="btn-primary">
            Confirm Booking
          </button>
          <button type="button" onClick={onClose} className="btn-primary" style={{ marginTop: '10px', background: 'var(--mainGrey)', color: 'var(--mainBlack)' }}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;