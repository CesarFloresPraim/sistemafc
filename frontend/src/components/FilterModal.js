import React, { useState } from "react";
import CollapseIcon from ".././assets/svg/icon_collapse.svg";
import ExpandIcon from ".././assets/svg/icon_expand.svg";
import CheckboxField from "../components/CheckboxField";

export default function FilterModak({
  setFilterProvince,
  filterProvince,
  filterPreference,
  setFilterPreference,
  applyFilter,
  isMobile
}) {
  const [collapsedProvince, setCollapsedProvince] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [anyPreference, setAnyPreference] = useState(false);
  const [purchasePreference, setPurchasePreference] = useState(false);
  const [refinancePreference, setRefinancePreference] = useState(false);
  const [equityPreference, setEquityPreference] = useState(false);
  const [province, setProvince] = useState(false);

  return (
    <div className={`flex flex-col rounded-2xl lg:w-auto w-full  border border-porcelain px-6 pt-4 pb-0 bg-white ${!isMobile &&"absolute -top-4"} `}>
      <div className="flex items-center">
        <div className="grow text-mineShaft tracking-widest font-semibold text-xs">
          PROVINCE
        </div>
        <div onClick={() => setCollapsedProvince(!collapsedProvince)}>
          {collapsedProvince ? (
            <ExpandIcon fill="#8595A3"></ExpandIcon>
          ) : (
            <CollapseIcon fill="#8595A3"></CollapseIcon>
          )}{" "}
        </div>
      </div>
      <div className="relative">
        <select
          className={`flex flex-col w-full py-3 bg-whiteLilac rounded-3xl px-4 transition-all duration-100 ease-linear origin-top focus:ring-0 border-none ${
            collapsedProvince ? "scale-y-0 absolute" : ""
          }`}
        >
          <option value="Ontario">Ontario</option>
          <option value="Quebec">Quebec</option>
          <option value="Alberta">Alberta</option>
        </select>
      </div>
      <div className="flex items-center">
        <div className="grow text-mineShaft tracking-widest font-semibold text-xs">
          LEAD GOAL
        </div>
        <div onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? (
            <ExpandIcon fill="#8595A3"></ExpandIcon>
          ) : (
            <CollapseIcon fill="#8595A3"></CollapseIcon>
          )}{" "}
        </div>
      </div>
      <div className="relative">
        <ul
          className={`flex flex-col w-full py-3 bg-whiteLilac rounded-xl px-4 transition-all duration-100 ease-linear origin-top ${
            collapsed ? "scale-y-0 absolute" : ""
          }`}
        >
          <li className="py-2 text-sm font-semibold flex">
            <CheckboxField
              label="Any"
              name="filterAny"
              value={anyPreference}
              onChange={() => setAnyPreference(!anyPreference)}
            ></CheckboxField>
          </li>
          <li className="py-2 text-sm font-semibold flex">
            <CheckboxField
              label="Purchase"
              name="filterPurchase"
              value={purchasePreference}
              onChange={() => setPurchasePreference(!purchasePreference)}
            ></CheckboxField>
          </li>
          <li className="py-2 text-sm font-semibold flex">
            <CheckboxField
              label="Refinance"
              name="filterRefinance"
              value={refinancePreference}
              onChange={() => setRefinancePreference(!refinancePreference)}
            ></CheckboxField>
          </li>
          <li className="py-2 text-sm font-semibold flex">
            <CheckboxField
              label="Equity loan"
              name="filterEquity"
              value={equityPreference}
              onChange={() => setEquityPreference(!equityPreference)}
            ></CheckboxField>
          </li>
        </ul>
      </div>

      <div
        className={`border-t border-porcelain justify-end py-6 flex ${
          !collapsed && "mt-6"
        }`}
      >
        <button className="rounded-[24px] py-[14px] px-8 text-[13px] border border-porcelain text-mischka">
          Reset
        </button>
        <button
          className="rounded-[24px] py-[14px] px-8 text-[13px] ml-3 bg-primary text-white"
          onClick={applyFilter}
        >
          Apply
        </button>
      </div>
    </div>
  );
}
