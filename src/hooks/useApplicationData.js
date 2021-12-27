import { useEffect, useReducer } from "react";
import axios from "axios";

export default function useApplicationData() {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  const updateSpots = function (state, appointments, id) {
    //get day obj
    const mutatedState = JSON.parse(JSON.stringify(state));

    const obj = mutatedState.days.find(
      (dayObj) => dayObj.name === mutatedState.day
    );
    //count available spots for that day => appo[]
    let countSpot = 0;
    //check each app_id if interview is null
    for (const appoint_id of obj.appointments) {
      if (appointments[appoint_id].interview === null) {
        countSpot++;
      }
    }
    // add countedSpots to mutatedState
    for (const day in mutatedState.days) {
      if (mutatedState.days[day].id === obj.id) {
        mutatedState.days[day].spots = countSpot;
      }
    }
    // return days array
    return mutatedState.days;
  };

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY: {
        return { ...state, day: action.day };
      }

      case SET_APPLICATION_DATA: {
        return {
          ...state,
          days: action.days,
          appointments: action.appointments,
          interviewers: action.interviewers,
        };
      }

      case SET_INTERVIEW: {
        const appointment = {
          ...state.appointments[action.id],
          interview: action.interview ? { ...action.interview } : null,
        };
        const appointments = {
          ...state.appointments,
          [action.id]: appointment,
        };

        const days = updateSpots(state, appointments, action.id);

        return { ...state, appointments, days };
      }

      default: {
        throw new Error(
          `Tried to reduce with usupported action type: ${action.type}`
        );
      }
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
    spots: 2,
  });

  const setDay = (day) => dispatch({ type: "SET_DAY", day });

  const bookInterview = function (id, interview) {
    //update database
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        dispatch({ type: SET_INTERVIEW, id, interview });
      });
  };

  const cancelInterview = function (id) {
    //delete from datebase
    return axios.delete(`/api/appointments/${id}`).then((response) => {
      dispatch({ type: SET_INTERVIEW, id, interview: null });
    });
  };

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      dispatch({
        type: SET_APPLICATION_DATA,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      });
    });
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
