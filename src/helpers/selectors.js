const getAppointmentsForDay = function (state, day) {
  const amountAppointment = state.days.filter((el) => el.name === day);
  if (amountAppointment.length === 0) return [];
  const [{ appointments }] = amountAppointment;
  const filteredAppointment = appointments.map((el) => state.appointments[el]);

  return filteredAppointment;
};

module.exports = { getAppointmentsForDay };
