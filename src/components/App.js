import React, { Component } from "react";
import ScheduleWrap from "./ScheduleWrap";

import Styles from "./App.styles";

class App extends Component {
  state = {
    events: [],
    startTime: "2018-02-15T00:00:00",
    numberOfSlots: 18
  };

  componentWillMount = () => {
    // set to window
    window.setCalendarEvent = this.setCalendarEvent;
    window.configureCalendar = this.configureCalendar;
  };

  configureCalendar = config => {
    // config = { startTime: '', numberOfSlots: 10 }

    this.setState({
      ...this.state,
      ...config
    });
  };

  setCalendarEvent = arr => {
    // have the input arr take a human readable time
    const newArr = [...this.state.events, ...arr];
    this.setState({
      ...this.state,
      events: newArr.sort((a, b) => a.starts > b.starts)
    });
  };

  selectEventType = (type, pos) => {
    const { events } = this.state;
    const updatedEvents = events.map((e, i) => {
      const result = { ...e };
      if (pos === i) {
        result.label = type;
      }
      return result;
    });

    this.setState({
      ...this.state,
      events: updatedEvents
    });
  };

  removeEvent = key => {
    const { events } = this.state;
    const updatedEvents = events.filter((el, i) => i !== key);

    this.setState({
      ...this.state,
      events: updatedEvents
    });
  };

  render() {
    const { events, startTime, numberOfSlots } = this.state;

    if (!startTime || !numberOfSlots) {
      return "set up your calendar!";
    }

    return (
      <Styles>
        <h3>Click on a time to schedule an event!</h3>
        <ScheduleWrap
          events={events}
          startTime={startTime}
          numberOfSlots={numberOfSlots}
          removeEvent={this.removeEvent}
          setEvent={this.setCalendarEvent}
          selectType={this.selectEventType}
        />
      </Styles>
    );
  }
}

export default App;
