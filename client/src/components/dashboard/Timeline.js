import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";

const Timeline = ({ experience }) => {
  const experiences = experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.title}</td>
      <td>
        <Moment format="YYYY/MM/DD">{exp.date}</Moment>
      </td>
      <td>{exp.location}</td>
      <td>{exp.description}</td>
    </tr>
  ));

  return (
    <Fragment>
      <table className="table">
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

Timeline.propTypes = {
  experience: PropTypes.array.isRequired,
};

export default connect(null)(Timeline);
