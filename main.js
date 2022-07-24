function Validator(options) {
  function validate(inputElement, rule) {
    let errorElement = inputElement.parentElement.querySelector(
      options.errorSelector
    );
    let errorMessage = rule.test(inputElement.value);
    if (errorMessage) {
      errorElement.innerText = errorMessage;
      inputElement.parentElement.classList.add("invalid");
    } else {
      errorElement.innerText = "";
      inputElement.parentElement.classList.remove("invalid");
    }
  }
  let formElement = document.querySelector(options.form);
  if (formElement) {
    options.rules.forEach((rule) => {
      let inputElement = formElement.querySelector(rule.selector);
      if (inputElement) {
        // Xu ly truong hop blur khoi input
        inputElement.onblur = function () {
          validate(inputElement, rule);
        };

        // Xu ly moi khi nguoi dung nhap vao input
        inputElement.oninput = function () {
          let errorElement = inputElement.parentElement.querySelector(
            options.errorSelector
          );
          errorElement.innerText = "";
          inputElement.parentElement.classList.remove("invalid");
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
    test: function (value) {
      const regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(value) ? undefined : "Trường này phải là email!";
    },
  };
};

Validator.isLength = function (selector, minLength, maxLength) {
  return {
    selector,
    test: function (value) {
      return (value.trim().length >= minLength) &
        (value.trim().length <= maxLength)
        ? undefined
        : `Trường này có số ký tự từ ${minLength} - ${maxLength}`;
    },
  };
};
