import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FetchPayrollDetails } from '../../../../../store/actionCreators/payroll'

export default function PayrollSummary() {
  const dispatch = useDispatch()

  const {selectedPayrollDetails} = useSelector(state => state.payroll)


  return (
    <div>index</div>
  )
}
