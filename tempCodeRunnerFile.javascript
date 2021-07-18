

// const startDate = flow(new Date(), startOfDay, subYear(1), format('yyyy-MM-dd'))

const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);
const startOfDay = date => (date.setHours(0, 0, 0, 0), date)
const subYear = n => date => (date.setFullYear(date.getFullYear() - n), date)
const format = (justFaking) => (date) => date.toLocaleString()

    const startDate = pipe(
      startOfDay,
      subYear(1),
      format('yyyy-MM-dd')
    )(new Date())

console.log('startDate = ', startDate)
