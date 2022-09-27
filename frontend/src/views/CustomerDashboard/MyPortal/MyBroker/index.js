import React, { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import PhoneIcon from "../../../../assets/svg/icon_phone.svg";
import EmailIcon from "../../../../assets/svg/icon_email.svg";
import MarkerIcon from "../../../../assets/svg/icon_menu_marker_hover.svg";
import DocumentIcon from "../../../../assets/svg/icon_menu_document_hover.svg";
import BriefcaseIcon from "../../../../assets/svg/icon_menu_briefcase_hover.svg";

export default function MyBroker() {
  const [broker, setBroker] = useState({
    fullName: "Oscar Thomsen",
    brokerageName: "Homelife Mortgage",
    email: "oscar.thomsen@gmail.com",
    phone: "+1 (123) 456 - 7890",
    location: "Calgary, Alberta, Canada",
    brokerLicense: "023117 - 431",
    brokerageLicense: "134711 - 320",
  });

  return (
    <div className="grid grid-cols-12 px-6 mt-4 gap-6">
      <div className="col-span-12 md:col-span-4">
        <div className="flex flex-col items-center border h-full border-porcelain rounded-2xl px-4 py-12">
          <img
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
            className={` h-16 w-16 text-xl rounded-full`}
          ></img>
          <div className="text-mineShaft text-xl font-semibold mt-4">
            {broker?.fullName}
          </div>
          <div className="text-regentGray text-[15px] mt-1">
            {broker?.location}
          </div>
          <div className="mt-6 flex">
            <div className="flex flex-col">
              <div className="flex items-center justify-center rounded-full bg-primary">
                <PhoneIcon fill="#FFFFFF"></PhoneIcon>
              </div>
              <div className="mt-2 text-primary text-center text-[13px]">
                Call
              </div>
            </div>
            <div className="flex flex-col ml-6">
              <div className="flex items-center justify-center rounded-full bg-white border border-porcelain">
                <EmailIcon fill="#0C3CFD"></EmailIcon>
              </div>
              <div className="mt-2 text-primary text-center text-[13px]">
                Email
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-12 md:col-span-8">
        <div className="lg:flex flex-col border border-porcelain rounded-2xl px-4 py-12">
          <div className="flex items-center">
            <EmailIcon fill="#0C3CFD"></EmailIcon>
            <div className="flex flex-col py-3 ml-3 text-[13px]">
              <div className="text-regentGray">Email address</div>
              <div className="text-mineShaft font-semibold">{broker?.email}</div>
            </div>
          </div>
          <div className="flex items-center">
            <PhoneIcon fill="#0C3CFD"></PhoneIcon>
            <div className="flex flex-col py-3 ml-3 text-[13px]">
              <div className="text-regentGray">Phone number</div>
              <div className="text-mineShaft font-semibold">{broker?.phone}</div>
            </div>
          </div>
          <div className="flex items-center">
            <MarkerIcon fill="#0C3CFD"></MarkerIcon>
            <div className="flex flex-col py-3 ml-3 text-[13px]">
              <div className="text-regentGray">Location</div>
              <div className="text-mineShaft font-semibold">{broker?.location}</div>
            </div>
          </div>
          <div className="flex items-center">
            <DocumentIcon fill="#0C3CFD"></DocumentIcon>
            <div className="flex flex-col py-3 ml-3 text-[13px]">
              <div className="text-regentGray">Broker's license number</div>
              <div className="text-mineShaft font-semibold">{broker?.brokerLicense}</div>
            </div>
          </div>
          <div className="flex items-center">
            <BriefcaseIcon fill="#0C3CFD"></BriefcaseIcon>
            <div className="flex flex-col py-3 ml-3 text-[13px]">
              <div className="text-regentGray">Brokerage license number</div>
              <div className="text-mineShaft font-semibold">
                {broker?.brokerageLicense}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
