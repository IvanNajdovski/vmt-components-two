export const validateInputs = (element) => {
  const editInputs = element.querySelectorAll("select,input");
  const inputsArray: HTMLInputElement[] = Array.from(editInputs);
  if (!inputsArray.every((val) => val.checkValidity())) {
    const invalidInput = inputsArray.find((val) => !val.checkValidity());
    invalidInput.reportValidity();
    return false;
  } else {
    return true;
  }
};

export const validateDateInputs = (element, state) => {
  const dateInputs = element.current.querySelectorAll(".k-dateinput");
  return Array.from(dateInputs).some((val: HTMLElement) => {
    const input = val.querySelector("input");
    if (input.getAttribute("value") !== "day/month/year" && state[input.getAttribute("name")] == null) {
      input.setCustomValidity("Please enter a valid date");
      input.reportValidity();
      return true;
    }
  });
};
