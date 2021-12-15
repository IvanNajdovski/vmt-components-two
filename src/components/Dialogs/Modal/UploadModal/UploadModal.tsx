//@ts-nocheck
import React from "react";
import { Upload } from "@progress/kendo-react-upload";

export const UploadModal = (props) => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const onUploadStatus = (e) => {
    if (e.response) {
      if (e.response.status === 200) {
        props.uploadResponseHandler(e.response.response);
        props.onCloseModalHandler();
      } else if (e.response.response.status > 300) {
        props.uploadResponseHandler(e.response.response);
      }
    }
  };

  return (
    <Upload
      ref={props.formRef}
      className="my-3 quick-import-upload"
      showActionButtons={false}
      batch={false}
      multiple={false}
      autoUpload={false}
      defaultFiles={[]}
      withCredentials={false}
      saveField="file"
      accept={".xlsx"}
      saveUrl={props.uploadUrl}
      onStatusChange={onUploadStatus}
      saveHeaders={{
        Authorization: `Bearer ${token}`,
      }}
    />
  );
};

export default UploadModal;
