import React, { Component } from "react";
import Moment from "moment";
import { extendMoment } from "moment-range";
import Styles, { EventBlock, TypeBtn } from "./EventContainer.styles";

import { eventColors } from "../constants";

const moment = extendMoment(Moment);

class EventContainer extends Component {
  // clean this up - super hacky
  addPositionAndCount = events => {
    const eventProps = events.map(obj => ({ ...obj }));
    return eventProps.map((ev, ind) => {
      const newEv = { ...ev };
      if (!newEv.position) {
        let position = 1;
        let count = { val: 1 }; // need to store obj by reference :(

        const start = moment(newEv.starts);
        const end = moment(newEv.starts).add(4, "h");
        const range = moment.range(start, end);

        for (let i = 0; i < eventProps.length; i++) {
          if (ind !== i) {
            const compareStart = eventProps[i].starts;

            // this block mutates event data further down the list
            // if that event is flagged as within range (collision)
            if (range.contains(moment(compareStart), { exclusive: false })) {
              position += 1;
              count.val += 1;
              eventProps[i].position = position;
              eventProps[i].count = count;
            }
          }
        }

        // this will set the position + count values on the FIRST event in a group
        return {
          ...ev,
          position: 1,
          count: count
        };
      }

      return ev;
    });
  };

  // returns array of <EventBlock /> components based on this.state.events
  renderEvents = () => {
    const { events, startTime, numberOfSlots, removeEvent } = this.props;

    const newEvents = this.addPositionAndCount(events);

    return newEvents.map((event, i) => {
      const end = moment(event.starts);
      const duration = moment.duration(end.diff(startTime));
      const hourDelta = duration.asHours();

      return (
        <EventBlock
          hourDelta={hourDelta}
          numberOfSlots={numberOfSlots}
          type={event.label}
          position={event.position}
          count={event.count}
          key={i}
        >
          {event.label ? (
            <div className="type-label">{event.label}</div>
          ) : (
            <div className="type-selector">{this.renderBtns(i)}</div>
          )}
          <i className="material-icons" onClick={() => removeEvent(i)}>
            close
          </i>
        </EventBlock>
      );
    });
  };

  renderBtns = pos => {
    const types = Object.keys(eventColors);
    const { selectType } = this.props;
    return types.map(t => (
      <TypeBtn key={t} type={t} onClick={e => selectType(t, pos)}>
        {t}
      </TypeBtn>
    ));
  };

  render() {
    const { events } = this.props;
    return <Styles>{this.renderEvents()}</Styles>;
  }
}

export default EventContainer;
