import { ReactNode } from "react";
import AuthNavBar from "./AuthNavBar";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <AuthNavBar />
      <div className="flex flex-col w-full h-full max-w-[73.25rem] px-4 my-36">
        {children}
      </div>
      <Footer/>
    </div>
  );
};

export default PageLayout;
