const SERVER = process.env.REACT_APP_SERVER;

const getUsers = async (page) => {
  try {
    let response = await fetch(`${SERVER}/user/all?page=${page}&limit=${1}`);

    if (response.status === 401) {
      throw new Error("You are not authorized");
    }

    if (!response.ok) {
      throw new Error("Failed");
    }

    let data = await response.json();

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const inviteUser = async (formData) => {
  let body = {};
  formData.forEach((value, key) => {
    body[key] = value;
  });

  try {
    let response = await fetch(`${SERVER}/user/register`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 401) {
      throw new Error("You are not authorized");
    }

    if (response.status === 400) {
      throw new Error("User already exist");
    }

    if (!response.ok) {
      throw new Error("Failed");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateUser = async (formData, id) => {
  let body = {};
  formData.forEach((value, key) => {
    body[key] = value;
  });

  try {
    let response = await fetch(`${SERVER}/user/edit/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 401) {
      throw new Error("You are not authorized");
    }

    if (!response.ok) {
      throw new Error("Failed");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteUser = async (id) => {
  try {
    let response = await fetch(`${SERVER}/user/remove/${id}`, {
      method: "DELETE",
    });

    if (response.status === 401) {
      throw new Error("You are not authorized");
    }

    if (!response.ok) {
      throw new Error("Failed");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export { getUsers, inviteUser, updateUser, deleteUser };
