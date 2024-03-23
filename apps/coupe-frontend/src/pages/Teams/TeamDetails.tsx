import { useParams } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import { teamsList } from "../../utils/constants";
import { useState, useRef, useEffect } from "react";

const TeamDetails = () => {
  const params = useParams();
  const teamName = params?.name;

  const [activeDetailTab, setActiveDetailTab] = useState("squad");

  const handleChangeTab = (tabId:any) => {
    setActiveDetailTab(tabId);
    const tabElement = document.getElementById(tabId);
    if (tabElement) {
      tabElement.scrollIntoView({ behavior: "smooth" });
    }
  }

  // Find the team object in teamsList that matches the label with params?.name
  const selectedTeam = teamsList.find((team) => team.label === teamName);

  if (!selectedTeam) {
    // Handle case when team is not found
    return <div>Team not found</div>;
  }

  const [isSticky, setIsSticky] = useState(false);
  const stickyRef = useRef<any>(null);
  const contentRef = useRef<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!stickyRef.current || !contentRef.current) return;

      const contentRect = contentRef.current.getBoundingClientRect();
      const stickyRect = stickyRef.current.getBoundingClientRect();

      setIsSticky(
        stickyRect.top <= 0 && contentRect.bottom > stickyRect.height
      );
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <PageLayout>
      <div ref={contentRef}>
        <div
          className={`py-8 px-8 border-2 border-[#D9D9D9] rounded-2xl`}
          style={{
            backgroundImage: `url(${selectedTeam?.backgroundBanner})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <div className="flex gap-8 items-center">
            <div className="rounded-full p-3 bg-white">
              <img
                src={selectedTeam?.logo}
                alt="Logo"
                className="w-fit h-[8rem] flex self-start"
              />
            </div>
            <div
              className="text-5xl font-bold uppercase"
              style={{ color: selectedTeam?.textColor }}
            >
              {selectedTeam?.title}
            </div>
          </div>
        </div>
        <div
          ref={stickyRef}
          className={`flex gap-8 border border-[#D9D9D9] p-4 sticky-element ${isSticky ? "sticky" : ""}`}
        >
          <div
            className={`uppercase p-2 ${activeDetailTab === "squad" ? "text-[#E0E1E3]" : "text-black"}`}
            onClick={() => handleChangeTab("squad")}
          >
            Squad
          </div>
          <div
            className={`uppercase p-2 ${activeDetailTab === "table" ? "text-[#E0E1E3] " : "text-black"}`}
            onClick={() => handleChangeTab("table")}
          >
            Table
          </div>
          <div
            className={`uppercase p-2 ${activeDetailTab === "fixtures" ? "text-[#E0E1E3]" : "text-black"}`}
            onClick={() => handleChangeTab("fixtures")}
          >
            Fixtures & Results
          </div>
        </div>
        <div id="squad">
           
                <div className="grid grid-cols-3 gap-8 py-4">
                  {selectedTeam?.players?.map(({firstname, lastname, playerNumber}, index) => (
                    <div className="border border-[#D9D9D9] text-lg flex rounded-md gap-4 p-4 items-center">
                      <p className="font-bold text-lg">{playerNumber}</p>
                      <p key={index} className="">
                        {firstname} <span className="uppercase font-medium">{lastname}</span>
                      </p>
                    </div>
                  ))}
                </div>
           </div>
        <div id="table">Table content goes here</div>
        <div id="fixtures">Fixtures & Results content goes here</div>
      </div>
    </PageLayout>
  );
};

export default TeamDetails;
