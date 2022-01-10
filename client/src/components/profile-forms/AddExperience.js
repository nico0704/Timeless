import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addExperience } from "../../actions/profile";
import { Link, withRouter } from "react-router-dom";

const AddExperience = ({ addExperience, history }) => {
  const [title, setTitle] = useState();
  const [date, setDate] = useState();
  const [location, setLocation] = useState();
  const [description, setDescription] = useState();
  const [tag, setTag] = useState();
  const [image, setImage] = useState();

  const send = (event) => {
    const data = new FormData();

    data.append("title", title);
    data.append("date", date);
    data.append("location", location);
    data.append("description", description);
    data.append("tag", tag);
    data.append("image", image);

    addExperience(data, history);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Add An Experience</h1>
      <small>* = required field</small>
      <form className="form" action="#">
        <div className="form-group">
          <input
            type="text"
            id="title"
            placeholder="Title"
            onChange={(event) => {
              const { value } = event.target;
              setTitle(value);
            }}
          />
        </div>
        <div className="form-group">
          <input
            type="date"
            id="date"
            onChange={(event) => {
              const { value } = event.target;
              setDate(value);
            }}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            id="location"
            placeholder="Location"
            onChange={(event) => {
              const { value } = event.target;
              setLocation(value);
            }}
          />
        </div>
        <div className="form-group">
          <textarea
            type="text"
            id="description"
            cols="30"
            rows="5"
            placeholder="Description"
            onChange={(event) => {
              const { value } = event.target;
              setDescription(value);
            }}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            id="tag"
            placeholder="Tag"
            onChange={(event) => {
              const { value } = event.target;
              setTag(value);
            }}
          />
        </div>
        <div className="form-group">
          <label className="custom-file-upload">
            <input
              type="file"
              id="image"
              accept=".jpg, .png, .jpeg"
              onChange={(event) => {
                const image = event.target.files[0];
                setImage(image);
              }}
            />
            <i className="fas fa-image"></i> Upload Image
          </label>
        </div>
      </form>
      <button className="btn btn-primary my-1" onClick={send}>
        Send
      </button>
      <Link className="btn btn-light my-1" to="/dashboard">
        Go Back
      </Link>
    </Fragment>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(withRouter(AddExperience));
