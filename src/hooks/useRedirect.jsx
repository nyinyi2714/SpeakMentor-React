import { useStateContext } from "../StateContext";
import { useNavigate } from "react-router-dom";

export default function useRedirect() {
  const { user } = useStateContext();
  const navigate = useNavigate();
  const loginRedirect = () => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  };

  return { loginRedirect };
}
