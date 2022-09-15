import React from "react";
import DayListItem from "./DayListItem";

// Component function //
export default function DayList(props) {

  const DayListItems = props.days.map(day => {
    return <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.value}
      setDay={() => props.onChange(day.name)} />
  });

 // Daylist component //
  return (
    <ul>
      {DayListItems}
    </ul>
  );
}