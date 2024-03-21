const httpGet = async (url) => {
  const data = await fetch(url);
  const result = await data.json();
  return result;
};

const httpPost = async (url, body) => {
  const status = document.querySelector(".postStatus");

  try {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    status.innerHTML = `Success: ${JSON.stringify(data)}`;
  } catch (error) {
    console.error("Error:", error);
    status.innerHTML = "Error: " + error;
  }
};

const httpPut = async (url, body) => {
  const status = document.querySelector(".putStatus");

  try {
    let response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    status.innerHTML = `Success: ${JSON.stringify(data)}`;
  } catch (error) {
    status.innerHTML = "Error: " + error;
  }
};

const httpDelete = async (url) => {
  const status = document.querySelector(".deleteStatus");

  try {
    let response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    status.innerHTML += `<p>Delete Sucessfully: ${JSON.stringify(data)}</p>`;
  } catch (error) {
    status.innerHTML = error;
  }
};

const clearDisplays = () => {
  const getDisplay = document.querySelector(".getDisplay");
  const postDisplay = document.querySelector(".postDisplay");
  const putDisplay = document.querySelector(".putDisplay");
  const deleteDisplay = document.querySelector(".deleteDisplay");

  getDisplay.style.display = "none";
  postDisplay.style.display = "none";
  putDisplay.style.display = "none";
  deleteDisplay.style.display = "none";
};

const clearUserInputs = (methodDisplay) => {
  const idInput = methodDisplay.querySelector(".id");
  idInput.value = "";
  try {
    const emailInput = methodDisplay.querySelector(".email");
    const passwordInput = methodDisplay.querySelector(".password");
    emailInput.value = "";
    passwordInput.value = "";
  } catch {}
};

const getButton = document.querySelector(".getButton");
getButton.addEventListener("click", async () => {
  clearDisplays();

  const getByIdInput = document.querySelector(".getById");
  getByIdInput.value = "";

  const getDisplay = document.querySelector(".getDisplay");
  getDisplay.style.display = "inline-block";
  const result = await httpGet(
    "https://65f001c5ead08fa78a516efe.mockapi.io/api/v1/users"
  );

  const main_table = document.querySelector(".mainDisplay table");

  for (let i = main_table.rows.length - 1; i > 0; i--) {
    main_table.deleteRow(i);
  }

  result.forEach((user) => {
    const row = main_table.insertRow(-1);
    row.insertCell(0).innerHTML = user.id;
    row.insertCell(1).innerHTML = user.email;
    row.insertCell(2).innerHTML = user.password;
  });
});

const getByIdButton = document.querySelector(".getByIdButton");
getByIdButton.addEventListener("click", async () => {
  const main_table = document.querySelector(".mainDisplay table");
  for (let i = main_table.rows.length - 1; i > 0; i--) {
    main_table.deleteRow(i);
  }

  let user;
  const IDset = new Set(document.querySelector(".getById").value.split(","));
  let IDs = [];

  IDset.forEach((id) => {
    if (id.trim() != "") {
      IDs.push(id.trim());
    }
  });

  IDs = IDs.sort((a, b) => Number(a) > Number(b));
  IDs.forEach(async (BigId) => {
    user = await httpGet(
      `https://65f001c5ead08fa78a516efe.mockapi.io/api/v1/users/${BigId.trim()}`
    );

    if (user != "Not found") {
      const row = main_table.insertRow(-1);
      row.insertCell(0).innerHTML = user.id;
      row.insertCell(1).innerHTML = user.email;
      row.insertCell(2).innerHTML = user.password;
    }
  });
});

const postDisplayButton = document.querySelector(".postDisplayButton");
postDisplayButton.addEventListener("click", async () => {
  clearDisplays();
  clearUserInputs(document.querySelector(".postDisplay"));

  const status = document.querySelector(".postDisplay .postStatus");
  status.innerHTML = "";

  const postDisplay = document.querySelector(".postDisplay");
  postDisplay.style.display = "inline-block";
});

const postButton = document.querySelector(".postButton");
postButton.addEventListener("click", async () => {
  const id = document.querySelector(".id").value;
  const email = document.querySelector(".email").value;
  const password = document.querySelector(".password").value;

  await httpPost("https://65f001c5ead08fa78a516efe.mockapi.io/api/v1/users", {
    id: id,
    email: email,
    password: password,
  });
});

const putDisplayButton = document.querySelector(".putDisplayButton");
putDisplayButton.addEventListener("click", async () => {
  clearDisplays();
  clearUserInputs(document.querySelector(".putDisplay"));

  const status = document.querySelector(".putDisplay .putStatus");
  status.innerHTML = "";

  const putDisplay = document.querySelector(".putDisplay");
  putDisplay.style.display = "inline-block";
});

const putButton = document.querySelector(".putButton");
putButton.addEventListener("click", async () => {
  const putForm = document.querySelector(".putForm");

  const id = putForm.querySelector(".id").value;
  const email = putForm.querySelector(".email").value;
  const password = putForm.querySelector(".password").value;

  await httpPut(
    `https://65f001c5ead08fa78a516efe.mockapi.io/api/v1/users/${id}`,
    {
      email: email,
      password: password,
    }
  );
});

const deleteDisplayButton = document.querySelector(".deleteDisplayButton");
deleteDisplayButton.addEventListener("click", async () => {
  clearDisplays();
  clearUserInputs(document.querySelector(".deleteDisplay"));
  const deleteDisplay = document.querySelector(".deleteDisplay");
  deleteDisplay.style.display = "inline-block";
});

const deleteButton = document.querySelector(".deleteButton");
deleteButton.addEventListener("click", async () => {
  const id = document.querySelector(".deleteDisplay .id").value.split(",");
  const IDset = new Set(id);
  let IDs = [];

  IDset.forEach((id) => {
    if (id.trim() != "") {
      IDs.push(id.trim());
    }
  });

  IDs = IDs.sort((a, b) => Number(a) > Number(b));

  const deleteStatus = document.querySelector(
    ".deleteDisplay .deleteStatus"
  );
  deleteStatus.innerHTML = "";
  IDs.forEach(async (id) => {
    await httpDelete(
      `https://65f001c5ead08fa78a516efe.mockapi.io/api/v1/users/${id}`
    );
  });
});

const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", () => {
  clearDisplays();
});

const logOutButton = document.querySelector(".logInReturn");
logOutButton.addEventListener("click", () => {
  window.location.href = "../pages/login.html";
});