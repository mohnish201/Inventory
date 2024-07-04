const getPurchaseOrder = async (page, limit) => {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_SERVER}/purchase-order/all?page=${page}&limit=${limit}`,
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

const getPuchaseOrderById = async (id) => {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_SERVER}/purchase-order/details/${id}`
    );

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

const addPurchaseOrder = async (data) => {
  const { purchaseOrderNo, purchaseOrderDate, vendorId, itemDetails } = data;
  if (!purchaseOrderNo || !purchaseOrderDate || !vendorId) {
    throw new Error("Fill the required fields");
  }

  if (itemDetails.length == 0) {
    throw new Error("Add at least one Item");
  }

  try {
    let response = await fetch(
      `${process.env.REACT_APP_SERVER}/purchase-order/add`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 401) {
      throw new Error("You are not authorized");
    }

    if (!response.ok) {
      throw new Error("Failed");
    }
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

const updatePurchaseOrder = async (props, id) => {
  const { itemDetails } = props;

  if (itemDetails.length == 0) {
    throw new Error("Add at least one Item");
  }
  try {
    let response = await fetch(
      `${process.env.REACT_APP_SERVER}/purchase-order/edit/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(props),
      }
    );

    if (response.status === 401) {
      throw new Error("You are not authorized");
    }

    if (!response.ok) {
      let { message, error } = await response.json();
      throw new Error(message || error);
    }
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

const deletePurchaseOrder = async (id) => {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_SERVER}/purchase-order/remove/${id}`,
      {
        method: "DELETE",
      }
    );

    if (response.status === 401) {
      throw new Error("You are not authorized");
    }

    if (!response.ok) {
      throw new Error("Failed");
    }
  } catch (error) {
    console.log(error);
    throw new Error("Failed");
  }
};

export {
  addPurchaseOrder,
  getPurchaseOrder,
  getPuchaseOrderById,
  updatePurchaseOrder,
  deletePurchaseOrder,
};
