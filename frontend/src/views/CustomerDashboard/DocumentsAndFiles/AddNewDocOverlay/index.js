import React, { useEffect, useState, useRef } from "react";

import CloseIcon from "../../../../assets/svg/icon_close.svg";
import BrowseIcon from "../../../../assets/svg/icon_browse_blue.svg";
import CheckIcon from "../../../../assets/svg/icon_check_big.svg";
import UploadIcon from "../../../../assets/svg/icon_upload_file.svg";

const allowedFileExtensions = ["jpg", "png", "pdf"];

export default function AddNewDocOverlay({ showOverlay, type }) {
  const [files, setFiles] = useState([]);
  const [currentPicture, setCurrentPicture] = useState(
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
  );
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState(undefined);

  const drop = useRef(null);
  const inputFileRef = useRef(null);

  const handleFile = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
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
      }
      setFiles(files);
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
      for (let i = 0; i < files.length; i++) {
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
      }
      setFiles(files);
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

  const removeFile = (idx) => {
    let fileList = [...files]
    fileList.splice(idx, 1);

    setFiles(fileList)
  }

  const buttonDisabled = () => {
    return files === undefined || files === null || files.length < 1;
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

  return (
    <>
      {/** Desktop */}
      <div className="hidden absolute top-0 left-0 h-screen w-screen xl:flex z-[100]">
        <div
          className="w-1/2 bg-[#23232399]"
          onClick={() => showOverlay(false)}
        ></div>
        <div className="w-1/2 bg-white flex flex-col overflow-scroll hide-scrollbar">
          <div className="flex px-16 pt-16 items-center">
            <h2 className=" text-2xl md:text-[40px] font-semibold text-center">
              Upload document
            </h2>
            <div
              onClick={() => showOverlay(false)}
              className="rounded-full h-16 w-16 ml-auto border border-porcelain flex items-center justify-center"
            >
              <CloseIcon fill="#0C3CFD"></CloseIcon>
            </div>
          </div>
          <p className=" px-16 text-regentGray text-lg">{type}</p>
          <div className="h-full my-12 px-16">
            <div
              ref={drop}
              className={`h-full w-full flex flex-col items-center justify-center px-6 pt-5 pb-6 border-[3px] border-mischka ${
                dragging ? "bg-zumthor" : "bg-whiteLilac"
              }  border-dashed rounded-2xl`}
            >
              <div className="flex flex-col md:w-5/6 items-center justify-center">
                <UploadIcon fill="#0C3CFD"></UploadIcon>
                <p className=" text-xl font-semibold my-2 text-center">
                  Drag & Drop your files
                </p>
                <p className="text-[#69747E] text-[15px] my-6">
                  Drag and drop your files in here or click{" "}
                  <span className="font-semibold text-mineShaft">
                    Browse files
                  </span>{" "}
                  to select them. Then click{" "}
                  <span className="font-semibold text-mineShaft">Upload</span>.
                  You can upload multiple files.
                </p>
                {files && files.length > 0 && (
                  <div className="flex flex-col bg-white border border-porcelain rounded-xl w-full justify-center px-4 mt-4">
                    {Array.from(files).map((item, idx, arr) => {
                      if (idx != arr.length - 1) {
                        return (
                          <>
                            <div className="text-regentGray text-[13px] flex items-center pl-2">
                              <div className="hidden xl:block">{item.name}</div>
                              <div className="text-mineShaft text-[13px] font-semibold ml-auto" onClick={()=> removeFile(idx)}>
                                <CloseIcon fill="#FB3F3F"></CloseIcon>
                              </div>
                            </div>
                            <div className="w-full h-[1px] bg-porcelain"></div>
                          </>
                        );
                      }
                      return (
                        <div className="text-regentGray text-[13px] flex items-center pl-2">
                          <div className="hidden xl:block"> {item.name}</div>
                          <div className="text-mineShaft text-[13px] font-semibold ml-auto" onClick={()=> removeFile(idx)}>
                            <CloseIcon fill="#FB3F3F"></CloseIcon>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                <div
                  onClick={() => {
                    inputFileRef.current.click();
                  }}
                  className="flex items-center cursor-pointer mt-8 w-2/6 text-[13px] text-primary bg-white  rounded-[32px] pl-2 pr-6"
                >
                  <BrowseIcon fill="#0C3CFD" />
                  <p className="text-primary grow text-center">Browse file</p>
                  <input
                    ref={inputFileRef}
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    multiple={true}
                    onChange={handleFile}
                  />
                </div>
                {files && files.length > 0 && (
                  <div
                    onClick={() => {
                      inputFileRef.current.click();
                    }}
                    className="flex items-center cursor-pointer mt-4 w-2/6  text-[13px] text-white bg-primary  rounded-[32px] pl-2 pr-6"
                  >
                    <CheckIcon fill="#FFFFFF" />
                    <p className="text-white grow text-center">Upload now</p>
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-8 md:mt-16 mb-8">
                  PNG, JPG, GIF smaller than 10MB
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/** Mobile */}
      <div className="flex fixed top-0 left-0 h-screen w-screen xl:hidden flex-col z-[100] bg-[#23232399]">
        <div className=" h-1/6 " onClick={() => showOverlay(false)}></div>
        <div className=" h-5/6 bg-white rounded-t-[32px] flex flex-col overflow-y-scroll hide-scrollbar">
          <div className="flex justify-center mt-8 items-center">
            <h2 className=" text-[13px] font-semibold text-center tracking-widest">
              UPLOAD DOCUMENT
            </h2>
          </div>
          <div className="h-full my-12 px-6">
            <div
              className={`h-full w-full flex flex-col items-center justify-center px-6 pt-5 pb-6 border-[3px] border-mischka ${
                dragging ? "bg-zumthor" : "bg-whiteLilac"
              }  border-dashed rounded-2xl`}
            >
              <div className="flex flex-col md:w-5/6 items-center justify-center">
                <UploadIcon fill="#0C3CFD"></UploadIcon>
                <p className=" text-xl font-semibold my-2 text-center">
                  Drag & Drop your files
                </p>
                <p className="text-[#69747E] text-[15px] my-6">
                  Drag and drop your files in here or click{" "}
                  <span className="font-semibold text-mineShaft">
                    Browse files
                  </span>{" "}
                  to select them. Then click{" "}
                  <span className="font-semibold text-mineShaft">Upload</span>.
                  You can upload multiple files.
                </p>
                {files && files.length > 0 && (
                  <div className="flex flex-col bg-white border border-porcelain rounded-xl w-full justify-center px-4 mt-4">
                    {Array.from(files).map((item, idx, arr) => {
                      if (idx != arr.length - 1) {
                        return (
                          <>
                            <div className="text-regentGray text-[13px] flex items-center pl-2">
                              <div className="">{item.name}</div>
                              <div className="text-mineShaft text-[13px] font-semibold ml-auto" onClick={()=> removeFile(idx)}>
                                <CloseIcon fill="#FB3F3F"></CloseIcon>
                              </div>
                            </div>
                            <div className="w-full h-[1px] bg-porcelain"></div>
                          </>
                        );
                      }
                      return (
                        <div className="text-regentGray text-[13px] flex items-center pl-2">
                          <div className=""> {item.name}</div>
                          <div className="text-mineShaft text-[13px] font-semibold ml-auto" onClick={()=> removeFile(idx)}>
                            <CloseIcon fill="#FB3F3F"></CloseIcon>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                <div
                  onClick={() => {
                    inputFileRef.current.click();
                  }}
                  className="flex items-center cursor-pointer mt-8  text-[13px] text-primary bg-white  rounded-[32px] pl-2 pr-6"
                >
                  <BrowseIcon fill="#0C3CFD" />
                  <p className="text-primary grow text-center">Browse file</p>
                  <input
                    ref={inputFileRef}
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    multiple={true}
                    onChange={handleFile}
                  />
                </div>
                {files && files.length > 0 && (
                  <div
                    onClick={() => {
                      inputFileRef.current.click();
                    }}
                    className="flex items-center cursor-pointer mt-4  text-[13px] text-white bg-primary  rounded-[32px] pl-2 pr-6"
                  >
                    <CheckIcon fill="#FFFFFF" />
                    <p className="text-white grow text-center">Upload now</p>
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-8 md:mt-16 mb-8">
                  PNG, JPG, GIF smaller than 10MB
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
