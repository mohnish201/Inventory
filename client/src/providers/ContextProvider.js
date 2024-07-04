import React, { createContext, useEffect, useState } from "react";
import { getOrganizationData } from "../actions/organizationProfile.action";

export const OrganizationContextProvider = createContext();
const ContextProvider = ({ children }) => {
  const [organizationData, setOrganizationData] = useState("");

  useEffect(() => {
    const fetchOrganizationData = async () => {
      try {
        let data = await getOrganizationData();
        setOrganizationData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrganizationData();
  }, []);

  return (
    <OrganizationContextProvider.Provider
      value={{ organizationData, setOrganizationData }}
    >
      {children}
    </OrganizationContextProvider.Provider>
  );
};

export default ContextProvider;
