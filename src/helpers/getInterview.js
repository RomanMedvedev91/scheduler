const getInterview = (state, interview) => {
  if (interview === null) return null;
  let interviewObj = interview;
  const interviewerInfo = state.interviewers[interviewObj.interviewer];
  interviewObj.interviewer = { ...interviewerInfo };
  console.log(interviewObj);
  return interviewObj;
};

module.exports = getInterview;
