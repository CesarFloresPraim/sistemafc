import React from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import IconCollapse from "../../assets/svg/icon_collapse.svg";
import IconExpand from "../../assets/svg/icon_expand.svg";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Contact made", "Portal complete", "Approved", "Signed", "Funded"],
  datasets: [
    {
      label: "",
      data: [75, 25],
      backgroundColor: ["#00C48B", "#8595A3"],
      borderWidth: 3,
      hoverBorderWidth: 0,
      //hoverBorderColor: "#F6F8FC",
      //borderColor: "#F6F8FC",
      cutout: "40%",
    },
  ],
};

const options = {
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  resposive: false,
};

export default function ProfileProgress({
  collapsed,
  setCollapsed,
  isMobile = false,
}) {
  return (
    <>
      {isMobile == false ? (
        <div className="relative">
          <button className=" flex rounded-[32px] w-fit border border-porcelain h-12 items-center px-4">
            <div className="h-7 w-7 mr-3">
              {" "}
              <Doughnut data={data} options={options} />
            </div>
            <div className="text-mineShaft mr-3 text-xl font-semibold">
              75 <span className="text-paleSky text-base">%</span>
            </div>
            <div className="flex flex-col mr-5 text-mineShaft text-[11px] tracking-widest font-semibold">
              <div>PROFILE</div>
              <div>COMPLETION</div>
            </div>
            <div onClick={() => setCollapsed(!collapsed)}>
              {collapsed ? (
                <IconCollapse fill="#0C3CFD"></IconCollapse>
              ) : (
                <IconExpand fill="#8595A3"></IconExpand>
              )}
            </div>
          </button>
        </div>
      ) : (
        <div className="relative">
          <div className="h-7 w-7 mr-3">
            {" "}
            <Doughnut data={data} options={options} />
          </div>
        </div>
      )}
    </>
  );
}
