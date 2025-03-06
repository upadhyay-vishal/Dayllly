import React, { useState } from 'react';
import img1 from '../../images/daylyy.png';
import img2 from '../../images/622b5332f4a1254c3dbbe6012ea589eb.gif';
import *  as Yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Modal, Button, Form } from "react-bootstrap";

const userSchema = Yup.object().shape({

    password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(/[@$!%*?&#]/, "Password must contain at least one special character (@$!%*?&#)"),

    Confirmpassword: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(/[@$!%*?&#]/, "Password must contain at least one special character (@$!%*?&#)")

});


function Changepassword() {
    const navigate = useNavigate()

    const defaultPassword = "@886Vishal";
    const ConfirmdefaultPassword = "@886Vishal";

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

        if (values.password === defaultPassword && values.Confirmpassword === ConfirmdefaultPassword) {
            toast.success('Password Changed Successfully')
        }
        else {
            toast.error('Password Mismatch');
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
                                <h4 className='fw-bold fs-4'>Change Password</h4>
                                <p>A 6 digit code has been sent on your registered email ID.</p>
                                <form className='form-group form' autoComplete='on' onSubmit={handleSubmit(onSubmit)} noValidate>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="mb-3">
                                                <label for="exampleInputPassword1 " className="form-label">New Password</label>
                                                <input type="password" placeholder='*************' className="form-control fw-semibold"
                                                    {...register('Confirmpassword')} />
                                                {errors?.Confirmpassword &&
                                                    <p className='error'>{errors?.Confirmpassword?.message}</p>
                                                }
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="mb-3">
                                                <label for="exampleInputPassword1 " className="form-label">Confirm New Password</label>
                                                <input type="password" placeholder='*************' className="form-control fw-semibold"
                                                    {...register('password')} />
                                                {errors?.password &&
                                                    <p className='error'>{errors?.password?.message}</p>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" className="form-control btn_login py-2" data-bs-toggle="modal" data-bs-target="#exampleModal">Change Password</button>

                                    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered">
                                            <div className="modal-content">
                                                <div className="d-flex flex-column align-items-center px-5 py-4 text-center">
                                                    <img src={img2} alt="" class="check_img" />
                                                    <p class="fw-bold fs-5">Password Changed Successfully</p>
                                                    <p>Your password has been changed successfully. You can now login and start using your account</p>
                                                    <button type="submit" onClick={() => navigate('/')} className="form-control btn_login py-2" data-bs-toggle="modal" data-bs-target="#exampleModal">Login</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}




export default Changepassword;