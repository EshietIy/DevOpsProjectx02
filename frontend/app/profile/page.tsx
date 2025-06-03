'use client'
import React, {FC} from 'react';
import Protect from "../hooks/useProtected";
import Heading from "../utils/Heading";
import Header from "../components/header";
import { useState } from 'react';
import Profile from "../components/Profile/Profile";
import {useSelector} from "react-redux";


type Props = {}

const page:FC<Props> = (props: Props) => {
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(0);
    const [route, setRoute] = useState("Login");
    const {user} = useSelector((state:any) => state.auth);
  return (
    <div>
        <Protect>
            
            <Heading title={`${user.name}-profile`} description="Eshiet LMS Build site" keywords="Page" />
            <Header open={open} setOpen={setOpen} activeItem={activeItem} setRoute={setRoute} route={route}></Header>
            <Profile user={user}>

            </Profile>
        </Protect>
    </div>
  )
}

export default page;