const SERVER = process.env.REACT_APP_SERVER;

const getDashboardData = async () => {
  try {
    let response = await fetch(`${SERVER}/dashboard/all`, { method: "GET" });

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

const getRecentItems = async () => {
  try {
    let response = await fetch(`${SERVER}/dashboard/latest-items`, {
      method: "GET",
    });

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

const getChartData = async (year) => {
  try {
    let response = await fetch(
      `${SERVER}/dashboard/monthwise-sales-purchase-order?year=${year}`,
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

export { getDashboardData, getRecentItems, getChartData };
