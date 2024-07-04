const SERVER = process.env.REACT_APP_SERVER;

const getVendors = async (page, limit) => {
  try {
    let response = await fetch(
      `${SERVER}/vendor/all?page=${page}&limit=${limit}`,
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

const addVendor = async (payload) => {
  if (!payload) {
    throw new Error("Payload not found");
  }

  try {
    let response = await fetch(`${SERVER}/vendor/add`, {
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

const getVendorById = async (id) => {
  try {
    let response = await fetch(`${SERVER}/vendor/details/${id}`);

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

const updateVendor = async (props, id) => {
  try {
    let response = await fetch(`${SERVER}/vendor/edit/${id}`, {
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

const deleteVendor = async (id) => {
  try {
    let response = await fetch(`${SERVER}/vendor/remove/${id}`, {
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

export { getVendors, addVendor, getVendorById, updateVendor, deleteVendor };
