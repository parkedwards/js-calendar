import React, { Component } from "react";
import moment from "moment";

import Styles from "./Grid.styles";

class Grid extends Component {
  // dynamically generate time slots based on init config
  renderSlots = () => {
    const { startTime, numberOfSlots, setEvent } = this.props;
    const slotComponents = [];

    for (let i = 0; i <= numberOfSlots; i++) {
      const formattedTime = moment(startTime).add(i, "hour");

      // event type not yet defined - user will have option to do so
      const penciledEvent = {
        starts: formattedTime.format(),
        contentId: null,
        label: ""
      };

      slotComponents.push(
        <div className="time-slot" key={i}>
          <span onClick={() => setEvent([penciledEvent])}>
            {formattedTime.format("LT")}
          </span>
        </div>
      );
    }
    return slotComponents;
  };

  render() {
    return <Styles>{this.renderSlots()}</Styles>;
  }
}

export default Grid;
