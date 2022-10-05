import React, { useEffect, useState } from "react";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";

registerLocale("es", es);

import CloseIcon from "../../../../assets/svg/icon_close.svg";
import AddIcon from "../../../../assets/svg/icon_plus.svg";

const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export default function CommentsOverlay({
  showOverlay,
  onSave,
  selectedRegisterDetail,
  disableCreate = false,
}) {
  const [name, setName] = useState("");
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentsSmallBox, setCommentsSmallBox] = useState([]);
  const [commentDate, setCommentDate] = useState(new Date());

  const handleSave = () => {
    let comment = {
      registerDetail: selectedRegisterDetail.id,
      description: newComment,
      date: commentDate,
    };
    onSave(comment);
  };

  useEffect(() => {
    if (selectedRegisterDetail) {
      setName(selectedRegisterDetail.employee.name || "");
      setComments(selectedRegisterDetail.comments || []);
      setCommentsSmallBox(selectedRegisterDetail.smallBox || []);
    }
  }, [selectedRegisterDetail]);

  return (
    <>
      <div className="absolute top-0 left-0 h-screen w-screen flex z-[100]">
        <div
          className="w-1/2 bg-[#23232399]"
          onClick={() => showOverlay(false)}
        ></div>
        <div className="w-1/2 bg-white flex flex-col overflow-scroll hide-scrollbar">
          <div className="flex px-16 py-16 items-center">
            <div className="flex flex-col">
              <h2 className=" text-4xl  font-semibold">COMENTARIOS</h2>
              <h3 className=" text-xl  font-semibold  text-regentGray mt-2">
                {name}
              </h3>
            </div>
            <div
              onClick={() => showOverlay(false)}
              className="rounded-full h-16 w-16 ml-auto border border-porcelain flex items-center justify-center"
            >
              <CloseIcon fill="#0C3CFD"></CloseIcon>
            </div>
          </div>
          {comments.length > 0 && (
            <div className="flex flex-col bg-whiteLilac rounded-xl mx-8 justify-center p-2  mt-4">
              <p>Comentarios generales</p>
              {comments.map((item) => {
                return (
                  <>
                    <div className="text-regentGray text-[13px] flex p-2">
                      <div className="">{item.description}</div>
                      <div className="text-mineShaft text-[13px] font-semibold ml-auto">
                        {new Date(item.date).toLocaleDateString(
                          "es-ES",
                          dateOptions
                        )}
                      </div>
                    </div>
                    <div className="w-full h-[1px] bg-porcelain"></div>
                  </>
                );
              })}
            </div>
          )}

          {commentsSmallBox.length > 0 && (
            <div className="flex flex-col bg-whiteLilac rounded-xl mx-8 justify-center p-2  mt-4">
              <p>Caja chica</p>

              {commentsSmallBox.map((item) => {
                return (
                  <>
                    <div className="text-regentGray text-[13px] flex p-2">
                      <div className="text-mineShaft font-semibold">
                        ${item.amount}
                      </div>
                      <div className="text-regentGray ml-4">{item.comment}</div>
                      <div className="text-mineShaft text-[13px] font-semibold ml-auto">
                        {new Date(item.date).toLocaleDateString(
                          "es-ES",
                          dateOptions
                        )}
                      </div>
                    </div>
                    <div className="w-full h-[1px] bg-porcelain"></div>
                  </>
                );
              })}
            </div>
          )}

          <div
            className={`mx-8 flex flex-col mt-4 ${
              disableCreate ? "hidden" : ""
            }`}
          >
            <label htmlFor="comment">Comentario nuevo:</label>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              name="comment"
              className="rounded-[32px] border border-porcelain "
            ></textarea>
            <div className="flex flex-col mt-2">
              <div className="mr-2">Fecha de commentario:</div>
              <DatePicker
                dateFormat="dd/MM/yyyy"
                locale="es"
                selected={commentDate}
                onChange={(date) => setCommentDate(date)}
              />
            </div>
          </div>
          <div
            className={`flex w-full mt-auto ${disableCreate ? "hidden" : ""}`}
          >
            <button
              onClick={handleSave}
              className=" ml-auto mb-4 mr-4 flex items-center rounded-3xl h-12 pr-4 text-[13px] text-white bg-primary"
            >
              <AddIcon fill="#FFF"></AddIcon>
              <div>Guardar </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
