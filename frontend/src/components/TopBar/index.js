import React, { Children, useState } from "react";
import { NavLink } from "react-router-dom";
import CheckIcon from "../../assets/svg/icon_check.svg";
import RightIcon from "../../assets/svg/icon_right.svg";

export default function Topbar({ title, breadcrums, children }) {
  const [activeRoute, setActiveRoute] = useState("broker-home");

  return (
    <div className="flex items-center">
      <div className="text-regentGray text-sm grow">
        <ul className="flex items-center">
          {breadcrums &&
            breadcrums.length > 0 &&
            breadcrums.map((item, idx, arr) => {
              if (arr.length - 1 === idx) {
                return (
                  <div className="flex items-center" key={idx}>
                    <NavLink
                      to={item.path}
                      className=""
                      onClick={() => setActiveRoute(item.path)}
                    >
                      {item.name}
                    </NavLink>
                  </div>
                );
              }
              return (
                <div className="flex items-center" key={idx}>
                  <NavLink
                    to={item.path}
                    className=""
                    onClick={() => setActiveRoute(item.path)}
                  >
                    {item.name}
                  </NavLink>
                  <RightIcon fill="#C2CAD9"></RightIcon>
                </div>
              );
            })}
        </ul>
        <div className="text-mineShaft text-[28px] font-bold">{title}</div>
      </div>
      {children}
    </div>
  );
}
