import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import axios from "axios";
import getAppointmentsForDay from "../helpers/getAppointmentsForDay";
import getInterview from "../helpers/getInterview";
import getInterviewersForDay from "../helpers/getInterviewersForDay";
import useApplicationData from "hooks/useApplicationData";

const dailyAppointmentsTEMP = [
  {
    id: 1,
    time: "12pm",
    interview: {
      student: "Archie Cohen",
      interviewer: {
        id: 10,
        name: "Samantha Stanic",
        avatar: "https://i.imgur.com/okB9WKC.jpg",
      },
    },
  },
  {
    id: 2,
    time: "1pm",
    interview: null,
  },
  {
    id: 3,
    time: "2pm",
    interview: null,
  },
  {
    id: 4,
    time: "3pm",
    interview: null,
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Chad Takahashi",
      interviewer: {
        id: 10,
        name: "Samantha Stanic",
        avatar: "https://i.imgur.com/okB9WKC.jpg",
      },
    },
  },
];

const interviewersTEMP = [
  {
    id: 1,
    name: "Sylvia Palmer",
    avatar: "https://i.imgur.com/LpaY82x.png",
  },
  {
    id: 2,
    name: "Tori Malcolm",
    avatar: "https://i.imgur.com/Nmx0Qxo.png",
  },
  {
    id: 3,
    name: "Mildred Nazir",
    avatar: "https://i.imgur.com/T2WwVfS.png",
  },
  {
    id: 5,
    name: "Sven Jones",
    avatar: "https://i.imgur.com/twYrpay.jpg",
  },
  {
    id: 10,
    name: "Samantha Stanic",
    avatar: "https://i.imgur.com/okB9WKC.jpg",
  },
];

export default function Application(props) {
  const { state, setDay, bookInterview, cancelInterview } =
    useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  return (
    <main className='layout'>
      <section className='sidebar'>
        <img
          className='sidebar--centered'
          src='images/logo.png'
          alt='Interview Scheduler'
        />
        <hr className='sidebar__separator sidebar--centered' />
        <nav className='sidebar__menu'>
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className='sidebar__lhl sidebar--centered'
          src='images/lhl.png'
          alt='Lighthouse Labs'
        />
      </section>
      <section className='schedule'>
        {schedule}
        <Appointment key='last' time='5pm' />
      </section>
    </main>
  );
}
