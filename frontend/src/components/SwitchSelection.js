import React from "react";

export default function SwitchSelection({selected, onChange}) {

  return (
    <button
    onClick={()=> {onChange(!selected)}}
      type="button"
      className={` relative inline-flex flex-shrink-0 h-6 w-11 border-4 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-0 ${selected? "bg-primary": "bg-[#A9B5C1]"}`}
      role="switch"
      aria-checked="false"
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={` pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${selected? "translate-x-5": "-translate-x-0"}`}
      ></span>
    </button>
  );
}
