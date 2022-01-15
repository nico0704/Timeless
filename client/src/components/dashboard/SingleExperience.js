import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getExperience } from "../../actions/profile";
import { useParams } from "react-router-dom";

const SingleExperience = (props) => {
  console.log(props);
  const { id } = useParams();
  useEffect(() => {
    props.getExperience(id);
  }, [getExperience, id]);
  return (
    <section className="container">
      <h1>Hello</h1>
    </section>
  );
};

SingleExperience.propTypes = {
  getExperience: PropTypes.func.isRequired,
  experience: PropTypes.object,
};

const mapStateToProps = (state) => ({
  experience: state.experience,
});

export default connect(mapStateToProps, { getExperience })(SingleExperience);
