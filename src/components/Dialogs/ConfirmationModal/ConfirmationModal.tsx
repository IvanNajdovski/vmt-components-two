//@ts-nocheck
import React from "react";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { SimpleButton } from "../../Buttons/SimpleButton/SimpleButton";

export const ConfirmationModal = (props) => {
  const { cancelAction, confirmAction, cancelBtn, confirmBtn, modalTitle, modalText, cancelClass, confirmClass } = props;

  return (
    <Dialog title={modalTitle} onClose={cancelAction}>
      <p
        style={{
          margin: "25px",
          textAlign: "center",
        }}
      >
        {modalText}
      </p>
      <DialogActionsBar>
        <SimpleButton onClickHandler={cancelAction} label={cancelBtn} className={cancelClass} />
        <SimpleButton loading={props.loadingState} onClickHandler={confirmAction} label={confirmBtn} className={confirmClass} />
      </DialogActionsBar>
    </Dialog>
  );
};
