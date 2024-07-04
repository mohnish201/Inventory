import Cookies from "js-cookie";
import ChakraUiProvider from "../providers/ChakraUiProvider"
import RouteSegmentProvider from '../providers/RouteSegmentProvider';
import AuthValidationLayer from "../providers/AuthValidationLayer";

import { RootLayout } from "../components/RootLayout";
import { useLayoutEffect } from "react";

const App = () => {

  useLayoutEffect(() => {
    const token = Cookies.get('session');

    const originalFetch = window.fetch;

    window.fetch = (url, options) => {
      options = options || {};
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`
      }

      return originalFetch(url, options);
    }
  }, [])

  return (
    <ChakraUiProvider>
      <AuthValidationLayer>
        <RootLayout>
          <RouteSegmentProvider />
        </RootLayout>
      </AuthValidationLayer>
    </ChakraUiProvider>
  )
}

export { App }

