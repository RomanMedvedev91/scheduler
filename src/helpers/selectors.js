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
    const validDayNames = state.days.map((dayObj) => dayObj.name);
    if (!day || !validDayNames.includes(day)) return [];

    const todayObj = state.days.filter((dayObj) => dayObj.name === day)[0];
    const interviewersObj = todayObj.interviewers.map(
      (interId) => state.interviewers[interId]
    );
    return interviewersObj;
  };

  const getInterview = function (state, interview) {
    if (!interview) return null;
    let interviewObj = { ...interview };
    const interviewerInfo = state.interviewers[interview.interviewer];
    interviewObj.interviewer = { ...interviewerInfo };
    return interviewObj;
  };

  return {
    getAppointmentsForDay,
    getInterviewersForDay,
    getInterview,
  };
}
