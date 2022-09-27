import React, { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import FDFIcon from "../../../../assets/svg/icon_file_type_pdf.svg";
import EyeIcon from "../../../../assets/svg/icon_view.svg";
import DownloadIcon from "../../../../assets/svg/icon_download.svg";
import RightIcon from "../../../../assets/svg/icon_right.svg";

import { documentStatusColorizer } from "../../../../helpers/colorizer";

export default function MyApprovalsAndContracts() {
  const dispatch = useDispatch();

  const drop = useRef(null);
  const inputFileRef = useRef(null);


  const [picture, setPicture] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState(undefined);
  const [documents, setDocuments] = useState([
    {
      title: "Mortgage Commitment - House",
      name: "mortgage-commitment-17-03-2022.pdf",
      size: "5 mb",
      added: "Yesterday",
      addedBy: "Oscar Thomsen",
      status: "waiting",
    },
    {
      title: "Mortgage Commitment - Apartment",
      name: "commitment-23-05-2021.pdf",
      size: "5 mb",
      added: "Yesterday",
      addedBy: "Oscar Thomsen",
      status: "waiting",
    },
    {
      title: "Terms & Agreement",
      name: "terms-agreement-12-03-2022.pdf",
      size: "9 mb",
      added: "Feb, 27 2022",
      addedBy: "Oscar Thomsen",
      status: "denied",
    },
    {
      title: "Terms & Agreement",
      name: "terms-agreement-12-03-2022.pdf",
      size: "3 mb",
      added: "Yesterday",
      addedBy: "Oscar Thomsen",
      status: "under review",
    },
  ]);

  const getDocumentStatusColor = (percentage) => {
    return documentStatusColorizer(percentage);
  };

  const handleFile = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      let file = files[0];
      // check if file is on allowed format
      if (
        allowedFileExtensions &&
        file &&
        !allowedFileExtensions.some((format) =>
          file.name.toLowerCase().endsWith(format.toLowerCase())
        )
      ) {
        console.log(
          `Only following file formats are acceptable: ${allowedFileExtensions.join(
            ", "
          )}`
        );
        return;
      }
      setPicture(files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { files } = e.dataTransfer;

    if (files && files.length > 0) {
      let file = files[0];
      // check if file is on allowed format
      if (
        allowedFileExtensions &&
        file &&
        !allowedFileExtensions.some((format) =>
          file.name.toLowerCase().endsWith(format.toLowerCase())
        )
      ) {
        console.log(
          `Only following file formats are acceptable: ${allowedFileExtensions.join(
            ", "
          )}`
        );
        return;
      }
      setPicture(files[0]);
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setDragging(false);
  };

  const buttonDisabled = () => {
    return picture === undefined || picture === null;
  };

  useEffect(() => {
    if (drop.current) {
      drop.current.addEventListener("dragover", handleDragOver);
      drop.current.addEventListener("drop", handleDrop);
      drop.current.addEventListener("dragenter", handleDragEnter);
      drop.current.addEventListener("dragleave", handleDragLeave);
    }

    return () => {
      drop.current?.removeEventListener("dragover", handleDragOver);
      drop.current?.removeEventListener("drop", handleDrop);
      drop.current?.removeEventListener("dragenter", handleDragEnter);
      drop.current?.removeEventListener("dragleave", handleDragLeave);
    };
  }, [drop, handleDragOver, handleDrop, handleDragEnter, handleDragLeave]);

  useEffect(() => {
    if (!picture) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(picture);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [picture]);


  return (
    <div className="flex flex-col px-12 mt-4">
      {documents &&
        documents.length > 0 &&
        documents.map((item, idx) => {
          return (
            <>
              {/** Desktop */}
              <div className="hidden md:flex border border-porcelain rounded-2xl p-4 mt-4">
                <FDFIcon fill="#FD0C95"></FDFIcon>
                <div className="flex flex-col flex-1 ml-4">
                  <div className="flex">
                    <div className="flex flex-col">
                      <div className="text-mineShaft text-base font-semibold">
                        {item.title}
                      </div>
                      <div className="text-regentGray text-[13px]">
                        {item.name}
                      </div>
                    </div>
                    <div className="flex ml-auto items-center">
                      <EyeIcon fill="#8595A3"></EyeIcon>
                      <DownloadIcon fill="#8595A3"></DownloadIcon>
                    </div>
                  </div>
                  <div className="flex mt-4">
                    <div className="flex flex-col">
                      <div className="text-regentGray text-[13px]">Size</div>
                      <div className="text-mineShaft text-[13px] font-semibold">
                        {item.size}
                      </div>
                    </div>
                    <div className="flex flex-col ml-8">
                      <div className="text-regentGray text-[13px]">Added</div>
                      <div className="text-mineShaft text-[13px] font-semibold">
                        {item.added}
                      </div>
                    </div>
                    <div className="flex flex-col ml-8">
                      <div className="text-regentGray text-[13px]">
                        Added by
                      </div>
                      <div className="text-mineShaft text-[13px] font-semibold">
                        {item.addedBy}
                      </div>
                    </div>
                    <div className="ml-auto flex ">
                      <div
                        className={`text-[11px] tracking-widest ${getDocumentStatusColor(
                          item.status
                        )} w-auto my-3 px-4 py-1 rounded-3xl text-center`}
                      >
                        {item.status.toUpperCase()}
                      </div>
                      {item.status == "waiting" && (
                        <button className=" flex items-center rounded-3xl h-12 pl-4 ml-4 text-[13px] text-white bg-primary">
                          <div>Go to sign</div>
                          <RightIcon fill="#FFF"></RightIcon>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/** Mobile */}
              <div className="flex flex-col md:hidden border border-porcelain rounded-2xl p-4 mt-4">
                <div className="flex">
                  <FDFIcon fill="#FD0C95"></FDFIcon>
                  <div className="flex ml-auto items-center">
                    <EyeIcon fill="#8595A3"></EyeIcon>
                    <DownloadIcon fill="#8595A3"></DownloadIcon>
                  </div>
                </div>
                <div className="flex flex-col flex-1 mt-4">
                  <div className="flex">
                    <div className="flex flex-col">
                      <div className="text-mineShaft text-base font-semibold">
                        {item.title}
                      </div>
                      <div className="text-regentGray text-[13px]">
                        {item.name}
                      </div>
                    </div>
                  </div>
                  <div className="flex ">
                    <div
                      className={`text-[11px] tracking-widest ${getDocumentStatusColor(
                        item.status
                      )} w-auto my-3 px-4 py-1 rounded-3xl text-center`}
                    >
                      {item.status.toUpperCase()}
                    </div>
                  </div>
                  <div className="flex mt-4">
                    <div className="flex flex-col">
                      <div className="text-regentGray text-[13px]">Size</div>
                      <div className="text-mineShaft text-[13px] font-semibold">
                        {item.size}
                      </div>
                    </div>
                    <div className="flex flex-col ml-8">
                      <div className="text-regentGray text-[13px]">Added</div>
                      <div className="text-mineShaft text-[13px] font-semibold">
                        {item.added}
                      </div>
                    </div>
                    <div className="flex flex-col ml-8">
                      <div className="text-regentGray text-[13px]">
                        Added by
                      </div>
                      <div className="text-mineShaft text-[13px] font-semibold">
                        {item.addedBy}
                      </div>
                    </div>
                  </div>
                  {item.status == "waiting" && (
                    <button className=" flex items-center rounded-3xl h-12 mt-4 justify-center text-[13px] text-white bg-primary">
                      <div>Go to sign</div>
                      <RightIcon fill="#FFF"></RightIcon>
                    </button>
                  )}
                </div>
              </div>
            </>
          );
        })}
    </div>
  );
}
