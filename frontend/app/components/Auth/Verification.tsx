import { styles } from "../../../app/styles/style";
import { StyledEngineProvider } from '@mui/material';
import { errorToJSON } from 'next/dist/server/render';
import React, {FC, useEffect, useState} from 'react';
import {toast} from 'react-hot-toast';
import {VscWorkspaceTrusted} from 'react-icons/vsc';
import { useSelector } from "react-redux";
import { useActivationMutation } from "@/redux/features/auth/authApi";
import { object } from "yup";

type Props = {
    setRoute: (route: string) => void;
}

type verifyNumber = {
    "0": string;
    "1": string;
    "2": string;
    "3": string;
}

const Verification:FC<Props> = ({setRoute}) => {
    const [invalidError, setInvalidError] = React.useState(false);
    const {token} = useSelector((state: any) => state.auth);
    const [activation, {isSuccess, error}] = useActivationMutation();
  
    useEffect(() => {
        // Check if the token is available
        if(isSuccess) {
            toast.success("Account verified successfully!");
            setRoute("Login");
        }
        if (error) {
            if ("data" in error) {
                const errorData = error as any;
                toast.error(errorData.data.message);
            } else {
                console.log("An unexpected error occurred:", error);
            }
        }
    }, [isSuccess, error]);
    const inputRefs = [
        React.useRef<HTMLInputElement>(null),
        React.useRef<HTMLInputElement>(null),
        React.useRef<HTMLInputElement>(null),
        React.useRef<HTMLInputElement>(null),
    ];

    const [verifyNumber, setVerifyNumber] = React.useState<verifyNumber>({
        "0": "",
        "1": "",
        "2": "",
        "3": "",
    });
    const verificationHandeler = async () =>
    {
        const verificationNumber = Object.values(verifyNumber).join("");
        if (verificationNumber.length !== 4) {
            setInvalidError(true);
            toast.error("Please enter a valid 4-digit verification code.");
            return;
        }
        await activation({
            activation_token: token,
            activation_code: verificationNumber,

        });
    }

    const handleInputChange = (index: number, value: string) => {
        setInvalidError(false);
        const newVerifyNumber = { ...verifyNumber, [index]: value };
        setVerifyNumber(newVerifyNumber);

        if (value === "" && index > 0){
            inputRefs[index - 1].current?.focus();
        } else if (value.length === 1 && index < 3){
            inputRefs[index + 1].current?.focus();
        }

    };

  return (
    <div>
        <h1 className={`${styles.title}`}>
          Verrify your account
        </h1>
        <br />
        <div className="w-full flex items-center justify-center mt-2">
            <div className='w-[80px] h-[80px] rounded-full bg-[#497df2] flex items-center justify-center'>
                <VscWorkspaceTrusted size={40} className='text-white' />

            </div>
        </div>
        <br />
        <br />
        {/* Verification Inputs */}
        <div className="1100px:w-[70%] m-auto flex items-center justify-around">
            {Object.keys(verifyNumber).map((key, index) => (
                <input
                    key={key}
                    type="number"
                    maxLength={1}
                    placeholder='#'
                    value={verifyNumber[key as keyof verifyNumber]}
                    ref={inputRefs[index]}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    className={`w-[65px] p-5 h-[65px] bg-transparent border-[2px] rounded-[10px] flex items-center text-black dark:text-white justify-center text-[18px] font-Poppins font-[500] border-[#497df2] focus:outline-none  ${invalidError ? "shake border-[#FF0000]" : "dark:border-white border-[#0000004a]"}`}
                />
            ))}
        </div>
        <br />
        <br />
        <div className="w-full flex justif-center">
            <button className={`${styles.button}`}
            onClick={verificationHandeler}            >

                Verify OTP
            </button>
        </div>
        <br />
        <h5 className="text-center pt-4 font-Poppins text-[14px] test-black dark:text-white">
            Go back to Sign in ? <span className="text-[#497df2] cursor-pointer" onClick={() => setRoute("Login")}>Sign in</span>

        </h5>
    </div>
  )
}

export default Verification;