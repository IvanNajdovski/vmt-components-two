//@ts-nocheck
import React, { useMemo } from "react";
import { Input } from "@progress/kendo-react-inputs";
import { Editor, EditorTools, EditorUtils } from "@progress/kendo-react-editor";
const { Bold, Italic, Underline, Strikethrough } = EditorTools;

export const SendEmail = (props) => {
  const onInputChange = (e, inputName?) => {
    const name = inputName || e.target.name;

    props.onChangeModalData((prevData) => ({ ...prevData, [name]: inputName ? e.html : e.value }));
  };

  const validMultiEmailInput = useMemo(() => {
    const regex = /([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25}/;
    return props.modalData.recipient && props.modalData.recipient.split(",").every((email) => regex.test(email.trim()));
  }, [props.modalData.recipient]);

  return (
    <React.Fragment>
      <form ref={props.formRef}>
        <fieldset>
          <legend>Notice for Rate Mod: {props.modalData && props.modalData.rateModId}</legend>
          <div className="col-lg-24">
            <div className="input-group mb-2">
              <Input
                label="Send to"
                name="recipient"
                className="w-100"
                validationMessage="Please enter a valid value"
                valid={validMultiEmailInput}
                value={props.modalData && props.modalData.recipient}
                onChange={onInputChange}
              />
            </div>
          </div>
          <div className="col-lg-24">
            <div className="input-group mb-2">
              <Input label="Subject" name="subject" className="w-100" value={props.modalData && props.modalData.subject} onChange={onInputChange} />
            </div>
          </div>
          <div className="col-lg-24">
            <div className="input-group mb-2">
              <Editor
                // tools={[Bold, Italic, Underline, Strikethrough]}
                className={"mt-3 w-100"}
                value={props.modalData && props.modalData.message}
                onChange={(e) => onInputChange(e, "message")}
                contentStyle={{ fontSize: "1rem", height: 200 }}
              />
            </div>
          </div>
          <div className="col-lg-24">
            <div className="mt-3">
              <i className="fas fa-paperclip mr-2"></i>
              Attachment:{" "}
              {props.modalData &&
                props.modalData.attachments &&
                Array.isArray(props.modalData.attachments) &&
                props.modalData.attachments.map((val) => val.filename).join(" ,")}
            </div>
          </div>
        </fieldset>
      </form>
    </React.Fragment>
  );
};
