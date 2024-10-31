import React, { Component, useEffect, useRef, useState } from 'react'
import BookingService from '../../services/BookingService';
import { useNavigate } from 'react-router-dom';
import './Booking.css';


export default function Booking(props) {
    const history = useNavigate();
    const service = new BookingService();
    const [flag, setflag] = useState(false);
    const [state, setState] = useState({
        flightNumber: '',
        source: '',
        destination: '',
        date: '',
        passengers: [1, 2, 3, 4, 5, 6],
    });
    const [numberOfSeatsToBook, setNumberOfSeatsToBook] = useState(1);
    const flight = useRef(null);

    useEffect(() => {
        try {
            const flightData = JSON.parse(localStorage.getItem("plane"));
            if (flightData !== null) {
                flight.current = flightData;
                setflag(true);
                setState({
                    ...state,
                    flightNumber: flight.current.flightNumber,
                    source: flight.current.source,
                    destination: flight.current.destination,
                    date: flight.current.travelDate,
                });
            } else {
                history("/"); // Redirect to login or error page if no flight data found
            }
        } catch (error) {
            console.error("Error retrieving flight data:", error);
            // Handle
        }
    }, []);


    useEffect(() => {
        if (!JSON.parse(localStorage.getItem("user"))) {
            history("/login")
        }
    }, [history])

    const handleInput = (event) => {
        setState({
            [event.target.name]: event.target.value
        });
    };

    const goOnPassangers = () => {
        console.log(numberOfSeatsToBook);
        localStorage.setItem("nop", numberOfSeatsToBook);
        service
            .addBooking(
                numberOfSeatsToBook,
                state.flightNumber,
                state.source,
                state.destination,
                state.date
            )
            .then((response) => {
                if (response.data.length > 3) {

                }
                else {
                    history("/passengers");
                }
            });
    };

    return (
        <div className='home'>
            <div className="main-content">
            <div className="booking-container"> 
            <h1 className="form-title">Book your tickets</h1>
                <div>
                </div>
                <div>
                    <form id ="bookingForm">
                        <div>
                           <label  htmlFor='flightNumber'>Flight No.</label>
                            <input
                                type="text"
                                onChange={handleInput}
                                value={state.flightNumber}
                                name="flightNumber"
                                readOnly
                                disabled={!flag}
                            />
                        </div>
                        <div>
                        <label htmlFor='flightSource'>Flight Source</label>
                            <input
                                type="text"
                                onChange={handleInput}
                                value={state.source}
                                name="source"
                                readOnly
                                disabled={!flag}
                            />
                        </div>
                        <div>
                        <label htmlFor='flightDestination'>Flight Destination</label>
                            <input
                                type="text"
                                onChange={handleInput}
                                value={state.destination}
                                name="destination"
                                readOnly
                                disabled={!flag}
                            />
                        </div>
                        <div>
                        <label htmlFor='flightDestination'>Flight Destination</label>

                            <input
                                type="text"
                                onChange={handleInput}
                                value={state.date}
                                name="date"
                                readOnly
                                disabled={!flag}
                            />
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <span className="form-label">
                                        Total Passengers
                                    </span>
                                    {flag && (state.passengers && state.passengers.length > 0) && (
                                        < select
                                            className="form-control"
                                            onChange={e => setNumberOfSeatsToBook(e.target.value)}
                                            value={numberOfSeatsToBook}
                                        >{

                                                state.passengers.map((psng) => (
                                                    <option key={psng} value={psng}>{psng}</option>
                                                ))
                                            }
                                        </select>)
                                    }
                                    <span className="select-arrow"></span>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <div className='button-class'>
                            <button
                                onClick={goOnPassangers}
                                type="button"
                                className="btn btn-primary"
                            >   
                                {" "}
                                Book Ticket
                            </button>
                            </div>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
            </div >
            
        
    )
}

