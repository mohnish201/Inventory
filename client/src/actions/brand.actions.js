const SERVER = process.env.REACT_APP_SERVER;

const getAllBrands = async (page, limit) => {
  try {
    let response = await fetch(
      `${SERVER}/brand/all?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 401) {
      throw new Error("You are not authorized to access this page");
    }

    let data = await response.json();
    return data;
  } catch (error) {
    throw new Error("You are not authorized to access this page");
  }
};

const addBrand = async (formData) => {
  const brandName = formData.get("brandName");

  if (!brandName) {
    throw new Error("brandName not found");
  }

  try {
    let response = await fetch(`${SERVER}/brand/add`, {
      method: "POST",
      body: JSON.stringify({ brandName }),
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

const updateBrand = async (id, brandName) => {
  if (!id) {
    throw new Error("id not found");
  }

  if (!brandName) {
    throw new Error("Brandname not found");
  }

  try {
    let response = await fetch(`${SERVER}/brand/edit/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ brandName }),
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

const deleteBrand = async (id) => {
  if (!id) {
    throw new Error("id not found");
  }

  try {
    let response = await fetch(`${SERVER}/brand/remove/${id}`, {
      method: "DELETE",
    });

    if (response.status === 401) {
      throw new Error("You are not authorized");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export { getAllBrands, addBrand, updateBrand, deleteBrand };
