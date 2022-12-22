import React, {useState, useEffect} from "react";
import Logo from "../assets/images/launcher_icon.png"
import { Outlet, Link } from "react-router-dom";


import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    IconButton,
  } from "@material-tailwind/react";



const Header = () => {
    const [openNav, setOpenNav]= useState(false)


    //the menu items 

    const MenuItems = () => {
        return (
            <>
                    <Link to="/" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">VSL</Link>
               
                <Link to="/page" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">Pages</Link>
             
            </>
                


               
        );
    }
    return (
        <>
    
           <nav className="flex items-center justify-between flex-wrap bg-slate-900 drop-shadow clear-left p-3">
                <div className="flex items-center flex-shrink-0 text-white mr-6">
                <img src={Logo} className="w-12" alt="brand" />
                    
                </div>
                <div className="block lg:hidden">
                    <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                    </button>
                </div>
                <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                    <div className="text-sm lg:flex-grow">
                        <MenuItems />
                    </div>
                
                </div>
            </nav>
          
            
           
     
      <Outlet />
    

             
    
           

      
          
        </>
    );
}

export default Header