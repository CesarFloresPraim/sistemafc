import differenceInDays from "date-fns/differenceInDays";

export const getYearsOfWork = (startDate) => {
    return parseInt((Math.abs(
        differenceInDays(
          new Date(startDate),
          new Date()
        )
      ) + 1)/365)
}

export const getVacationsPerYears = (years) => {
    if (years == 0) return 0
    if (years == 1) return 6
    if (years == 2) return 8
    if (years == 3) return 10
    if (years == 4) return 12
    if (years >= 5 && years <= 9) return 14
    if (years >= 10 && years <= 14) return 14
    if (years >= 15 && years <= 19) return 14
    if (years >= 25) return 22
}