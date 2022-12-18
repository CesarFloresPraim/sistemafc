import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchPayrollDetails } from "../../../../../store/actionCreators/payroll";

import { dateOptions } from "../../../../../helpers/dateOptions";
import { moneyFormat } from "../../../../../helpers/moneyFormat";
import {
  getVacationsPerYears,
  getYearsOfWork,
} from "../../../../../helpers/vacations";

export default function PayrollSummary() {
  const dispatch = useDispatch();

  const { selectedPayrollDetails } = useSelector((state) => state.payroll);

  const calcPercepcionsAmount = (registerDetailItem) => {
    let sum = 0;
    for (const perception of registerDetailItem.employee.perceptions) {
      if (!perception.isForSalary) {
        sum += perception.amount;
      } else {
        const abscenceNumber = calcAbscenceNumber(registerDetailItem);
        sum += (perception.amount * registerDetailItem.employee.daysOfWork - abscenceNumber) / registerDetailItem.employee.daysOfWork
      }
    }
    return sum;
  };

  const calcDeductionsAmount = (registerDetailItem) => {
    let sum = 0;
    for (const deduction of registerDetailItem.employee.deductions) {
      if (!deduction.payed) {
        sum += deduction.amount;
      }
    }
    return sum;
  };

  const calcAbscenceNumber = (registerDetailItem) => {
    let sum = 0;
    const abscenceText = "Falta injustificada";
    if (registerDetailItem.do == abscenceText) {
      sum += 1;
    }
    if (registerDetailItem.lu == abscenceText) {
      sum += 1;
    }
    if (registerDetailItem.ma == abscenceText) {
      sum += 1;
    }
    if (registerDetailItem.mi == abscenceText) {
      sum += 1;
    }
    if (registerDetailItem.ju == abscenceText) {
      sum += 1;
    }
    if (registerDetailItem.vi == abscenceText) {
      sum += 1;
    }
    if (registerDetailItem.sa == abscenceText) {
      sum += 1;
    }
    return sum;
  };

  const calcAbscenceAmount = (registerDetailItem) => {
    const abscenceNumber = calcAbscenceNumber(registerDetailItem);
    return (
      (registerDetailItem.employee.salary / 7) *
      (abscenceNumber + abscenceNumber / 6)
    );
  };

  const calcVacationNumber = (registerDetailItem) => {
    let employeeStartDate = new Date(registerDetailItem.employee.startDate);
    employeeStartDate.setFullYear(
      employeeStartDate.getFullYear() + getYearsOfWork(employeeStartDate)
    );
    let sum = 0;
    for (const vacation of registerDetailItem.employee.vacations) {
      if (new Date(vacation.fromDate) > employeeStartDate) {
        sum += vacation.days;
      }
    }
    return sum;
  };

  const calcVacationAmount = (registerDetailItem) => {
    const daysOfVacation = calcVacationNumber(registerDetailItem);
    const workedDays = 365;
    const proportionalForWorkedDays = (365 * daysOfVacation) / workedDays;
    const dailySalary = registerDetailItem.employee.salary / 7;
    const vacationalBonus = 0.25;
    const amountWithoutVacationBonus = dailySalary * proportionalForWorkedDays;
    const amountWithVacationBonus =
      amountWithoutVacationBonus * (1 + vacationalBonus);
    return amountWithVacationBonus;
  };

  const calcFoodAmount = (registerDetailItem) => {
    const foodDict = registerDetailItem.food
    let numberOfFoods = 0
    for (const key in foodDict) {
      if(key != "id" && foodDict[key] == true){
        numberOfFoods++
      }
    }
    return numberOfFoods * 20 //Change to food price setting (not implemented yet)
  }

  const calcSmallBoxAmount = (registerDetailItem) => {
    const smallBoxArray = registerDetailItem.smallBox
    let total = 0
    for (const smallBoxItem of smallBoxArray) {
      total += smallBoxItem.amount
    }
    return total
  }

  const calcTotalToPay = (payrollRegister) => {
    let salary = payrollRegister.registerDetail.employee.salary
    let perceptions = calcPercepcionsAmount(payrollRegister.registerDetail)
    let saving = payrollRegister.registerDetail.employee.savingsPerWeek
    let retention = payrollRegister.registerDetail.employee.retentionPerWeek
    let deductions = calcDeductionsAmount(payrollRegister.registerDetail)
    let food = calcFoodAmount(payrollRegister.registerDetail)
    let smallBox = calcSmallBoxAmount(payrollRegister.registerDetail)
    let cardPayment = payrollRegister.cardAmount
    let infonavit = payrollRegister.registerDetail.employee.retentionInfonavit
    let abscence = calcAbscenceAmount(payrollRegister.registerDetail)
    let vacations = calcVacationAmount(payrollRegister.registerDetail)
    let puntuality = payrollRegister.registerDetail.employee.puntualityPrice
    let attendance = payrollRegister.registerDetail.employee.attendancePrice
    
    let total = salary + perceptions - saving - retention - deductions - food - smallBox - cardPayment -infonavit - abscence + vacations + puntuality + attendance
    return total;
  };

  return (
    <>
      <div className="overflow-x-auto relative rounded-3xl m-6 ">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="py-2 px-4">
                No
              </th>
              <th
                scope="col"
                className="py-2 px-4 sticky top-0 left-0 bg-gray-50"
              >
                Nombre
              </th>
              <th scope="col" className="py-2 px-4">
                Departamento
              </th>
              <th scope="col" className="py-2 px-4">
                Dias T
              </th>
              <th scope="col" className="py-2 px-4">
                Salario
              </th>
              <th scope="col" className="py-2 px-4">
                Percepciones
              </th>
              <th scope="col" className="py-2 px-4">
                Ahorro
              </th>
              <th scope="col" className="py-2 px-4">
                Sem anterior
              </th>
              <th scope="col" className="py-2 px-4">
                Saldo ahorro
              </th>
              <th scope="col" className="py-2 px-4">
                Retencion
              </th>
              <th scope="col" className="py-2 px-4">
                Sem anteior
              </th>
              <th scope="col" className="py-2 px-4">
                Saldo adeudo
              </th>
              <th scope="col" className="py-2 px-4">
                Pago en tarjeta
              </th>
              <th scope="col" className="py-2 px-4">
                Ret. Infonavit
              </th>
              <th scope="col" className="py-2 px-4">
                Sem anteior
              </th>
              <th scope="col" className="py-2 px-4">
                Saldo infonavit
              </th>
              <th scope="col" className="py-2 px-4">
                Deducciones
              </th>
              <th scope="col" className="py-2 px-4">
                Faltas
              </th>
              <th scope="col" className="py-2 px-4">
                Importe faltas
              </th>
              <th scope="col" className="py-2 px-4">
                Vacaciones
              </th>
              <th scope="col" className="py-2 px-4">
                Importe vacaciones
              </th>
              <th scope="col" className="py-2 px-4">
                Importe Comidas
              </th>
              <th scope="col" className="py-2 px-4">
                Importe Caja chica
              </th>
              <th scope="col" className="py-2 px-4">
                B. Puntualidad
              </th>
              <th scope="col" className="py-2 px-4">
                B. Asistencia
              </th>
              <th scope="col" className="py-2 px-4">
                Total a pagar
              </th>
            </tr>
          </thead>
          <tbody>
            {selectedPayrollDetails.payrollRegisters.length > 0 &&
              selectedPayrollDetails.payrollRegisters.map((item) => {
                return (
                  <tr
                    key={item.id}
                    className="bg-white font-semibold hover:bg-gray-50 "
                  >
                    <td className={`p-2 border border-porcelain`}>
                      {item.registerDetail.employee.number}
                    </td>
                    <td
                      className={`p-2 whitespace-nowrap border bg-gray-50 border-porcelain sticky top-0 left-0`}
                    >
                      {item.registerDetail.employee.name}
                    </td>
                    <td className={`p-2 border border-porcelain`}>
                      {item.registerDetail.employee.department.name}
                    </td>
                    <td className={`p-2 border border-porcelain`}>
                      {item.registerDetail.employee.daysOfWork}
                    </td>
                    <td className={`p-2 border border-porcelain`}>
                      {moneyFormat(item.registerDetail.employee.salary)}
                    </td>
                    <td className={`p-2 border border-porcelain`}>
                      {moneyFormat(
                        calcPercepcionsAmount(item.registerDetail)
                      )}
                    </td>
                    <td
                      className={`p-2 border border-porcelain text-caribbeanGreen`}
                    >
                      {moneyFormat(item.registerDetail.employee.savingsPerWeek)}
                    </td>
                    <td
                      className={`p-2 border border-porcelain text-caribbeanGreen`}
                    >
                      {moneyFormat(item.registerDetail.employee.savingsAmount)}
                    </td>
                    <td
                      className={`p-2 border border-porcelain text-caribbeanGreen`}
                    >
                      {moneyFormat(
                        item.registerDetail.employee.savingsPerWeek +
                          item.registerDetail.employee.savingsAmount
                      )}
                    </td>
                    <td
                      className={`p-2 border border-porcelain text-cobalt`}
                    >
                      {moneyFormat(
                        item.registerDetail.employee.retentionPerWeek
                      )}
                    </td>
                    <td
                      className={`p-2 border border-porcelain text-cobalt`}
                    >
                      {moneyFormat(item.registerDetail.employee.debtAmount)}
                    </td>
                    <td
                      className={`p-2 border border-porcelain text-cobalt`}
                    >
                      {moneyFormat(
                        item.registerDetail.employee.debtAmount -
                          item.registerDetail.employee.retentionPerWeek
                      )}
                    </td>
                    <td className={`p-2 border border-porcelain`}>
                      {moneyFormat(item.cardAmount)}
                    </td>
                    <td
                      className={`p-2 border border-porcelain text-marmalade`}
                    >
                      {moneyFormat(
                        item.registerDetail.employee.retentionInfonavit
                      )}
                    </td>
                    <td
                      className={`p-2 border border-porcelain text-marmalade`}
                    >
                      {moneyFormat(
                        item.registerDetail.employee.infonavitAmount -
                          item.registerDetail.employee.retentionInfonavit
                      )}
                    </td>
                    <td
                      className={`p-2 border border-porcelain text-marmalade`}
                    >
                      {moneyFormat(
                        item.registerDetail.employee.infonavitAmount
                      )}
                    </td>

                    <td className={`p-2 border border-porcelain`}>
                      {moneyFormat(
                        calcDeductionsAmount(item.registerDetail)
                      )}
                    </td>
                    <td className={`p-2 border border-porcelain`}>
                      {calcAbscenceNumber(item.registerDetail)}
                    </td>
                    <td className={`p-2 border border-porcelain`}>
                      {moneyFormat(calcAbscenceAmount(item.registerDetail))}
                    </td>
                    <td className={`p-2 border border-porcelain`}>
                      {calcVacationNumber(item.registerDetail)}
                    </td>
                    <td className={`p-2 border border-porcelain`}>
                      {moneyFormat(calcVacationAmount(item.registerDetail))}
                    </td>
                    <td className={`p-2 border border-porcelain`}>
                      {moneyFormat(calcFoodAmount(item.registerDetail))}
                    </td>
                    <td className={`p-2 border border-porcelain`}>
                      {moneyFormat(calcSmallBoxAmount(item.registerDetail))}
                    </td>
                    <td className={`p-2 border border-porcelain`}>
                      {item.registerDetail.puntuality ? moneyFormat(item.registerDetail.employee.puntualityPrice) : moneyFormat(0)}
                    </td>
                    <td className={`p-2 border border-porcelain`}>
                      {item.registerDetail.attendance ? moneyFormat(item.registerDetail.employee.attendancePrice) : moneyFormat(0)}
                    </td>
                    <td className={`p-2 border border-porcelain`}>
                      {moneyFormat(calcTotalToPay(item))}
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
