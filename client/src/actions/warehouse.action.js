const SERVER = process.env.REACT_APP_SERVER;

const getWarehouses = async (page, limit) => {
  try {
    let response = await fetch(
      `${SERVER}/warehouse/all?page=${page}&limit=${limit}`,
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

const addWarehouse = async (payload) => {
  if (!payload) {
    throw new Error("Payload not found");
  }

  try {
    let response = await fetch(`${SERVER}/warehouse/add`, {
      method: "POST",
      body: JSON.stringify(payload),
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

const getWarehouseById = async (id) => {
  try {
    let response = await fetch(`${SERVER}/warehouse/details/${id}`);

    if (response.status === 401) {
      throw new Error("You are not authorized");
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

const updateWarehouse = async (props, id) => {
  try {
    let response = await fetch(`${SERVER}/warehouse/edit/${id}`, {
      method: "PATCH",
      body: JSON.stringify(props),
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

const deleteWarehouse = async (id) => {
  try {
    let response = await fetch(`${SERVER}/warehouse/remove/${id}`, {
      method: "DELETE",
    });

    if (response.status === 401) {
      throw new Error("You are not authorized");
    }

    if (!response.ok) {
      throw new Error("Failed");
    }
  } catch (error) {
    throw new Error(error);
  }
};

export {
  getWarehouses,
  addWarehouse,
  getWarehouseById,
  updateWarehouse,
  deleteWarehouse,
};
