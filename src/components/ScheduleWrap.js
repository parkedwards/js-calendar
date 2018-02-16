import React, { Component } from "react";
import Grid from "./Grid";
import EventContainer from "./EventContainer";

import Styles from "./ScheduleWrap.styles";

class ScheduleWrap extends Component {
  render() {
    const {
      events,
      startTime,
      numberOfSlots,
      removeEvent,
      setEvent,
      selectType
    } = this.props;
    return (
      <Styles>
        <Grid startTime={startTime} numberOfSlots={numberOfSlots} setEvent={setEvent} />
        <EventContainer
          events={events}
          startTime={startTime}
          numberOfSlots={numberOfSlots}
          removeEvent={removeEvent}
          selectType={selectType}
        />
      </Styles>
    );
  }
}

export default ScheduleWrap;
