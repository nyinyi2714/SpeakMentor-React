import { Navigate } from "react-router-dom";

function useRoute() {
  const authenticationRoute = (isAuthenticated, Component) => {
    return isAuthenticated ? <Navigate to="/" /> : <Component />;
  };

  const homepageRoute = (isVisited, Component) => {
    return isVisited ? <Component /> : <Navigate to="/tutorial" />;
  };

  return({
    authenticationRoute,
    homepageRoute,
  });
}

export default useRoute;