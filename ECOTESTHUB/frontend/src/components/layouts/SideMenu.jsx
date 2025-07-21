import React,{useState} from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
// import { UserContext } from "../../context/UserContext";
import {useNavigate} from "react-router-dom";

function SideMenu({activeMenu}){
    // const {user, clearUser} = useContext(UserContext);
    const [ user, setUser] = useState(null);

    const navigate = useNavigate();

    const handleClick = (route) => {
        if (route === "logout"){
            handelLogout();
            return;
        }

        navigate(route);
    };

    const clearUser = () => {
        setUser(null);
    };


    const handelLogout = () => {
        localStorage.clear();
        clearUser();
        navigate("/login");
    };
    return(
        <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20 ">

            { SIDE_MENU_DATA.map ((item, index) => (
                <button
                   key={`menu_${index}`}
                   className={`w-full flex items-center gap-4 text-[15px] ${
                     activeMenu == item.label ? "text-white bg-primary" : ""
                   } py-3 px-6 rounded-lg mb-3`}
                   onClick={() => handleClick(item.path)}
                >
                   {item.label}
                </button>
            ))}
        </div>
    )
}

export default SideMenu;