'use client'
import React, { FC, use, useState, useEffect } from 'react';
import Link from 'next/link';
import NavItems from "../utils/NavItem";
import { ThemeSwitcher } from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi"
import CustomModal from "../utils/cutomModal";
import Login from "../components/Auth/login";
import SignUp from "../components/Auth/SignUp";
import Verification from '../components/Auth/Verification';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import avatar from '../../public/avatar.png'; // Default avatar image
import { useSession } from 'next-auth/react';
import { useSocialAuthMutation } from '@/redux/features/auth/authApi';
import toast from 'react-hot-toast';
import {useLogOutQuery} from '../../redux/features/auth/authApi'


type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    activeItem: number;
    route: string;
    setRoute: (route: string) => void;
}

const Header: FC<Props> = ({ activeItem, setOpen, route, open, setRoute }) => {
    const [active, setActive] = useState(false);
    const [openSidebar, setOpenSidebar] = useState(false);
    const { user } = useSelector((state: any) => state.auth);
    const { data } = useSession();
    const [logout, setLogout] = React.useState(false);
      const {} = useLogOutQuery(undefined, {
      skip: !logout ? true : false,
      });
  
    // If you want to use the session data for social auth, you can pass it here
    const [socialAuth,{isSuccess, error}] = useSocialAuthMutation();
    
    useEffect(() => {
        if(!user){
            if(data){
                socialAuth({email: data?.user?.email, name: data?.user?.name, avatar: data?.user?.image});
            }
        }
    
        if (data === null) {
            if (isSuccess) {
            toast.success("Login successful!");
            }
        }
    }, [data, user]);


    if (typeof window !== "undefined") {
        window.addEventListener("scorll", () => {
            if (window.scrollY > 80) {
                setActive(true);
            } else {
                setActive(false);
            }
        });
    }
    const handleClose = (e: any) => {
        if (e.target.id === "screen") {
            {
                setOpenSidebar(false);
            }
        }
    }

    return (
        <div className='w-full relative'>
            <div className={`${active ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500" : "w-full border-b dark:border-[#ffffffic] h-[80px] z-[80] dark:shadow"}`}>
                <div className="W-[95%] 800px:w-[92%] m-auto py-2 h-full">
                    <div className="w-full h-[80px] flex items-center justify-between p-3">
                        <div>
                            <Link href={"/"} className={`text[-25px] font-Poppins font-[500] text-black dark:text-white`}>
                                E-learning
                            </Link>
                        </div>
                        <div className="flex items-center">
                            <NavItems
                                activeItem={activeItem}
                                isMobile={false} />
                            <ThemeSwitcher />
                            {/* only for mobile */}
                            <div className='800px:hidden'>
                                <HiOutlineMenuAlt3
                                    size={25}
                                    className="cursor-pointer dark:text-white text-black"
                                    onClick={() => setOpenSidebar(true)}
                                />
                            </div>
                            {
                                user ? (
                                    <Link href={"/profile"} className="hidden 800px:block">
                                        <Image
                                            src={user.avatar ? user.avatar : avatar}
                                            alt="user profile"
                                            className="w-[40px] h-[40px] rounded-full cursor-pointer ml-3"
                                        />
                                    </Link>
                                ) : (
                                    <HiOutlineUserCircle
                                        size={25}
                                        className=" hidden 800px:block cursor-pointer dark:text-white text-black"
                                        onClick={() => setOpen(true)}
                                    />
                                )
                            }
                        </div>
                    </div>
                </div>
                {/* mobile sidebar */}
                {
                    openSidebar && (
                        <div className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]"
                            onClick={handleClose}
                            id="screen">
                            <div className="w-[70%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0">
                                <NavItems activeItem={activeItem} isMobile={true} />
                                <HiOutlineUserCircle
                                    size={25}
                                    className="cursor-pointer ml-5 my-2 text-black dark:text-white"
                                    onClick={() => setOpen(true)}
                                />

                                <br />
                                <br />
                                <p className='text-[16px] px-2 pl-5 text-black dark:text-white'>
                                    copyright c 2023 Elearning
                                </p>
                            </div>
                        </div>
                    )}
            </div>
            {/* login component */}
            {
                route === "Login" && (
                    <> {
                        open && (
                            <CustomModal
                                open={open}
                                setOpen={setOpen}
                                setRoute={setRoute}
                                activeItem={activeItem}
                                component={Login}
                            />
                        )
                    }
                    </>
                )
            }
            {/* sig-up component */}
            {
                route === "Sign-Up" && (
                    <> {
                        open && (
                            <CustomModal
                                open={open}
                                setOpen={setOpen}
                                setRoute={setRoute}
                                activeItem={activeItem}
                                component={SignUp}
                            />
                        )
                    }
                    </>
                )
            }
            {/* Verification modal */}
            {
                route === "Verification" && (
                    <> {
                        open && (
                            <CustomModal
                                open={open}
                                setOpen={setOpen}
                                setRoute={setRoute}
                                activeItem={activeItem}
                                component={Verification}
                            />
                        )
                    }
                    </>
                )
            }
        </div>
    )
}

export default Header;