import React, { useEffect, useState } from 'react'
import { Link, useNavigate} from 'react-router-dom';
import BookingService from '../../services/BookingService';
import { FaCcAmex, FaCcMastercard, FaCcVisa } from 'react-icons/fa6';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import './Payment.css'
import mastercard from  '../../assets/mastercardlogo.png'
import visa from '../../assets/visalogo.png'
import creditcard from '../../assets/creditcard.png'
import { BiFontSize } from 'react-icons/bi';




export default function Payment() {
    const [ticketNumber, setticketNumber] = useState(0);
    const [bokking_date, setBookingDate] = useState(0);
    const [total_pay, setTotalPay] = useState(0);
    const [name, setName] = useState('');
    const history = useNavigate();
    const service = new BookingService();

    useEffect(() => {
        if (!localStorage.getItem('user')) {
            history('/login');
        }
    }, [history]);

    const createTicket = (values) => {
        console.log(values.name);
        service.generateTicket(values)
            .then((response) => {
                console.log(response.data);
                if (response.status === 200) {
                    history('/ticket');
                }
            });
    };
    return (
        <div className='home'>
            <div className='payment-card'>
            <div className="payment-container">
                <h4>Confirm Payment</h4>
                <div className='card-icon'>
                    
                        <img src={mastercard} width={50} height={10}/> 
                        <img src={visa}/>
                        <img src={creditcard}/>

                </div>
               
            <Formik
                initialValues={{
                    cnumber: '',
                    exp1: '',
                    exp2:'',
                    cvc: '',
                    name: ''
                }}
                validationSchema={
                    Yup.object().shape({
                        cnumber: Yup.string().length(16, 'Card number must be 16 digits').required('Required'),
                        exp: Yup.string().required('Required'),
                        cvc: Yup.string().length(3, 'CVC must be 3 digits').required('Required'),
                        name: Yup.string().required('Required')
                    })
                }
                onSubmit={(values) => {
                    Swal.fire({
                        title: 'Are you sure?',
                        text: 'You are about to make a payment!',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Yes, make the payment!',
                        cancelButtonText: 'No, cancel!',
                        reverseButtons: true
                    }).then((result) => {
                        if (result.isConfirmed) {
                            createTicket(values);
                        } else if (result.dismiss === Swal.DismissReason.cancel) {
                            Swal.fire('Cancelled', 'Payment process was canceled :)', 'error');
                        }
                    });
                }}
            >
                {({ error, touched }) => (
                    <Form>
                        <div className='card-details'>
                        <div>
                            <label htmlFor='cc-number'>
                                CARD NUMBER
                            </label>
                            <Field name="cnumber" type="text" placeholder="XXXXXXXXXXXXXXXX" />
                            <ErrorMessage name='cnumber' component='div' />
                        </div>
                        <br />
                        <div>
                        <label htmlFor='holder-name'>
                                CARD HOLDER NAME
                            </label>
                            <Field name='name' type='text' placeholder='Enter Name on the card' />
                            < ErrorMessage name='name' component='div' />
                            {/* */}
                        </div>
                        
                       <br/>
                       <div className="expiry-security">
                        <label htmlFor='cc-exp'> EXPIRY DATE </label>
                        
                            <div className='expiry'>
                            <Field name='exp1'  placeholder="MM"  type='month' className='month-input' />
                            <ErrorMessage name='exp'  placeholder="YYYY" component='div'/>
                           
                            <span> /</span>
                            <Field name='exp2'  placeholder="YY" type='year' className='year-input'/>
                            <ErrorMessage name='exp' component='div'  />
                            </div>
                            <br/>
                            <label htmlFor='cc-cvc'> CARD CVV </label>
                            <Field name='cvc' type='password' placeholder='***' className='security'/>
                            <ErrorMessage name='cvc' component='div'/>
                            
                            </div>
                            {/*  /> */}
                        
                        <br />
            
                        </div>
                        
                        <div className='card-footer'>
                            {/* <Link to='/ticket'> */}
                            <button type='submit' className='subscribe btn btn-primary btn-block shadow-sm'><b>Pay Now</b></button>
                            {/* </Link> */}
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
        </div>
        </div>

    )
}
