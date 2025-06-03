import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { BiSearch } from "react-icons/bi";

type Props = {};

const Hero: FC<Props> = (props) => {
    return (
        <div className="w-ful 1000px:flex items-center">
            <div className="top-[100px] 1000px:top-[unset] 1500px:h-[700px] 1500px:w-[700px] 1100px:h-[600px] 1100px:w-[600px] h-[50vh] w-[500vh] herro_animation relative 1000px:!h-[100vh] 1000px:!w-[100vw]">
                <div className="1000px:w-[90%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-[0] z-10">
                    <Image src={require("../../../public/assets/banner.png")} alt="" className="Object-contain 1100px:max-w-[70%] w-[70%] 1500px:max-w-[85%] h-[auto] z-[10]" />
                </div>
            </div>
            <div className="1000px:w-[60%] flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left mt-[150px]">
                <h2 className="dark:text-white text-[#000000c7] text-[30px] px-3 w-full 1000px:text-[70px] font-[600] font-josefin py-2 1000px:leading-[75px] 1500px:w-[60%] 1100px:w-[80%]">
                    Improve Your online Learning Experience Better Instantly
                </h2>
                <br />
                <p className="dark:text-[#edfff4] text-[#000000ac font-josefin font-[600] text-[18px] 1500px:!w-[55%] 1100px:!w-[78%]">
                    We have 40K+ Online Courses & 500k+ Online Registered student. Find your desired Course from them.
                </p>
                <br />
                <br />
                <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] h-[50px] bg-transparent relative">
                    <input type="search"
                        placeholder="search Courses..."
                        className="bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 w-full outline-none text[#0000004e] dark:text-[#ffffffeb] text-[20px] font-[500] font-josefin" />
                    <div className="absolute flex items-center justify-center w-[-50px] cursor-pointer h-[47px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px] pl-1.5">
                        <BiSearch className="text-white" size={30}></BiSearch>
                    </div>
                </div>
                <br />
                <br />
                <div className="1500px:w-[55%] 1100px:w[78%] w-[90%] flex items-center">
                    <img src="https://edmy-react.hibootstrap.com/images/banner/client-3.jpg" alt="" className="rounded-full " />
                    <img src="https://edmy-react.hibootstrap.com/images/banner/client-1.jpg" alt="" className="rounded-full ml-[-20px]" />
                    <img src="https://edmy-react.hibootstrap.com/images/banner/client-2.jpg" alt="" className="rounded-full ml-[-20px]" />
                    <p className="font-Josefin dark:text-[#edfff4] text-[#000000b3] 1000px:pl-3 text-[18px] font-[600]">
                        500K+ People already trusted us.{" "}
                        <Link
                            href="/courses"
                            className="dark:text-[#46e256] text-[crimson]">
                            View Course
                        </Link>{" "}
                    </p>
                </div>
                <br />
            </div>
        </div>
    );
};

export default Hero;