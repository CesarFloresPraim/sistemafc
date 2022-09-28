import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetRegisters } from "../../../../store/actionCreators/rh";

export default function SmallBoxRegister() {
  const dispatch = useDispatch();
  const { search, registers } = useSelector((state) => state.rh);

  const handleFoodChange = (e, id) => {
    let edittedList = registers.map((item) => {
      if (item.id == id) {
        let currentFood = item.food;
        currentFood = { ...currentFood, [e.target.name]: e.target.value };
        //console.log(currentFood);
        return { ...item, food: currentFood };
      }
      return item;
    });
    dispatch(SetRegisters(edittedList));
  };

  // const handleAddComment = (id) => {
  //   let selectedEmp = employeesList.find((item) => item.id == id);
  //   if (selectedEmp) {
  //     setSelectedEmployee(selectedEmp);
  //     setShowCommentsOverlay(true);
  //   }
  // };

  return (
    <>
      <div className="overflow-x-scroll rounded-3xl m-6 ">
        <table className="relative w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr className="">
              <th scope="col" className="py-3 px-2 sticky left-0 bg-gray-50">
                Nombre
              </th>
              <th scope="col" className="py-3 px-2">
                Lu
              </th>
              <th scope="col" className="py-3 px-2">
                Ma
              </th>
              <th scope="col" className="py-3 px-2">
                Mi
              </th>
              <th scope="col" className="py-3 px-2">
                Ju
              </th>
              <th scope="col" className="py-3 px-2">
                Vi
              </th>
            </tr>
          </thead>
          <tbody>
            {registers.length > 0 &&
              registers
                .filter((item) => {
                  if (search == "") {
                    return true;
                  } else {
                    return item.name
                      .toLocaleLowerCase()
                      .includes(search.toLocaleLowerCase());
                  }
                })
                .map((item) => {
                  return (
                    <tr key={item.id} className="bg-white font-semibold">
                      <td
                        className={`py-1 px-2 whitespace-nowrap sticky left-0 bg-white`}
                      >
                        {item.name}
                      </td>
                      <td className={`py-1 px-2`}>
                        {" "}
                        <select
                          name="lu"
                          value={item.food?.lu || "true"}
                          onChange={(e) => handleFoodChange(e, item.id)}
                        >
                          <option value="true" selected>
                            Si
                          </option>
                          <option value="false">No</option>
                        </select>
                      </td>
                      <td className={`py-1 px-2`}>
                        {" "}
                        <select
                          name="ma"
                          value={item.food?.ma || "true"}
                          onChange={(e) => handleFoodChange(e, item.id)}
                        >
                          <option value="true" selected>
                            Si
                          </option>
                          <option value="false">No</option>
                        </select>
                      </td>
                      <td className={`py-1 px-2`}>
                        {" "}
                        <select
                          name="mi"
                          value={item.food?.mi || "true"}
                          onChange={(e) => handleFoodChange(e, item.id)}
                        >
                          <option value="true" selected>
                            Si
                          </option>
                          <option value="false">No</option>
                        </select>
                      </td>
                      <td className={`py-1 px-2`}>
                        {" "}
                        <select
                          name="ju"
                          value={item.food?.ju || "true"}
                          onChange={(e) => handleFoodChange(e, item.id)}
                        >
                          <option value="true" selected>
                            Si
                          </option>
                          <option value="false">No</option>
                        </select>
                      </td>
                      <td className={`py-1 px-2`}>
                        {" "}
                        <select
                          name="vi"
                          value={item.food?.vi || "true"}
                          onChange={(e) => handleFoodChange(e, item.id)}
                        >
                          <option value="true" selected>
                            Si
                          </option>
                          <option value="false">No</option>
                        </select>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </>
  );
}
