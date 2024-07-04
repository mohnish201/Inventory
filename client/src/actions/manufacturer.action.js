const SERVER = process.env.REACT_APP_SERVER;

const getManufacturers = async (page, limit) => {
  try {
    let response = await fetch(
      `${SERVER}/manufacturer/all?page=${page}&limit=${limit}`,
      { method: "GET" }
    );

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

const addManufacturer = async (payload) => {
  if (!payload) {
    throw new Error("Payload not found");
  }

  try {
    let response = await fetch(`${SERVER}/manufacturer/add`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 401) {
      throw new Error("You are not authorized");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const getManufacturerById = async (id) => {
  try {
    let response = await fetch(`${SERVER}/manufacturer/details/${id}`);

    if (response.status === 401) {
      throw new Error("You are not authorized");
    }

    let { data } = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateManufacturer = async (props, id) => {
  try {
    let response = await fetch(`${SERVER}/manufacturer/edit/${id}`, {
      method: "PATCH",
      body: JSON.stringify(props),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 401) {
      throw new Error("You are not authorized");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteManufacturer = async (id) => {
  try {
    let response = await fetch(`${SERVER}/manufacturer/remove/${id}`, {
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

export {
  getManufacturers,
  addManufacturer,
  getManufacturerById,
  updateManufacturer,
  deleteManufacturer,
};
