const getAllCurrency = async (page, limit) => {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_SERVER}/currency/all?page=${page}&limit=${limit}`
    );
    if (response.status === 401) {
      throw new Error("You are not authorized to access this page");
    }
    let data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getCurrencyById = async (id) => {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_SERVER}/currency/details/${id}`
    );

    if (response.status === 401) {
      throw new Error("You are not authorized to access this page");
    }
    let data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const postCurrency = async (props) => {
  try {
    let response = await fetch(`${process.env.REACT_APP_SERVER}/currency/add`, {
      method: "POST",
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

const patchCurrency = async (id, props) => {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_SERVER}/currency/edit/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(props),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 401) {
      throw new Error("You are not authorized");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteCurrency = async (id) => {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_SERVER}/currency/remove/${id}`,
      {
        method: "DELETE",
      }
    );

    if (response.status === 401) {
      throw new Error("You are not authorized");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export {
  getAllCurrency,
  getCurrencyById,
  postCurrency,
  patchCurrency,
  deleteCurrency,
};
