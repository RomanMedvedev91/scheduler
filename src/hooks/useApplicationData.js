import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const bookInterview = function (id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    //update database
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        const days = updateSpots(state, appointments, id);
        setState({ ...state, appointments, days });
      });
  };

  const cancelInterview = function (id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    //delete from datebase
    return axios.delete(`/api/appointments/${id}`).then((response) => {
      const days = updateSpots(state, appointments, id);
      setState({ ...state, appointments, days });
    });
  };

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
    spots: 2,
  });

  const setDay = (day) => setState({ ...state, day });

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

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
