import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteExperience } from "../../actions/profile";
import Moment from "react-moment";

// Timeline Imports
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { ReactComponent as SchoolIcon } from "./school.svg";
import "react-vertical-timeline-component/style.min.css";

const Timeline = ({ experience, deleteExperience }) => {
  let schoolIconStyles = { background: "#ecd76c" };
  return (
    <div>
      <VerticalTimeline lineColor={"#ffffffd0"}>
        {experience.map((element) => {
          return (
            <VerticalTimelineElement
              key={element._id}
              date={<Moment format="DD-MM-YYYY">{element.date}</Moment>}
              iconStyle={schoolIconStyles}
              icon={<SchoolIcon />}
            >
              <Link to={`/profile/experience/${element._id}`}>
                <img src={element.image} alt="Something"></img>
              </Link>
              <h3 className="vertical-timeline-element-title">
                {element.title}
              </h3>
              <h5 className="vertical-timeline-element-subtitle">
                {element.location}
              </h5>
              <p>{element.description}</p>
              <i
                onClick={() => deleteExperience(element._id)}
                className="far fa-trash-alt fa-2x"
              ></i>
            </VerticalTimelineElement>
          );
        })}
      </VerticalTimeline>
    </div>
  );
};

Timeline.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Timeline);
