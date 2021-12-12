export default function getInterviewersForDay(state, day) {
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
}
