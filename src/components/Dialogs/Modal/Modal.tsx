//@ts-nocheck
import React from "react";
import ReactDOM from "react-dom";
import { SimpleButton } from "../../Buttons/SimpleButton/SimpleButton";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";

export const Modal = ({
  title,
  visible,
  width = null,
  height = null,
  onModalClose,
  onContinue,
  submitLoading = false,
  cancelLoading = false,
  cancelBtn = "Cancel",
  submitBtn = "Submit",
  confirmClass = "",
  cancelClass = "",
  ...props
}) => {
  const content = visible && (
    <Dialog className={"dialog-mh-90"} autoFocus title={title} width={width} height={height} onClose={onModalClose}>
      {props.children}
      <DialogActionsBar>
        <SimpleButton
          disabled={cancelLoading}
          cancelClass={cancelClass}
          confirmClass={confirmClass}
          loading={cancelLoading}
          onClickHandler={onModalClose}
          label={cancelBtn}
        />
        <SimpleButton
          onClickHandler={onContinue}
          type="submit"
          primary
          className={`text-capitalize`}
          disabled={submitLoading}
          loading={submitLoading}
          label={submitBtn}
        />
      </DialogActionsBar>
    </Dialog>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};
