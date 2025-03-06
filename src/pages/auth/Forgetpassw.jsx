import React, { useState } from 'react';
import img1 from '../../images/daylyy.png';
import *  as Yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useForm } from "react-hook-form";

const userSchema = Yup.object().shape({

    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
});

function Forgetpassw() {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate()


    const defaultEmail = "vishal.upadhyay886@gmail.com";


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

        if (values.email === defaultEmail) {
            toast.success('Email Verified')
            navigate("/otpverification");
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
                                <h4 className='fw-bold fs-4'>Forgot Password</h4>
                                <p>Forgot password? Don’t fret! Recover your password in few east steps</p>
                                <form className='form-group form' autoComplete='on' onSubmit={handleSubmit(onSubmit)} noValidate>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label pt-3">Registered Email ID</label>
                                                <input type="email" placeholder='mathewperry@gmail.com' className="form-control fw-semibold"
                                                    {...register('email')} />
                                                {errors?.email &&
                                                    <p className='error'>{errors?.email?.message}</p>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" className="form-control btn_login py-2">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Forgetpassw