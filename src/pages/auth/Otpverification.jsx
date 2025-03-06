import React, { useState } from 'react';
import img1 from '../../images/daylyy.png';
import *  as Yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useForm } from "react-hook-form";

const userSchema = Yup.object().shape({
    otp1: Yup.string()
        .required("OTP is required")
        .matches(/^\d{1}$/, "OTP must be a 1-digit number"),
    otp2: Yup.string()
        .required("OTP is required")
        .matches(/^\d{1}$/, "OTP must be a 1-digit number"),
    otp3: Yup.string()
        .required("OTP is required")
        .matches(/^\d{1}$/, "OTP must be a 1-digit number"),
    otp4: Yup.string()
        .required("OTP is required")
        .matches(/^\d{1}$/, "OTP must be a 1-digit number"),
    otp5: Yup.string()
        .required("OTP is required")
        .matches(/^\d{1}$/, "OTP must be a 1-digit number"),
    otp6: Yup.string()
        .required("OTP is required")
        .matches(/^\d{1}$/, "OTP must be a 1-digit number"),
});

function Otpverification() {

    const navigate = useNavigate()

    const defaultOtp1 = "1";

    // const loginFunc = () => {
    //     if (email === defaultEmail && password === defaultPassword) {
    //         alert("Login Success")
    //     }
    //     else if (email !== defaultEmail && password !== defaultPassword) {
    //         alert("Your credentilas are incorrect")
    //     }
    //     else if (email !== defaultEmail) {
    //         alert("Email Incorrect");
    //     }
    //     else if (password !== defaultPassword) {
    //         alert("Password Incorrect");
    //     }

    // }

    // const handleFormSubmit = (e) => {
    //     e.preventDefault();
    //     if (email !== '') {
    //         if ((email)) {
    //             setEmailError('')
    //         }
    //         else {
    //             setEmailError('Invalid Email')
    //         }
    //     }
    //     else {
    //         setEmailError('Email Required');
    //     }
    //     if (password !== '') {

    //     }
    //     else {
    //         setPasswordError('Password Required')
    //     }
    // }


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(userSchema),
    });
    console.log(errors, 'errors')

    const onSubmit = (values) => {
        console.log(values)

        if (values.otp1 === defaultOtp1) {
            toast.success('Otp Verified')
            navigate("/changepassword");
        }
        else {
            toast.error('Something went wrong');
        }
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className='d-flex align-items-center p-5 flex-wrap'>
                            <div className='firstloginbx'>
                                <img src={img1} alt="" className='dadly_logo' />
                                <div className='first_log_content'>
                                    <h2>Manage, Monitor, and Master Your Social Media </h2>
                                    <p> Gain full control, enhance security, and ensure smooth operations with powerful, user-friendly tools designed for administrators.</p>
                                </div>
                            </div>
                            <div className='ms-4 secondloginbx'>
                                <h4 className='fw-bold fs-4'>OTP Verification</h4>
                                <p>A 6 digit code has been sent on your registered email ID.</p>
                                <form className='form-group form' autoComplete='on' onSubmit={handleSubmit(onSubmit)} noValidate>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="mb-3">
                                                <label for="exampleInputMobileNumber1 " className="form-label">Code</label>
                                                <div className='d-flex justify-content-around'>
                                                    <input type="text" placeholder='1' className="form-control text-center ms-3"
                                                        {...register('otp1')} />

                                                    <input type="text" placeholder='1' className="form-control text-center ms-3"
                                                        {...register('otp2')} />

                                                    <input type="text" placeholder='1' className="form-control text-center ms-3"
                                                        {...register('otp3')} />
                                                    <input type="text" placeholder='1' className="form-control text-center ms-3"
                                                        {...register('otp4')} />
                                                    <input type="text" placeholder='1' className="form-control text-center ms-3"
                                                        {...register('otp5')} />
                                                    <input type="text" placeholder='1' className="form-control text-center ms-3"
                                                        {...register('otp6')} />
                                                </div>
                                                {errors?.otp1 &&
                                                    <p className='error'>{errors?.otp1?.message}</p>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" className="form-control btn_login py-2" >Submit</button>
                                </form>
                                <p className='text-center mt-3'>Didn’t receive the code ? <span>Resend in 51 secs</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Otpverification