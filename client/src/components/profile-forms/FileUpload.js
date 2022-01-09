import React from "react";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import { connect } from "react-redux";
import AddExperience from "./AddExperience";

const FileUploadComponent = (props) => {
  const getUploadParams = () => {
    return { url: "https://httpbin.org/post" };
  };

  const handleChangeStatus = ({ meta }, status) => {
    console.log(status, meta);
  };

  const handleSubmit = (files, allFiles) => {
    console.log(files.map((f) => f.meta));
    allFiles.forEach((f) => f.remove());
  };

  return (
    <Dropzone
      name="image"
      onSubmit={handleSubmit}
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      styles={{ dropzone: { minHeight: 200, maxHeight: 250 } }}
    />
  );
};

export default FileUploadComponent;
