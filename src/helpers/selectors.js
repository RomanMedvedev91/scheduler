export default function selectors() {
  const getAppointmentsForDay = function (state, day) {
    const amountAppointment = state.days.filter((el) => el.name === day);
    if (amountAppointment.length === 0) return [];
    const [{ appointments }] = amountAppointment;
    const filteredAppointment = appointments.map(
      (el) => state.appointments[el]
    );

    return filteredAppointment;
  };

  const getInterviewersForDay = function (state, day) {
    let arrApp = [];

    for (const dayObj of state.days) {
      if (dayObj.name === day) {
        const today = dayObj.interviewers;
        for (const interview of today) {
          if (state.interviewers[interview]) {
            arrApp.push(state.interviewers[interview]);
          }
        }
      }
    }
    return arrApp;
  };

  const getInterview = function (state, interview) {
    if (!interview) return null;
    let interviewObj = interview;
    const interviewerInfo = state.interviewers[interviewObj.interviewer];
    interviewObj.interviewer = { ...interviewerInfo };
    return interviewObj;
  };

  return {
    getAppointmentsForDay,
    getInterviewersForDay,
    getInterview,
  };
}
