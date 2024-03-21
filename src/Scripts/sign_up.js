const authenticateEmail = () => {
  const authentication_status = document.querySelector(
    ".email_box .authentication_status"
  );
  const emailInput = document.querySelector(".email");
  const email = emailInput.value;

  // Check if email is given
  if (email === "") {
    authentication_status.textContent = "Email is not given";
    return false;
  }

  // Check if email is valid
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailRegex.test(email)) {
    authentication_status.textContent = "Invalid email";
    return false;
  }

  authentication_status.textContent = "";
  return true;
};

const authenticatePassword = () => {
  const authentication_status = document.querySelector(
    ".password_box .authentication_status"
  );
  const passwordInput = document.querySelector(".password");
  const password = passwordInput.value;

  // Check if password is given
  if (password === "") {
    authentication_status.textContent = "Password is not given";
    return false;
  }

  if (password.length < 8) {
    authentication_status.textContent =
      "Password must be at least 8 characters long";
  }

  let checkNumber = false;
  let checkUpper = false;
  let checkLower = false;
  let checkSpecial = false;

  for (let i = 0; i < password.length; i++) {
    if (checkNumber && checkUpper && checkLower && checkSpecial) {
      break;
    }
    if (password[i] >= "0" && password[i] <= "9") {
      checkNumber = true;
    } else if (password[i] >= "A" && password[i] <= "Z") {
      checkUpper = true;
    } else if (password[i] >= "a" && password[i] <= "z") {
      checkLower = true;
    } else {
      checkSpecial = true;
    }
  }

  if (!checkNumber || !checkUpper || !checkLower || !checkSpecial) {
    authentication_status.textContent =
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
    return false;
  }

  authentication_status.textContent = "";
  return true;
};

const authenticateRepeatPassword = () => {
  const authentication_status = document.querySelector(
    ".repeat_password_box .authentication_status"
  );
  const passwordInput = document.querySelector(".password");
  const password = passwordInput.value;
  const repeatPasswordInput = document.querySelector(".repeat_password");
  const repeatPassword = repeatPasswordInput.value;

  // Check if repeat password is given
  if (repeatPassword === "") {
    authentication_status.textContent = "Repeat password is not given";
    return false;
  }

  // Check if repeat password is the same as password
  if (repeatPassword !== password) {
    authentication_status.textContent =
      "Repeat password does not match password";
    return false;
  }

  authentication_status.textContent = "";
  return true;
};

const dbLookUp = (email) => {
  const user = localStorage.getItem(email);
  if (user === null) {
    return false;
  }
  else{
    return true;
  }
};

const button = document.querySelector("button");
button.addEventListener("click", () => {
  const email_auth = authenticateEmail();
  const password_auth = authenticatePassword();
  const repeat_password_auth = authenticateRepeatPassword();

  if (email_auth && password_auth && repeat_password_auth) {
    const check  = dbLookUp(document.querySelector(".email").value);
    if(check){
      const authentication_status = document.querySelector(
        ".email_box .authentication_status"
      );
      const emailBox = document.querySelector(".email");
      const warn = document.querySelector(".fa-triangle-exclamation");
      authentication_status.innerHTML = "Email already exists";
      authentication_status.style.color = "red";
      emailBox.classList.add("input_error");
      warn.style.opacity = 1;
    }
    else{
      localStorage.setItem(
        document.querySelector(".email").value,
        document.querySelector(".password").value
      );
      window.location.href = "login.html";
    }
    
  }
});

const emailInput = document.querySelector(".email");
emailInput.addEventListener("input", () => {
  const authentication_status = document.querySelector(
    ".email_box .authentication_status"
  );
  const emailBox = document.querySelector(".email");
  const warn = document.querySelector(".fa-triangle-exclamation");

  if (emailInput.value == "") {
    authentication_status.innerHTML = "This field is required";
    authentication_status.style.color = "red";
    emailBox.classList.add("input_error");
    warn.style.opacity = 1;
  } else {
    const emailAuthenticate = authenticateEmail();
    if (emailAuthenticate) {
      authentication_status.innerHTML = "";
      emailBox.classList.remove("input_error");
      warn.style.opacity = 0;
    }
  }
});

const passwordEyeContainer = document.querySelector(".password_box .eye_container");
passwordEyeContainer.addEventListener("click", () => {
  const passwordInput = document.querySelector(".password");
  const eye = passwordEyeContainer.querySelector(".fa-eye");
  const eye_slash = passwordEyeContainer.querySelector(".fa-eye-slash");
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    eye.style.opacity = 0;
    eye_slash.style.opacity = 1;
  } else {
    passwordInput.type = "password";
    eye.style.opacity = 1;
    eye_slash.style.opacity = 0;
  }
});

const repeatPasswordEyeContainer = document.querySelector(".repeat_password_box .eye_container");
repeatPasswordEyeContainer.addEventListener("click", () => {
  const repeatPasswordInput = document.querySelector(".repeat_password");
  const eye = repeatPasswordEyeContainer.querySelector(".fa-eye");
  const eye_slash = repeatPasswordEyeContainer.querySelector(".fa-eye-slash");
  if (repeatPasswordInput.type === "password") {
    repeatPasswordInput.type = "text";
    eye.style.opacity = 0;
    eye_slash.style.opacity = 1;
  } else {
    repeatPasswordInput.type = "password";
    eye.style.opacity = 1;
    eye_slash.style.opacity = 0;
  }
});

const passwordInput = document.querySelector(".password");
passwordInput.addEventListener("input", () => {
  const authentication_status = document.querySelector(
    ".password_box .authentication_status"
  );
  const passwordBox = document.querySelector(".password");
  const warn = document.querySelector(".password_box .fa-triangle-exclamation");

  if (passwordInput.value == "") {
    authentication_status.innerHTML = "This field is required";
    authentication_status.style.color = "red";
    passwordBox.classList.add("input_error");
    warn.style.opacity = 1;
  } else {
    const passwordAuthenticate = authenticatePassword();
    if (passwordAuthenticate) {
      authentication_status.innerHTML = "";
      passwordBox.classList.remove("input_error");
      warn.style.opacity = 0;
    }
  }
});

const repeatPasswordInput = document.querySelector(".repeat_password");
repeatPasswordInput.addEventListener("input", () => {
  const authentication_status = document.querySelector(
    ".repeat_password_box .authentication_status"
  );
  const repeatPasswordBox = document.querySelector(".repeat_password");
  const warn = document.querySelector(".repeat_password_box .fa-triangle-exclamation");

  if (repeatPasswordInput.value == "") {
    authentication_status.innerHTML = "This field is required";
    authentication_status.style.color = "red";
    repeatPasswordBox.classList.add("input_error");
    warn.style.opacity = 1;
  } else {
    const repeatPasswordAuthenticate = authenticateRepeatPassword();
    if (repeatPasswordAuthenticate) {
      authentication_status.innerHTML = "";
      repeatPasswordBox.classList.remove("input_error");
      warn.style.opacity = 0;
    }
  }
});