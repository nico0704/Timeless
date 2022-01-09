import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Timeline Imports
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { ReactComponent as SchoolIcon } from "./school.svg";
import "react-vertical-timeline-component/style.min.css";

const Timeline = ({ experience }) => {
  let schoolIconStyles = { background: "#ecd76c" };
  return (
    <div>
      <VerticalTimeline lineColor={"#ffffffd0"}>
        {experience.map((element) => {
          return (
            <VerticalTimelineElement
              key={element._id}
              //date={element.date}
              iconStyle={schoolIconStyles}
              icon={<SchoolIcon />}
            >
              <img src={element.image} alt="Something"></img>
              <h3 className="vertical-timeline-element-title">
                {element.title}
              </h3>
              <h5 className="vertical-timeline-element-subtitle">
                {element.location}
              </h5>
              <p>{element.description}</p>
            </VerticalTimelineElement>
          );
        })}
      </VerticalTimeline>
    </div>
  );
};

Timeline.propTypes = {
  experience: PropTypes.array.isRequired,
};

export default connect(null)(Timeline);
