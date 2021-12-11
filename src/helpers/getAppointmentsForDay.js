const getAppointmentsForDay = (state, day) => {
  let arrApp = [];

  for (const dayObj of state.days) {
    if (dayObj.name === day) {
      const todayAppointmentList = dayObj.appointments;
      for (const appointment in state.appointments) {
        if (todayAppointmentList.includes(Number(appointment))) {
          arrApp.push(state.appointments[appointment]);
        }
      }
    }
  }

  return arrApp;
};

module.exports = getAppointmentsForDay;
