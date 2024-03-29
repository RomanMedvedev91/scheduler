import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const formatSpots = (spots) => {
    if (spots === 0) {
      return "no spots remaining";
    }
    if (spots === 1) {
      return `${spots} spot remaining`;
    }
    return `${spots} spots remaining`;
  };
  const liClass = classNames("day-list__item", {
    " day-list__item--selected": props.selected,
    " day-list__item--full": props.spots === 0,
  });
  return (
    <li
      onClick={() => props.setDay(props.name)}
      className={liClass}
      selected={props.selected}
      data-testid={"day"}
    >
      <h2 className='text--regular'>{props.name}</h2>
      <h3 className='text--light'>{formatSpots(props.spots)}</h3>
    </li>
  );
}
