function Validator(options) {
  let formElement = document.querySelector(options.form);
  if (formElement) {
    options.rules.forEach((rule) => {
      let inputElement = formElement.querySelector(rule.selector);
      let errorElement =
        inputElement.parentElement.querySelector(".form-message");
      if (inputElement) {
        inputElement.onblur = function () {
          let errorMessage = rule.test(inputElement.value);
          console.log(errorMessage);
          if (errorMessage) {
            errorElement.innerText = errorMessage;
          } else {
            
          }
        };
      }
    });
  }
}

Validator.isRequired = function (selector) {
  return {
    selector,
    test: function (value) {
      return value.trim() ? undefined : "Vui lòng nhập trường này!";
    },
  };
};

Validator.isEmail = function (selector) {
  return {
    selector,
    test,
  };
};
