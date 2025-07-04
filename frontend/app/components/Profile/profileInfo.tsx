'use client'
import React, { FC, useEffect, useState } from 'react';
import Image from "next/image";
import { styles } from "../../../app/styles/style";
import { AiOutlineCamera } from "react-icons/ai";
import avatarIcon from "../../../public/avatar.png";
import { useUpdateAvatarMutation } from "@/redux/user/userApi";
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';

type Props = {
    avatar: string | null;
    user: any;
};

const profileInfo: FC<Props> = ({ avatar, user }) => {

    const [name, setName] = useState(user && user.name);
    const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
    const [loadUser, setLoadUser] = useState(false);
    const {data} = useLoadUserQuery(undefined, { skip: loadUser ? false : true });
    
    // Handles image loaded to the device
    const imageHandler = async (e: any) => {
        // read's file to memory
        const filereader = new FileReader();
        
        filereader.onload = () => {
            if (filereader.readyState === 2) {
                const avatar = filereader.result;
                updateAvatar(avatar);
            }
        };
        filereader.readAsDataURL(e.target.files[0]);
    };

    useEffect(() => {
        if (isSuccess) {
            setLoadUser(true)
        }
        if (error) {
            console.log(error);
        }
    }, [isSuccess, error]);

    const handleSubmit = async (e: any) => {
        console.log("submit");
    };

    return (
        <>
            <div>
                <div className="w-full flex justify-center">
                    <div className="relative">
                        <Image
                            src={user.avatar || avatar ? user.avatar.url || avatar : avatarIcon}
                            alt=""
                            width={120}
                            height={120}
                            className='w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full'
                        />
                        <input
                            type="file"
                            name=""
                            id="avatar"
                            className='hidden'
                            onChange={imageHandler}
                            accept="image/png, image/jpg, image/jpeg, image/webp"
                        />
                        <label htmlFor="avatar">
                            <div className="w-[30px] h-[30px] bg-slate-900 rounded-full bottom-2 right-2 flex items-center justify-center cursor-pointer">
                                <AiOutlineCamera size={20} className="z-1" />
                            </div>
                        </label>
                    </div>
                </div>
                <br />
                <br />
                <div className="w-full pl-6 800px:pl-10">
                    <form onSubmit={handleSubmit}>
                        <div className='800px:w-[70%] m-auto block pb-4'>
                            <div className="w-[100%]">
                                <label className='block pb-2' htmlFor="">Full Name</label>
                                <input
                                    type="text"
                                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="w-[100%] pt-2">
                                <label htmlFor="" className="block pb-2">Email Address</label>
                                <input
                                    type="text"
                                    readOnly
                                    className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                                    required
                                    value={user?.email}
                                />
                            </div>
                            <input
                                type="submit"
                                className={`w-full 800px:w-[250px] h-[40px] border border-[#37a39a] text-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer`}
                                required
                                value="Update"
                            />
                        </div>
                    </form>
                    <br />
                </div>
            </div>
        </>

    )
}

export default profileInfo