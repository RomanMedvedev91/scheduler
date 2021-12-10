import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const daysData = props.days.map((el) => (
    <DayListItem
      key={el.id}
      {...el}
      selected={el.name === props.value}
      setDay={props.onChange}
    />
  ));
  return <ul>{daysData}</ul>;
}
