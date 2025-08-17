'use client'
import React, {FC, use, useState} from 'react';
import Heading from './utils/Heading';
import Header from './components/header';
import Hero from './components/Route/hero';


interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");
  return (
    <div>
      <Heading title="Eshiet LMS" description="Eshiet LMS Build site" keywords="Page" />
      <Header open={open} setOpen={setOpen} activeItem={activeItem} setRoute={setRoute} route={route}></Header>
      <Hero/>
    </div>
  ); 
};
export default Page;