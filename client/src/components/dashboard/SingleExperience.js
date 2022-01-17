import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getExperience } from "../../actions/profile";
import { useParams } from "react-router-dom";

// Map through the experience array and get experience by params id and then display it...

const SingleExperience = (props) => {
  console.log(props.profile);
  const { id } = useParams();
  useEffect(() => {
    props.getExperience(id);
  }, [props.getExperience, id]);
  return (
    <section className="container">
      <h1>Hello</h1>
    </section>
  );
};

SingleExperience.propTypes = {
  profile: PropTypes.object.isRequired,
  getExperience: PropTypes.func.isRequired,
  experience: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getExperience })(SingleExperience);
