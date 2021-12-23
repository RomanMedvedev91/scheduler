export default function getInterview(state, interview) {
  if (!interview) return null;
  let interviewObj = interview;
  const interviewerInfo = state.interviewers[interviewObj.interviewer];
  interviewObj.interviewer = { ...interviewerInfo };
  return interviewObj;
}
