import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/home", { replace: true });
  }, []);

  return <div>LandingPage</div>;
};

export default LandingPage;
