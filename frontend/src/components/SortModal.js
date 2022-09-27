import React, { useState } from "react";
import CollapseIcon from ".././assets/svg/icon_collapse.svg";
import ExpandIcon from ".././assets/svg/icon_expand.svg";

export default function SortModal({ setSort, sort, applySort, isMobile }) {
  const [collpasedSort, setCollapsedSort] = useState(false);

  return (
    <div className={`flex flex-col rounded-2xl lg:w-auto w-full  border border-porcelain px-6 pt-4 pb-0 bg-white ${!isMobile &&"absolute -top-4"} `}>
      <div className="flex items-center">
        <div className="grow text-mineShaft tracking-widest font-semibold text-xs">
          SORT BY
        </div>
        <div onClick={() => setCollapsedSort(!collpasedSort)}>
          {collpasedSort ? (
            <ExpandIcon fill="#8595A3"></ExpandIcon>
          ) : (
            <CollapseIcon fill="#8595A3"></CollapseIcon>
          )}{" "}
        </div>
      </div>
      <div className="relative">
        <ul
          className={`flex flex-col w-full py-3 bg-whiteLilac rounded-xl px-4 transition-all duration-100 ease-linear origin-top ${
            collpasedSort ? "scale-y-0 absolute" : ""
          }`}
        >
          <li
            className="py-3 text-sm font-semibold flex"
            onClick={() => setSort("last-interacted")}
          >
            <div
              className={`h-5 w-5 rounded-full ${
                sort == "last-interacted"
                  ? "border-[6px] border-primary bg-white"
                  : "bg-mischka"
              }`}
            ></div>
            <div className="ml-3">Last interacted with</div>{" "}
          </li>
          <li
            className="py-3 text-sm font-semibold flex"
            onClick={() => setSort("recently-added")}
          >
            <div
              className={`h-5 w-5 rounded-full ${
                sort == "recently-added"
                  ? "border-[6px] border-primary bg-white"
                  : "bg-mischka"
              }`}
            ></div>
            <div className="ml-3">Most recently added</div>{" "}
          </li>
          <li
            className="py-3 text-sm font-semibold flex"
            onClick={() => setSort("alphabetical")}
          >
            <div
              className={`h-5 w-5 rounded-full ${
                sort == "alphabetical"
                  ? "border-[6px] border-primary bg-white"
                  : "bg-mischka"
              }`}
            ></div>
            <div className="ml-3">Alphabetical</div>{" "}
          </li>
        </ul>
      </div>

      <div className={`border-t border-porcelain justify-end py-6 flex ${!collpasedSort && 'mt-6'}`}>
        <button className="rounded-[24px] py-[14px] px-8 text-[13px] border border-porcelain text-mischka">
          Reset
        </button>
        <button
          className="rounded-[24px] py-[14px] px-8 text-[13px] ml-3 bg-primary text-white"
          onClick={applySort}
        >
          Apply
        </button>
      </div>
    </div>
  );
}
