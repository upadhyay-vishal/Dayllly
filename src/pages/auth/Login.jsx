import React, { useEffect, useState } from 'react';
import img1 from '../../images/daylyy.png';
import *  as Yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const userSchema = Yup.object().shape({
    firstName: Yup.string()
        .required("First name is required")
        .matches(/^[A-Za-z]+$/, "Only alphabets are allowed")
        .min(2, "First name must be at least 2 characters")
        .max(50, "First name can't be more than 50 characters"),

    lastName: Yup.string()
        .required("Last name is required")
        .matches(/^[A-Za-z]+$/, "Only alphabets are allowed")
        .min(2, "Last name must be at least 2 characters")
        .max(50, "Last name can't be more than 50 characters"),

    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),

    password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
    // .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    // .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    // .matches(/[0-9]/, "Password must contain at least one number")
    // .matches(/[@$!%*?&#]/, "Password must contain at least one special character (@$!%*?&#)")
    ,

    mobileNumber: Yup.string()
        .required("Mobile number is required")
        .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),
});


function Login() {

    const navigate = useNavigate()

    const defaultEmail = "vishal.upadhyay886@gmail.com";
    const defaultPassword = "emilyspass";
    const defaultFirstName = "emilys";
    const defaultLastName = "Upadhyay";
    const defaultMobileNumber = '8868888688';

    // const handleEmailChange = (e) => {
    //     setEmail(e.target.value);
    // }

    // const handlePasswordChange = (e) => {
    //     setPassword(e.target.value);
    // }

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

    const onSubmit = async (values) => {
        console.log(values)
        try {
            const response = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: values.firstName,
                    password: values.password,
                }),
            });

            const data = await response.json();

            console.log(data)
            if (data) {
                localStorage.setItem('userDetails', JSON.stringify(data));
                toast.success('Login Successfully')
                navigate('/dashboard');
            }
            else {
                toast.error('Something went wrong');

            }
        }
        catch (error) {
            console.error('Error:', error);
        }


        // localStorage.setItem('UserData', values.password)



    }
    // useEffect(() => {
    //     let login = localStorage.getItem('login')
    //     if (login) {
    //         navigate('/')
    //     }
    // })

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
                                <h4 className='fw-bold fs-4'>Login to your account</h4>
                                <p>Enter the following details and start managing your admin panel</p>
                                <form className='form-group form' autoComplete='on' onSubmit={handleSubmit(onSubmit)} noValidate>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label for="exampleInputFirstName" className="form-label">First Name</label>
                                                <input type="text" placeholder='Enter First Name' className="form-control fw-semibold"
                                                    {...register('firstName')} />
                                                {errors?.firstName &&
                                                    <p className='error'>{errors?.firstName?.message}</p>
                                                }
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label for="exampleInputLastName " className="form-label">Last Name</label>
                                                <input type="text" placeholder='Enter Last Name' className="form-control fw-semibold"
                                                    {...register('lastName')} />
                                                {errors?.lastName &&
                                                    <p className='error'>{errors?.lastName?.message}</p>
                                                }
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Email address</label>
                                                <input type="email" placeholder='mathewperry@gmail.com' className="form-control fw-semibold"
                                                    {...register('email')} />
                                                {errors?.email &&
                                                    <p className='error'>{errors?.email?.message}</p>
                                                }
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label for="exampleInputPassword1 " className="form-label">Password</label>
                                                <input type="password" placeholder='*************' className="form-control fw-semibold"
                                                    {...register('password')} />
                                                {errors?.password &&
                                                    <p className='error'>{errors?.password?.message}</p>
                                                }
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label for="exampleInputMobileNumber1 " className="form-label">Mobile No.</label>
                                                <input type="text" placeholder='+91 8888777...' className="form-control fw-semibold"
                                                    {...register('mobileNumber')} />
                                                {errors?.mobileNumber &&
                                                    <p className='error'>{errors?.mobileNumber?.message}</p>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3 form-check">
                                        <div className='d-flex justify-content-between'>
                                            <div>
                                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                <label className="form-check-label" for="exampleCheck1">Remember Me</label>
                                            </div>
                                            <p class='cursr_pointer' onClick={() => navigate('/forgetpassword')}>Forgot Password?</p>
                                        </div>
                                    </div>
                                    <button type="submit" className="form-control btn_login py-2">Login</button>
                                </form>
                                <p className='text-center mt-3'>Don’t have an account ? <span>Create a new account</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;