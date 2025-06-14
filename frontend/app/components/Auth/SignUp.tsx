"use client";
import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    AiOutlineEye,
    AiOutlineEyeInvisible,
    AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { styles } from "../../../app/styles/style";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";

type Props = {
    setRoute: (route: string) => void;
};

const schema = Yup.object().shape({
    name: Yup.string().required("Please Enter your Name"),
    email: Yup.string()
        .email("Invalid email!")
        .required("Please enter your email!"),
    password: Yup.string().required("Please enter your password!").min(6),
    confrimPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Password must match")
        .required("Confirm Password is required"),
});

const SignUp: FC<Props> = (props: Props) => {
    const [show, setShow] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [register, {data, error, isSuccess }] = useRegisterMutation();

    useEffect(() => {
        if (isSuccess) {
            const message = data?.message || "Registration successful!";
            toast.success(message);
            props.setRoute("Verification");
        }
        if (error) {
            if ("data" in error) {
                const errorData = error as any;
                toast.error(errorData.data.message);
            }
        }
    }, [isSuccess, error]);

    const formik = useFormik({
        initialValues: { name: "", email: "", password: "", confrimPassword: "" },
        validationSchema: schema,
        onSubmit: async ({ name, email, password }) => {
            const data = { name, email, password };
            await register(data);
        },
    });
    const { errors, touched, values, handleChange, handleSubmit } = formik;
    return (
        <div className="w-full">
            <h1 className={`${styles.title}`}>Join E-learning</h1>
            <form onSubmit={handleSubmit} action="">
                <div className="mb-3">
                    <label htmlFor="name" className={`${styles.label}`}>
                        Enter your Name
                    </label>
                    <input
                        type="name"
                        name=""
                        value={values.name}
                        onChange={handleChange}
                        id="name"
                        placeholder="Eshiet"
                        className={`${errors.name && touched.name && "border-red-500"} ${styles.input
                            }`}
                    />

                    {errors.name && touched.name && (
                        <span className="text-red-500 pt-2 block">{errors.name}</span>
                    )}
                </div>
                <label htmlFor="email" className={`${styles.label}`}>
                    Enter your Email
                </label>
                <input
                    type="email"
                    name=""
                    value={values.email}
                    onChange={handleChange}
                    id="email"
                    placeholder="loginmail@gmail.co"
                    className={`${errors.email && touched.email && "border-red-500"} ${styles.input
                        }`}
                />

                {errors.email && touched.email && (
                    <span className="text-red-500 pt-2 block">{errors.email}</span>
                )}
                <div className="w-full mt-5 relative mb-1">
                    <label htmlFor="password" className={`${styles.label}`}>
                        Enter your Password
                    </label>
                    <input
                        type={!show ? "password" : "text"}
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        id="password"
                        placeholder="password!@#"
                        className={`${errors.password && touched.password && "border-red-500"
                            } ${styles.input}`}
                    />
                    {!show ? (
                        <AiOutlineEyeInvisible
                            className="absolute bottom-3 right-2 z-1 cursor-pointer"
                            size={20}
                            onClick={() => setShow(true)}
                        />
                    ) : (
                        <AiOutlineEye
                            className="absolute bottom-3 right-2 z-1 cursor-pointer"
                            size={20}
                            onClick={() => setShow(false)}
                        />
                    )}
                    {errors.password && touched.password && (
                        <span className="text-red-500 pt-2 block">{errors.password}</span>
                    )}
                    {/* confirm password  */}
                    <label htmlFor="confirmPassword" className={`  ${styles.label}`}>
                        Confirm Password
                    </label>
                    <input
                        type={!show ? "password" : "text"}
                        name="confrimPassword"
                        value={values.confrimPassword}
                        onChange={handleChange}
                        id="confirmPassword"
                        placeholder="password!@#"
                        className={`${errors.confrimPassword &&
                            touched.confrimPassword &&
                            "border-red-500"
                            } ${styles.input}`}
                    />
                    {!showConfirm ? (
                        <AiOutlineEyeInvisible
                            className="absolute bottom-3 right-2 z-1 cursor-pointer"
                            size={20}
                            onClick={() => setShowConfirm(true)}
                        />
                    ) : (
                        <AiOutlineEye
                            className="absolute bottom-3 right-2 z-1 cursor-pointer"
                            size={20}
                            onClick={() => setShowConfirm(false)}
                        />
                    )}
                    {errors.confrimPassword && touched.confrimPassword && (
                        <span className="text-red-500 pt-2 block">
                            {errors.confrimPassword}
                        </span>
                    )}
                </div>
                <div className="w-full mt-5">
                    <input type="submit" value="Sign Up" className={`${styles.button}`} />
                </div>
                <br />
                <h5 className="text-center pt-4 font-Poooins text-[14px] text-black dark:text-white">
                    Or Join With
                </h5>
                <div className="flex items-center justify-center my-3">
                    <FcGoogle size={30} className="cursor-pointer mr-2" />
                    <AiFillGithub size={30} className="cursor-pointer mr-2" />
                </div>
                <h5 className="text-center pt-4 fontPoppins text-[14px">
                    Already have and account?{" "}
                    <span
                        className="text-[#2190ff] pl-1 cursor-pointer"
                        onClick={() => props.setRoute("Login")}
                    >
                        Sigin in
                    </span>
                </h5>
            </form>
            <br />
        </div>
    );
};

export default SignUp;
