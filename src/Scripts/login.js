const authenticateEmail = () => {
  const authentication_status = document.querySelector(
    ".email_box .authentication_status"
  );
  const emailInput = document.querySelector(".email");
  const email = emailInput.value;
  const warn = document.querySelector(".email_box .fa-triangle-exclamation");

  // Check if email is given
  if (email === "") {
    authentication_status.textContent = "This field is required";
    warn.classList.add("warn_toggle");
    return false;
  }

  // Check if email is valid
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailRegex.test(email)) {
    authentication_status.textContent = "Please enter a valid email address";
    warn.classList.add("warn_toggle");
    return false;
  }

  authentication_status.textContent = "";
  if (warn.classList.contains("warn_toggle")) {
    warn.classList.remove("warn_toggle");
  }
  return true;
};

const authenticatePassword = () => {
  const authentication_status = document.querySelector(
    ".password_box .authentication_status"
  );
  const passwordInput = document.querySelector(".password");
  const password = passwordInput.value;
  const warn = document.querySelector(".password_box .fa-triangle-exclamation");

  // Check if password is given
  if (password === "") {
    authentication_status.textContent = "Password is not given";
    warn.classList.add("warn-toggle");
    return false;
  }

  authentication_status.textContent = "";
  if (warn.classList.contains("warn-toggle")) {
    warn.classList.remove("warn-toggle");
  }
  return true;
};

const colorAuthenticateBox = (box) => {
  const box_input = box.querySelector("input");
  const box_status = box.querySelector(".authentication_status");

  if (box_status.textContent) {
    box_input.classList.add("input_error");
  } else {
    box_input.classList.remove("input_error");
  }
};

const validatingAccount = (email, password) => {
  if (localStorage.getItem(email) === password) {
    return true;
  } else {
    const authentication_status = document.querySelector(
      ".password_box .authentication_status"
    );
    authentication_status.textContent = "Invalid email or password";
    return false;
  }
};

const button = document.querySelector("button");
button.addEventListener("click", () => {
  const email_auth = authenticateEmail();
  const password_auth = authenticatePassword();

  let validation = false;

  if (email_auth && password_auth) {
    let emailInput = document.querySelector(".email");
    let passwordInput = document.querySelector(".password");
    validation = validatingAccount(emailInput.value, passwordInput.value);
  }

  if (validation) {
    window.location.href = "home_page.html";
  }
});

const emailInput = document.querySelector(".email");
emailInput.addEventListener("input", () => {
  colorAuthenticateBox(document.querySelector(".email_box"));
});

const passwordInput = document.querySelector(".password");
passwordInput.addEventListener("input", () => {
  const password = passwordInput.value;
  if (password == "") {
    passwordInput.classList.add("input_error");
    document.querySelector(".password_box .authentication_status").textContent =
      "This field is required";
    const warn = document.querySelector(".password_box .fa-triangle-exclamation");
    warn.classList.add("warn_toggle");
  } else {
    passwordInput.classList.remove("input_error");
    const warn = document.querySelector(".password_box .fa-triangle-exclamation");
    warn.classList.remove("warn_toggle")
  }
});

const eye_container = document.querySelector(".eye_container");
eye_container.addEventListener("click", () => {
  const eye = document.querySelector(".fa-eye");
  const eye_slash = document.querySelector(".fa-eye-slash");

  eye.classList.toggle("eye-toggle");
  eye_slash.classList.toggle("eye-toggle");

  const passwordInput = document.querySelector(".password");
  if (eye.classList.contains("eye-toggle")) {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
});
