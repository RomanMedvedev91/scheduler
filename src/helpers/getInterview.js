export default function getInterview(state, interview) {
  if (interview === null) return null;
  let interviewObj = interview;
  const interviewerInfo = state.interviewers[interviewObj.interviewer];
  interviewObj.interviewer = { ...interviewerInfo };
  return interviewObj;
}
