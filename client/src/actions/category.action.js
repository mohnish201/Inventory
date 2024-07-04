const SERVER = process.env.REACT_APP_SERVER;

const getCategories = async (page, limit) => {
  try {
    let response = await fetch(
      `${SERVER}/category/all?page=${page}&limit=${limit}`,
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

const addCategory = async (payload) => {
  if (!payload) {
    throw new Error("Payload not found");
  }

  try {
    let response = await fetch(`${SERVER}/category/add`, {
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

const getCategoryById = async (id) => {
  try {
    let response = await fetch(`${SERVER}/category/details/${id}`);

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

const updateCategory = async (props, id) => {
  try {
    let response = await fetch(`${SERVER}/category/edit/${id}`, {
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

const deleteCategory = async (id) => {
  try {
    let response = await fetch(`${SERVER}/category/remove/${id}`, {
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
  getCategories,
  addCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
