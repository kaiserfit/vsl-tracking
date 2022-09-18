import React from "react";
import Logo from "../assets/images/launcher_icon.png"
const Header = () => {
    return (
        <>
            <div className="w-screen h-auto pl-5 py-4 bg-slate-900 drop-shadow clear-left">
            <img src={Logo} className="w-12 float-left" alt="brand" /><h1 className="text-4xl ml-8 text-white ">VSL Stats</h1>
            </div>

            {/* <div className="w-[100px] h-auto bg-black mt-6 rounded-xl fixed left-3 p-4">
                <h1 className="text-2xl text-white my-3">test</h1>
            </div> */}
          
        </>
    );
}

export default Header