import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/admin_assets/assets";

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r-1">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        {/* Add Items */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 border border-gray-300 px-3 py-2 rounded transition-colors ${
              isActive ? "bg-pink-200" : "hover:bg-gray-100"
            }`
          }
        >
          <img className="w-5 h-5" src={assets.add_icon} alt="Add" />
          <p className="hidden md:block">Add items</p>
        </NavLink>

        {/* List Items */}
        <NavLink
          to="/list"
          className={({ isActive }) =>
            `flex items-center gap-3 border border-gray-300 px-3 py-2 rounded transition-colors ${
              isActive ? "bg-pink-200" : "hover:bg-gray-100"
            }`
          }
        >
          <img className="w-5 h-5" src={assets.order_icon} alt="List" />
          <p className="hidden md:block">List items</p>
        </NavLink>

        {/* Orders */}
        <NavLink
          to="/orders"
          className={({isActive}) =>
            `flex items-center gap-3 border border-gray-300 px-3 py-2 rounded transition-colors ${
              isActive ? "bg-pink-200" : "hover:bg-gray-100"
            }`
          }
        >
          <img className="w-5 h-5" src={assets.order_icon} alt="Orders" />
          <p className="hidden md:block">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;


// 7:44