const getInvoice = async (page, limit) => {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_SERVER}/invoice/all?page=${page}&limit=${limit}`,
      {
        method: "GET",
      }
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

const getInvoiceById = async (id) => {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_SERVER}/invoice/details/${id}`
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

const addInvoice = async (payload) => {
  const { invoiceNo, invoiceDate, customerId, itemDetails } = payload;

  console.log(payload);

  if (!invoiceDate || !invoiceNo || !customerId) {
    throw new Error("Fill the required fields");
  }

  if (itemDetails.length == 0) {
    throw new Error("Add at least one Item");
  }

  try {
    let response = await fetch(`${process.env.REACT_APP_SERVER}/invoice/add`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 401) {
      throw new Error("You are not authorized");
    }

    if (response.status === 400) {
      throw new Error("This invoice is Already Exists");
    }

    if (!response.ok) {
      throw new Error("Failed");
    }

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const generateInvoicePDF = async (html) => {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_SERVER}/invoice/generatePdf`,
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

const updateInvoice = async (props, id) => {
  const { invoiceNo, invoiceDate, customerId, itemDetails } = props;
  console.log(props);
  if (!invoiceDate || !invoiceNo || !customerId) {
    throw new Error("Fill the required fields");
  }

  if (itemDetails.length == 0) {
    throw new Error("Add at least one Item");
  }
  try {
    let response = await fetch(
      `${process.env.REACT_APP_SERVER}/invoice/edit/${id}`,
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

const deleteInvoice = async (id) => {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_SERVER}/invoice/remove/${id}`,
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
  addInvoice,
  getInvoice,
  getInvoiceById,
  updateInvoice,
  deleteInvoice,
  generateInvoicePDF,
};
