const SERVER = process.env.REACT_APP_SERVER;

const getItems = async (page, limit) => {
  try {
    let response = await fetch(
      `${SERVER}/items/all?page=${page}&limit=${limit}`,
      { method: "GET" }
    );

    if (response.status === 401) {
      throw new Error("You are not authorized to access this page");
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

const addItem = async (payload) => {
  if (!payload) {
    throw new Error("Payload not found");
  }

  try {
    let response = await fetch(`${SERVER}/items/add`, {
      method: "POST",
      body: payload,
    });

    if (response.status === 401) {
      throw new Error("You are not authorized");
    }

    if (!response.ok) {
      let { message, error } = await response.json();
      throw new Error(message || error);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const getItemById = async (id) => {
  try {
    let response = await fetch(`${SERVER}/items/details/${id}`);

    if (response.status === 401) {
      throw new Error("You are not authorized to access this page");
    }

    if (!response.ok) {
      throw new Error("Failed");
    }

    let { data } = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateItem = async (props, id) => {
  try {
    let response = await fetch(`${SERVER}/items/edit/${id}`, {
      method: "PATCH",
      body: props,
    });

    if (response.status === 401) {
      throw new Error("You are not authorized");
    }

    if (!response.ok) {
      let { message, error } = await response.json();
      throw new Error(message || error);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteItem = async (id) => {
  try {
    let response = await fetch(`${SERVER}/items/remove/${id}`, {
      method: "DELETE",
    });

    if (response.status === 401) {
      throw new Error("You are not authorized");
    }

    if (!response.ok) {
      throw new Error("Failed");
    }
  } catch (error) {
    throw new Error("Failed");
  }
};

export { getItems, addItem, getItemById, updateItem, deleteItem };
