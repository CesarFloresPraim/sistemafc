import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetRegistersDetails } from "../../../../../store/actionCreators/rh";

export default function FoodRegister() {
  const dispatch = useDispatch();
  const { search, register } = useSelector((state) => state.rh);

  const handleFoodChange = (e, id) => {
    let edittedRegister = register.registersDetails?.map((item) => {
      if (item.id == id) {
        let foodObject = item.food;
        foodObject = { ...foodObject, [e.target.name]: e.target.value == "false"? false : true };
        item.food = foodObject;
      }
      return item
    });

    dispatch(SetRegistersDetails(edittedRegister));
  };

  // const handleAddComment = (id) => {
  //   let Emp = employeesList.find((item) => item.id == id);
  //   if (Emp) {
  //     setEmployee(Emp);
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
            {register.registersDetails &&
              register.registersDetails.length > 0 &&
              register.registersDetails
                .filter((item) => {
                  if (search == "") {
                    return true;
                  } else {
                    return item.employee?.name
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
                        {item.employee?.name}
                      </td>
                      <td className={`py-1 px-2`}>
                        {" "}
                        <select
                          name="lu"
                          value={item.food.lu? "true": "false" || "true"}
                          onChange={(e) => handleFoodChange(e, item.id)}
                        >
                          <option value="true">Si</option>
                          <option value="false">No</option>
                        </select>
                      </td>
                      <td className={`py-1 px-2`}>
                        {" "}
                        <select
                          name="ma"
                          value={item.food?.ma? "true": "false" || "true"}
                          onChange={(e) => handleFoodChange(e, item.id)}
                        >
                          <option value="true">Si</option>
                          <option value="false">No</option>
                        </select>
                      </td>
                      <td className={`py-1 px-2`}>
                        {" "}
                        <select
                          name="mi"
                          value={item.food?.mi? "true": "false" || "true"}
                          onChange={(e) => handleFoodChange(e, item.id)}
                        >
                          <option value="true">Si</option>
                          <option value="false">No</option>
                        </select>
                      </td>
                      <td className={`py-1 px-2`}>
                        {" "}
                        <select
                          name="ju"
                          value={item.food?.ju? "true": "false" || "true"}
                          onChange={(e) => handleFoodChange(e, item.id)}
                        >
                          <option value="true">Si</option>
                          <option value="false">No</option>
                        </select>
                      </td>
                      <td className={`py-1 px-2`}>
                        {" "}
                        <select
                          name="vi"
                          value={item.food?.vi? "true": "false" || "true"}
                          onChange={(e) => handleFoodChange(e, item.id)}
                        >
                          <option value="true">Si</option>
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
