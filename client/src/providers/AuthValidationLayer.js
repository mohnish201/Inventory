import Cookies from "js-cookie";
import { Signin } from "../components/Signin";
import { Loading } from "../components/Loading";
import { createContext, useLayoutEffect, useState } from "react";

export const AuthContext = createContext();

const AuthValidationLayer = ({ children }) => {

    const session = Cookies.get('session');
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useLayoutEffect(() => {

        const validateAuthSession = async () => {

            try {
                let response = await (await fetch(`${process.env.REACT_APP_SERVER}/user/validate`, {
                    headers: {
                        Authorization: `Bearer ${session}`
                    }
                })).json();

                if (response.data) {
                    setUser(response.data)
                }

            } catch (error) {
                console.log(error);
            }

            setLoading(false);
        }

        validateAuthSession();
    }, [])

    if (isLoading) {
        return <Loading />
    }

    if (!session || !user) {
        return <Signin />
    }

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthValidationLayer;
