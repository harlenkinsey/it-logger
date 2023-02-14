import React, { useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import { successUpdated } from './recaptchaSlice';
import { selectView } from '../view/viewSlice';
import { useDispatch, useSelector } from 'react-redux';


export const Recaptcha = () => {
    const dispatch = useDispatch();
    const view = useSelector(selectView);

    useEffect(() => {
        
    }, [dispatch, view])

    const onChange = value => {    
        
        axios.post('https://www.google.com/recaptcha/api/siteverify', { 
            secret: process.env.REACT_APP_SECRET_KEY, 
            response: value
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(res => {
            dispatch(successUpdated(res.data['success']));
        })
        .catch(error => {
            console.log(error);
        })
    }

    return (
        <ReCAPTCHA
            sitekey={process.env.REACT_APP_SITE_KEY}
            onChange={onChange}
            theme='light'
        />
    )
}