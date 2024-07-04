const getSalesOrder = async (page, limit) => {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_SERVER}/sales-order/all?page=${page}&limit=${limit}`,
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

const getSalesOrderById = async (id) => {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_SERVER}/sales-order/details/${id}`
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

const addSalesOrder = async (data) => {
  const { salesOrderNo, salesOrderDate, customerId, itemDetails } = data;
  if (!salesOrderDate || !salesOrderNo || !customerId) {
    throw new Error("Fill the required fields");
  }

  if (itemDetails.length == 0) {
    throw new Error("Add at least one Item");
  }

  try {
    let response = await fetch(
      `${process.env.REACT_APP_SERVER}/sales-order/add`,
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

    if (response.status === 400) {
      throw new Error("Sales Order Already Exist");
    }

    if (!response.ok) {
      throw new Error("Failed");
    }
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

const generateSalesOrderPDF = async (html) => {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_SERVER}/sales-order/generatePdf`,
      {
        method: "POST",
        body: JSON.stringify({ html }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const blob = await response.blob();
    const pdfUrl = URL.createObjectURL(blob);

    return pdfUrl;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateSalesOrder = async (props, id) => {
  const { itemDetails } = props;

  if (itemDetails.length == 0) {
    throw new Error("Add at least one Item");
  }
  try {
    let response = await fetch(
      `${process.env.REACT_APP_SERVER}/sales-order/edit/${id}`,
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

const deleteSalesOrder = async (id) => {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_SERVER}/sales-order/remove/${id}`,
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

const deleteSalesOrderItemById = async (id, itemId) => {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_SERVER}/sales-order/remove-items/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
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
  addSalesOrder,
  getSalesOrder,
  getSalesOrderById,
  updateSalesOrder,
  deleteSalesOrder,
  deleteSalesOrderItemById,
  generateSalesOrderPDF,
};
