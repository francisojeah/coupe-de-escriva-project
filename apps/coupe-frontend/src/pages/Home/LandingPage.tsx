import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import MetaTags from "../../components/MetaTags";

const LandingPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/home", { replace: true });
  }, []);

  return (
    <PageLayout>
      <MetaTags />
    </PageLayout>
  );
};

export default LandingPage;
