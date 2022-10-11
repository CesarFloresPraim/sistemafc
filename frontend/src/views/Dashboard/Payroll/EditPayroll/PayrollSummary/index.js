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

  const calcPercepcionsAmount = (employeeItem) => {
    let sum = 0;
    for (const perception of employeeItem.perceptions) {
      if (!perception.isForSalary) {
        sum += perception.amount;
      }
    }
    return sum;
  };

  const calcDeductionsAmount = (employeeItem) => {
    let sum = 0;
    for (const deduction of employeeItem.deductions) {
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

  const calcTotalToPay = () => {
    return 100
  }

  return (
    <>
      <div className="overflow-x-auto relative rounded-3xl m-6 ">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="py-3 px-6">
                No
              </th>
              <th
                scope="col"
                className="py-3 px-6 sticky top-0 left-0 bg-gray-50"
              >
                Nombre
              </th>
              <th scope="col" className="py-3 px-6">
                Departamento
              </th>
              <th scope="col" className="py-3 px-6">
                Dias T
              </th>
              <th scope="col" className="py-3 px-6">
                Salario
              </th>
              <th scope="col" className="py-3 px-6">
                Percepciones
              </th>
              <th scope="col" className="py-3 px-6">
                Ahorro
              </th>
              <th scope="col" className="py-3 px-6">
                Sem anterior
              </th>
              <th scope="col" className="py-3 px-6">
                Saldo ahorro
              </th>
              <th scope="col" className="py-3 px-6">
                Retencion
              </th>
              <th scope="col" className="py-3 px-6">
                Sem anteior
              </th>
              <th scope="col" className="py-3 px-6">
                Saldo adeudo
              </th>
              <th scope="col" className="py-3 px-6">
                Pago en tarjeta
              </th>
              <th scope="col" className="py-3 px-6">
                Ret. Infonavit
              </th>
              <th scope="col" className="py-3 px-6">
                Sem anteior
              </th>
              <th scope="col" className="py-3 px-6">
                Saldo infonavit
              </th>
              <th scope="col" className="py-3 px-6">
                Deducciones
              </th>
              <th scope="col" className="py-3 px-6">
                Faltas
              </th>
              <th scope="col" className="py-3 px-6">
                Importe faltas
              </th>
              <th scope="col" className="py-3 px-6">
                Vacaciones
              </th>
              <th scope="col" className="py-3 px-6">
                Importe vacaciones
              </th>
              <th scope="col" className="py-3 px-6">
                B. Puntualidad
              </th>
              <th scope="col" className="py-3 px-6">
                B. Asistencia
              </th>
              <th scope="col" className="py-3 px-6">
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
                    <td className={`py-4 px-6 border border-porcelain`}>
                      {item.registerDetail.employee.number}
                    </td>
                    <td
                      className={`py-4 px-6 whitespace-nowrap border bg-gray-50 border-porcelain sticky top-0 left-0`}
                    >
                      {item.registerDetail.employee.name}
                    </td>
                    <td className={`py-4 px-6 border border-porcelain`}>
                      {item.registerDetail.employee.department.name}
                    </td>
                    <td className={`py-4 px-6 border border-porcelain`}>
                      {item.registerDetail.employee.daysOfWork}
                    </td>
                    <td className={`py-4 px-6 border border-porcelain`}>
                      {moneyFormat(item.registerDetail.employee.salary)}
                    </td>
                    <td className={`py-4 px-6 border border-porcelain`}>
                      {moneyFormat(
                        calcPercepcionsAmount(item.registerDetail.employee)
                      )}
                    </td>
                    <td
                      className={`py-4 px-6 border border-porcelain text-caribbeanGreen`}
                    >
                      {moneyFormat(item.registerDetail.employee.savingsPerWeek)}
                    </td>
                    <td
                      className={`py-4 px-6 border border-porcelain text-caribbeanGreen`}
                    >
                      {moneyFormat(item.registerDetail.employee.savingsAmount)}
                    </td>
                    <td
                      className={`py-4 px-6 border border-porcelain text-caribbeanGreen`}
                    >
                      {moneyFormat(
                        item.registerDetail.employee.savingsPerWeek +
                          item.registerDetail.employee.savingsAmount
                      )}
                    </td>
                    <td
                      className={`py-4 px-6 border border-porcelain text-cobalt`}
                    >
                      {moneyFormat(
                        item.registerDetail.employee.retentionPerWeek
                      )}
                    </td>
                    <td
                      className={`py-4 px-6 border border-porcelain text-cobalt`}
                    >
                      {moneyFormat(item.registerDetail.employee.debtAmount)}
                    </td>
                    <td
                      className={`py-4 px-6 border border-porcelain text-cobalt`}
                    >
                      {moneyFormat(
                        item.registerDetail.employee.debtAmount -
                          item.registerDetail.employee.retentionPerWeek
                      )}
                    </td>
                    <td className={`py-4 px-6 border border-porcelain`}>
                      {moneyFormat(item.cardAmount)}
                    </td>
                    <td
                      className={`py-4 px-6 border border-porcelain text-marmalade`}
                    >
                      {moneyFormat(
                        item.registerDetail.employee.retentionInfonavit
                      )}
                    </td>
                    <td
                      className={`py-4 px-6 border border-porcelain text-marmalade`}
                    >
                      {moneyFormat(
                        item.registerDetail.employee.infonavitAmount -
                          item.registerDetail.employee.retentionInfonavit
                      )}
                    </td>
                    <td
                      className={`py-4 px-6 border border-porcelain text-marmalade`}
                    >
                      {moneyFormat(item.registerDetail.employee.infonavitAmount)}
                    </td>

                    <td className={`py-4 px-6 border border-porcelain`}>
                      {moneyFormat(
                        calcDeductionsAmount(item.registerDetail.employee)
                      )}
                    </td>
                    <td className={`py-4 px-6 border border-porcelain`}>
                      {calcAbscenceNumber(item.registerDetail)}
                    </td>
                    <td className={`py-4 px-6 border border-porcelain`}>
                      {moneyFormat(calcAbscenceAmount(item.registerDetail))}
                    </td>
                    <td className={`py-4 px-6 border border-porcelain`}>
                      {calcVacationNumber(item.registerDetail)}
                    </td>
                    <td className={`py-4 px-6 border border-porcelain`}>
                      {moneyFormat(calcVacationAmount(item.registerDetail))}
                    </td>
                    <td className={`py-4 px-6 border border-porcelain`}>
                    </td>
                    <td className={`py-4 px-6 border border-porcelain`}>
                    </td>
                    <td className={`py-4 px-6 border border-porcelain`}>
                      {moneyFormat(calcTotalToPay(item.registerDetail))}
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
