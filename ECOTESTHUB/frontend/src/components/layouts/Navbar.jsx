import React, {useState} from "react";
import SideMenu from "./SideMenu";

function Navbar({activeMenu}) {
    const [openSideMenu, setOpenSideMenu] = useState(false);

    return (
        <div className="flex gap-5 bg-blue-700 w-full border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
            <button
              className="block lg:hidden text-black"
              onClick={()=> {
                setOpenSideMenu(!openSideMenu);
              }}
            >
                {openSideMenu ? (
                    <p className="text-2xl">&times;</p>
                ) : (
                    <p className="text-2xl">&#9776;</p>
                )}
            </button>

            <h2 className="text-2xl font-bold text-center">ECOTESTHUB</h2>

            {openSideMenu && (
                <div className="fixed top-[61px] -ml-4 bg-white">
                    <SideMenu activeMenu={activeMenu} />
                </div>
            )}
        </div>
    )
}

export default Navbar; 