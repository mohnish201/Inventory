const getOrganizationData = async () => {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_SERVER}/organization/details`,
      { method: "GET" }
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

const addOrganization = async (data) => {
  const {
    organizationName,
    location,
    address,
    websiteUrl,
    baseCurrency,
    primaryContact,
    organizationLogo,
  } = data;

  if (
    !organizationName ||
    !location ||
    !address ||
    !websiteUrl ||
    !baseCurrency ||
    !primaryContact ||
    !organizationLogo
  ) {
    throw new Error("Fill the required fields");
  }

  try {
    let response = await fetch(
      `${process.env.REACT_APP_SERVER}/organization/add`,
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

const updateOrganizationDetails = async (props) => {
  console.log(props);
  try {
    let response = await fetch(
      `${process.env.REACT_APP_SERVER}/organization/edit`,
      {
        method: "PATCH",
        body: props,
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

export { addOrganization, updateOrganizationDetails, getOrganizationData };
