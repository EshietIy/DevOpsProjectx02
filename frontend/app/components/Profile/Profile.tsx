'use client'
import React, {FC} from 'react';
import SideBarProfile from './SideBarProfile';
import {useLogOutQuery} from '../../../redux/features/auth/authApi';
import { signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';
import ProfileInfo from './profileInfo';


type Props = {
  user: any;
}

const Profile:FC<Props>= ({user}) => {
  // const [scroll, setScroll] = React.useState(false);
  const [scroll, setScroll] = React.useState(false);
  const [avatar, setAvatar] = React.useState(null);
  const [active, setActive] = React.useState(1);
  const [logout, setLogout] = React.useState(false);
  const {} = useLogOutQuery(undefined, {
  skip: !logout ? true : false,
  });

  const logOutHandler = async () => {
    // Handle logout logic here
    signOut();
    await setLogout(true);   
  };
  
  // Check if window is defined to avoid SSR issues
    // Add scroll event listener to update state
    // This will only run on the client side
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }

  return (
    <div className='w-[85%] flex mx-auto'>
        <div className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900 border bg-white dark:border-[#ffffff1d] border-[#00000014] rounded-[5px] shadow-sm dark:shadow-sm  mt-[80px] sticky ${scroll? "top-[120px]" : "top-[30px]"} left-[30px]`}>
          <SideBarProfile 
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
          logoutHandler={logOutHandler}

          />
          </div>
          {
            
            active === 1 && (
              <div className="w-full h-full bg-transparent mt-[80px]">
              <ProfileInfo user={user} avatar={avatar}/>
              </div>
            )
          }
    </div>
  )
}

export default Profile