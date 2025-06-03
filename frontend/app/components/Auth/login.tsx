'use client'
import React, { FC, useEffect, useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible, AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { styles } from "../../../app/styles/style";
import { useLoginMutation } from '@/redux/features/auth/authApi';
import toast from 'react-hot-toast';
import {signIn} from "next-auth/react";

type Props = {
    setRoute: (route: string) => void;
    setOpen: (open: boolean) => void;
}

const schema = Yup.object().shape({
    email: Yup.string().email("Invalid email!").required("Please enter your email!"),
    password: Yup.string().required("Please enter your password!").min(6),
});

const Login: FC<Props> = (props: Props) => {

    const [show, setShow] = useState(false);
    const [login, { error, isSuccess }] = useLoginMutation();
    useEffect(() => {
        if (isSuccess) {
            toast.success("Login successful!");
            props.setOpen(false);
        }
        if (error) {
            if ("data" in error) {
                const errorData = error as any;
                toast.error(errorData.data.message);
            }
        }
    }, [isSuccess, error]);

    const formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: schema,
        onSubmit: async ({ email, password }) => {
         await login({ email, password });
        }
    });
    const { errors, touched, values, handleChange, handleSubmit } = formik;
    return (
        <div className='w-full'>
            <h1 className={`${styles.title}`}>
                Login with Elearning
            </h1>
            <form onSubmit={handleSubmit} action="">
                <label htmlFor="email"
                    className={`${styles.label}`}>
                    Enter your Email
                </label>
                <input type="email"
                    name=""
                    value={values.email}
                    onChange={handleChange}
                    id='email'
                    placeholder='loginmail@gmail.co'
                    className={`${errors.email && touched.email && "border-red-500"} ${styles.input}`}
                />

                {
                    errors.email && touched.email && (
                        <span className="text-red-500 pt-2 block">{errors.email}</span>
                    )
                }
                <div
                    className='w-full mt-5 relative mb-1'
                >
                    <label htmlFor="email"
                        className={`${styles.label}`}>
                        Enter your Password
                    </label>
                    <input
                        type={!show ? "password" : "text"}
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        id='password'
                        placeholder='password!@#'
                        className={`${errors.password && touched.password && "border-red-500"} ${styles.input}`}
                    />
                    {
                        !show ? (
                            <AiOutlineEyeInvisible
                                className='absolute bottom-3 right-2 z-1 cursor-pointer'
                                size={20}
                                onClick={() => setShow(true)}
                            />
                        ) : (
                            <AiOutlineEye
                                className='absolute bottom-3 right-2 z-1 cursor-pointer'
                                size={20}
                                onClick={() => setShow(false)}
                            />
                        )
                    }
                    {
                        errors.password && touched.password && (
                            <span className="text-red-500 pt-2 block">{errors.password}</span>
                        )
                    }
                </div>
                <div className="w-full mt-5">
                    <input
                        type="submit"
                        value="Login"
                        className={`${styles.button}`}
                    />
                </div>
                <br />
                <h5 className='text-center pt-4 font-Poooins text-[14px] text-black dark:text-white'>
                    Or Join With
                </h5>
                <div className="flex items-center justify-center my-3">
                    <FcGoogle
                        size={30}
                        className='cursor-pointer mr-2'
                        onClick={() => signIn("google")}
                    />
                    <AiFillGithub
                        size={30}
                        className='cursor-pointer mr-2'
                        onClick={() => signIn("github")}
                    />
                </div>
                <h5 className="text-center pt-4 fontPoppins text-[14px">
                    Don't have any account?{" "}
                    <span className="text-[#2190ff] pl-1 cursor-pointer"
                        onClick={() => props.setRoute("Sign-Up")}
                    >
                        Sigin up
                    </span>
                </h5>
            </form>
            <br />
        </div>
    )
}

export default Login