import React, { useEffect, useState } from "react";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";

registerLocale("es", es);
import CloseIcon from "../../../../assets/svg/icon_close.svg";
import AddIcon from "../../../../assets/svg/icon_plus.svg";

export default function CommentsOverlay({ showOverlay, employee }) {
  const [name, setName] = useState("");
  const [comments, setComments] = useState([]);
  const [commentDate, setCommentDate] = useState(
    new Date()
  );

  useEffect(() => {
    if (employee) {
      setName(employee.name || "");
      setComments(employee.comments || []);
    }
  }, [employee]);

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
          <div className="flex flex-col bg-whiteLilac rounded-xl mx-8 justify-center p-2  mt-4">
            {comments.length > 0 &&
              comments.map((item) => {
                return (
                  <>
                    <div className="text-regentGray text-[13px] flex p-2">
                      <div className="">{item.text}</div>
                      <div className="text-mineShaft text-[13px] font-semibold ml-auto">
                        {item.date}
                      </div>
                    </div>
                    <div className="w-full h-[1px] bg-porcelain"></div>
                  </>
                );
              })}
          </div>
          <div className="mx-8 flex flex-col mt-4">
            <label htmlFor="comment">Comentario nuevo:</label>
            <textarea
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
          <div className="flex w-full mt-auto">
            <button className=" ml-auto mb-4 mr-4 flex items-center rounded-3xl h-12 pr-4 text-[13px] text-white bg-primary">
              <AddIcon fill="#FFF"></AddIcon>
              <div>Guardar </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
