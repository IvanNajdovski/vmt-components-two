//@ts-nocheck
import { useState, useCallback, useRef } from "react";

export const useModal = (state) => {
  const formRef = useRef<HTMLFormElement>();
  const submit = useRef(null);
  const cancel = useRef(null);
  const [modalSumbitLoading, setModalSubmitLoading] = useState(false);
  const [modalCancelLoading, setModalCancelLoading] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [modalOptions, setModalOptions] = useState(null);
  const [modalContentOptions, setModalContentOptions] = useState(null);
  const [modalOpen, setModalOpen] = useState(state);

  const onModalOpen = useCallback(({ modalData, modalOptions, modalContent, modalSubmitAction, modalCancelAction }) => {
    setModalData(modalData);
    setModalOptions(modalOptions);
    setModalContentOptions(modalContent);
    submit.current = modalSubmitAction;
    cancel.current = modalCancelAction;
    setModalOpen(true);
  }, []);

  const onClose = useCallback(async () => {
    setModalOpen(false);
    setModalContentOptions(null);
    setModalOptions(null);
    setModalData(null);
    submit.current = null;
    cancel.current = null;
  }, [modalData]);

  const onModalClose = useCallback(() => {
    if (cancel.current) {
      cancel.current();
    }
    onClose();
  }, [cancel]);

  const onSubmit = (e?: any) => {
    e && e.preventDefault();
    submit.current && submit.current(modalData);
    onClose();
  };

  const onUpload = () => formRef.current.onUpload();

  const onModalSubmit = useCallback(() => {
    if (formRef.current && formRef.current.requestSubmit) {
      formRef.current.addEventListener("submit", onSubmit, false);
      formRef.current.requestSubmit();
    } else if (formRef.current && formRef.current.onUpload) {
      onUpload();
    } else {
      onSubmit();
    }
  }, [onSubmit, formRef.current, submit.current]);

  return {
    modalData,
    modalOpen,
    modalOptions,
    modalSumbitLoading,
    modalCancelLoading,
    modalContentOptions,
    onModalOpen,
    onModalClose,
    onModalSubmit,
    onSubmit,
    setModalData,
    formRef,
  };
};
