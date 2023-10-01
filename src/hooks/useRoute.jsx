import { Navigate } from "react-router-dom";

function useRoute() {
  const authenticationRoute = (isAuthenticated, Component) => {
    return isAuthenticated ? <Navigate to="/" /> : <Component />;
  };
  
  return({
    authenticationRoute,
  });
}

export default useRoute;