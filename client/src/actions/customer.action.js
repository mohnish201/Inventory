const SERVER = process.env.REACT_APP_SERVER;

const getCustomers = async (page, limit) => {
  try {
    let response = await fetch(
      `${SERVER}/customer/all?page=${page}&limit=${limit}`,
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

const addCustomer = async (payload) => {
  if (!payload) {
    throw new Error("Payload not found");
  }

  try {
    let response = await fetch(`${SERVER}/customer/add`, {
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

const getCustomerById = async (id) => {
  try {
    let response = await fetch(`${SERVER}/customer/details/${id}`);

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

const updateCustomer = async (props, id) => {
  try {
    let response = await fetch(`${SERVER}/customer/edit/${id}`, {
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

const deleteCustomer = async (id) => {
  try {
    let response = await fetch(`${SERVER}/customer/remove/${id}`, {
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
  getCustomers,
  addCustomer,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
