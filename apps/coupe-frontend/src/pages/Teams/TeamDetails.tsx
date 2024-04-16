import { Link, useParams } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import { TeamsProps, formatDate, teamsList } from "../../utils/constants";
import { useState, useRef, useEffect } from "react";
import {
  useGetFixtureResultsBySeasonDivisionSportQuery,
  useGetPlayersBySeasonDivisionSportQuery,
  useGetSeasonsQuery,
  useGetStandingsBySeasonDivisionSportQuery,
  useGetTeamsQuery,
} from "../../store/slices/appSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Avatar, Dropdown, DropdownItem } from "flowbite-react";
import { groupPlayersByPosition } from "../Players/PlayersPage";
import PageLoader from "../../components/PageLoader";
import {
  BasketballStandingMetricAbbreviation,
  FootballStandingMetricAbbreviation,
  Sports,
  VolleyballStandingMetricAbbreviation,
} from "../../store/interfaces/user.interface";
import { FaChevronDown, FaChevronUp, FaMinus } from "react-icons/fa";
import MetaTags from "../../components/MetaTags";

const TeamDetails = () => {
  const params = useParams();
  const teamName = params?.name;

  const activeSportMenu: any = useSelector<RootState>((state) => state.sport);

  const [activeDetailTab, setActiveDetailTab] = useState("squad");
  const [selectedType, setSelectedType] = useState("mens");

  const { data: seasonsData } = useGetSeasonsQuery();
  const defaultSeason = seasonsData?.find(
    (season: any) => season.currentSeason
  );

  const { data: teamsData } = useGetTeamsQuery();

  const { data: playersData, isLoading: isLoadingPlayers } =
    useGetPlayersBySeasonDivisionSportQuery({
      seasonId: defaultSeason?._id,
      division: selectedType,
      sport: activeSportMenu?.sport,
    }, {
      refetchOnMountOrArgChange: 10, 
    });

  const { data: standingsData, isLoading: isLoadingStandings } =
    useGetStandingsBySeasonDivisionSportQuery({
      seasonId: defaultSeason?._id,
      division: selectedType,
      sport: activeSportMenu?.sport,
    }, {
      refetchOnMountOrArgChange: 10, 
    });

  const { data: fixtureResultsData, isLoading: isLoadingfixtureResults } =
    useGetFixtureResultsBySeasonDivisionSportQuery({
      seasonId: defaultSeason?._id,
      division: selectedType,
      sport: activeSportMenu?.sport,
    }, {
      refetchOnMountOrArgChange: 10, 
    });

  const handleTypeChange = (type: any) => {
    setSelectedType(type);
  };

  const handleChangeTab = (tabId: any) => {
    setActiveDetailTab(tabId);
    const tabElement = document.getElementById(tabId);
    if (tabElement) {
      const navbarHeight = 170; // Adjust this value to match your navbar height
      const offsetTop = tabElement.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: offsetTop - navbarHeight, behavior: "smooth" });
    }
  };

  // Find the team object in teamsList that matches the label with params?.name
  const confirmedSelectedTeam: TeamsProps[] = (teamsData || [])?.filter(
    (team) =>
      team.name.toLowerCase().replace(/\s/g, "-") === teamName &&
      team.division === selectedType &&
      team.sport === activeSportMenu?.sport
  );

  // Find the team object in teamsList that matches the label with params?.name
  const selectedTeam: any = teamsList.find((team) => team.label === teamName);

  if (!selectedTeam) {
    // Handle case when team is not found
    return <div>Team not found</div>;
  }

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
        stickyRect.top <= 80 && contentRect.bottom > stickyRect.height + 80
      );
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <PageLayout>
      <>
        <MetaTags
          title={`${selectedTeam?.title || ""} | Coupe de Escriva`}
          description={"Coupe de Escriva"}
          pageUrl={window.location.href}
        />
        {isLoadingPlayers || isLoadingStandings || isLoadingfixtureResults ? (
          <PageLoader />
        ) : (
          <div ref={contentRef}>
            <div
              className={`py-8 px-8 border-2 border-[#D9D9D9] rounded-2xl`}
              style={{
                backgroundImage: `url(${selectedTeam?.backgroundBanner})`,
                backgroundSize: "contain",
                backgroundRepeat: "repeat",
                backgroundPosition: "center",
              }}
            >
              <div className="flex gap-8 items-center">
                <div className="rounded-full p-2 bg-white border-4 border-[#D9D9D9]">
                  <img
                    src={selectedTeam?.logo}
                    alt="Logo"
                    className="w-fit h-[5rem] md:h-[7rem] flex self-start"
                  />
                </div>
                <div
                  className="lg:text-5xl md:text-4xl text-3xl font-bold uppercase"
                  style={{ color: selectedTeam?.textColor }}
                >
                  {selectedTeam?.title}
                </div>
              </div>
            </div>
            <div className="flex flex-col p-4 gap-2">
              <p className="font-medium text-base">Type</p>
              <div className="border-2 md:w-[15.25rem] border-[#D9D9D9] rounded-[0.5rem]">
                <Dropdown
                  color=""
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                  label={selectedType[0].toUpperCase() + selectedType.slice(1)}
                  placement="bottom"
                  arrowIcon={false}
                >
                  <DropdownItem onClick={() => handleTypeChange("mens")}>
                    Mens
                  </DropdownItem>
                  <DropdownItem onClick={() => handleTypeChange("womens")}>
                    Womens
                  </DropdownItem>
                </Dropdown>
              </div>
            </div>
            <div
              ref={stickyRef}
              className={`flex bg-white md:gap-8 w-full justify-between md:justify-normal  p-4 sticky-element whitespace-nowrap ${
                isSticky ? "sticky top-20 z-10" : ""
              }`}
            >
              <div
                className={`uppercase p-2 cursor-pointer ${activeDetailTab === "squad" ? "text-custom-primary-1 font-bold border-b-2 border-custom-primary-1" : "text-black"}`}
                onClick={() => handleChangeTab("squad")}
              >
                Squad
              </div>
              <div
                className={`uppercase p-2 cursor-pointer ${activeDetailTab === "table" ? "text-custom-primary-1 font-bold border-b-2 border-custom-primary-1 " : "text-black"}`}
                onClick={() => handleChangeTab("table")}
              >
                Table
              </div>
              <div
                className={`uppercase p-2 cursor-pointer ${activeDetailTab === "fixtures" ? "text-custom-primary-1 font-bold border-b-2 border-custom-primary-1" : "text-black"}`}
                onClick={() => handleChangeTab("fixtures")}
              >
                Fixtures & Results
              </div>
            </div>
            <div className="flex flex-col gap-12">
              <div id="squad">
                {groupPlayersByPosition(
                  playersData?.filter(
                    (player) =>
                      player?.team?._id.toString() ===
                      confirmedSelectedTeam[0]?._id.toString()
                  ) || []
                )?.map(({ position, players }: any, idx: number) => (
                  <div className="py-4" key={idx}>
                    <p className="text-lg font-bold text-[#888C90] uppercase">
                      {position}
                    </p>
                    {/* Render individual players */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 md:py-4">
                      {players.map((player: any, index: number) => (
                        <div
                          key={index}
                          className="border border-[#D9D9D9] text-base md:text-lg flex rounded-md gap-4 py-3 px-4 items-center"
                        >
                          <Avatar
                            alt="Player"
                            img={player.profileImage}
                            rounded
                          />
                          <p className="font-bold  text-base md:text-lg">
                            {player.playerNumber}
                          </p>
                          <p>
                            {player.firstname}{" "}
                            <span className="uppercase font-medium">
                              {player.lastname}{" "}
                              {player.playerRole === "Captain" && " (C)"}
                            </span>
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div id="table">
                <div className="flex flex-col md:w-full  overflow-x-auto">
                  <div className="flex text-gray-600 font-semibold md:justify-between px-3 py-5 items-center text-center gap-8 h-auto md:w-full w-[46rem]">
                    <div className="flex gap-4 md:gap-6 w-52 md:w-96 items-center">
                      <p className="px-2">Pos</p>
                      <p className="">Team</p>
                    </div>
                    <div className="flex text-center gap-4 md:gap-0 md:w-full md:justify-around">
                      {/* Football metrics */}
                      {activeSportMenu.sport === Sports.Football &&
                        Object.values(FootballStandingMetricAbbreviation).map(
                          (metricAbbreviation) => (
                            <p key={metricAbbreviation} className="md:w-8 w-6">
                              {metricAbbreviation}
                            </p>
                          )
                        )}
                      {/* Basketball metrics */}
                      {activeSportMenu.sport === Sports.Basketball &&
                        Object.values(BasketballStandingMetricAbbreviation).map(
                          (metricAbbreviation) => (
                            <p key={metricAbbreviation} className="md:w-8 w-6">
                              {metricAbbreviation}
                            </p>
                          )
                        )}
                      {/* Volleyball metrics */}
                      {activeSportMenu.sport === Sports.Volleyball &&
                        Object.values(VolleyballStandingMetricAbbreviation).map(
                          (metricAbbreviation) => (
                            <p key={metricAbbreviation} className="md:w-8 w-6">
                              {metricAbbreviation}
                            </p>
                          )
                        )}
                    </div>
                    <div className="flex md:w-60 gap-1.5 w-28 md:gap-0 md:justify-between">
                      <p className=" whitespace-nowrap">Last 5 Games</p>
                    </div>
                  </div>

                  {isLoadingStandings ? (
                    <PageLoader />
                  ) : (
                    <div className="flex flex-col w-[46rem] md:w-full md:items-center">
                      {standingsData?.map((standing: any, index: any) => (
                        <div
                          key={index}
                          className={`${standing.team.name.toLowerCase().replace(/\s+/g, "-") === teamName ? "bg-[#D9D9D9]" : ""} border-b-2 ${(index < 2 && (activeSportMenu.sport === Sports.Football || activeSportMenu.sport === Sports.Volleyball)) || (index < 3 && activeSportMenu.sport === Sports.Basketball) ? "border-l-4 border-l-[#4D8A2F]" : ""} flex h-auto gap-8 border-gray-300 px-3 py-5 md:w-full items-center md:justify-between`}
                        >
                          <div className="flex gap-4 md:gap-6 w-52 md:w-96 items-center">
                            <p className="flex justify-between font-bold w-10 text-center order items-center">
                              {standing.prevPosition &&
                              standing.prevPosition < standing.position ? (
                                <FaChevronDown color="red" /> // Render down arrow if previous position is greater
                              ) : standing.prevPosition &&
                                standing.prevPosition > standing.position ? (
                                <FaChevronUp color="green" /> // Render up arrow if previous position is smaller
                              ) : (
                                <FaMinus color="grey" /> // Render equals icon if positions are equal or previous position is not defined
                              )}
                              {standing.position}
                            </p>
                            <img
                              src={`/assets/images/${standing.team.name.toLowerCase().replace(/\s+/g, "-")}-logo.svg`}
                              alt="Logo"
                              className="w-fit h-7"
                            />
                            <p className="font-bold whitespace-nowrap">
                              {standing.team.name}
                            </p>
                          </div>
                          <div className="flex md:w-full text-center gap-4 md:gap-0 md:justify-around">
                            {/* Render other standing data */}
                            <p className="md:w-8 w-6">
                              {standing.metrics[0]?.value}
                            </p>
                            <p className="md:w-8 w-6">
                              {standing.metrics[1]?.value}
                            </p>
                            <p className="md:w-8 w-6">
                              {standing.metrics[2]?.value}
                            </p>
                            <p className="md:w-8 w-6">
                              {standing.metrics[3]?.value}
                            </p>
                            <p className="md:w-8 w-6">
                              {standing.metrics[4]?.value}
                            </p>
                            <p className="md:w-8 w-6">
                              {standing.metrics[5]?.value}
                            </p>
                            <p className="md:w-8 w-6">
                              {standing.metrics[6]?.value}
                            </p>
                            <p className="font-bold md:w-8 w-6">
                              {standing.metrics[7]?.value}
                            </p>
                          </div>
                          <div className="flex md:w-60 gap-1.5 md:gap-0 md:justify-between">
                            {Array.from({ length: 5 }).map((_, i) => {
                              const latestFixtures =
                                fixtureResultsData
                                  ?.filter((fixture: any) => {
                                    const homeTeamName =
                                      fixture?.fixtures?.home_team_id?.name
                                        .toLowerCase()
                                        .replace(/\s/g, "-");
                                    const awayTeamName =
                                      fixture?.fixtures?.away_team_id?.name
                                        .toLowerCase()
                                        .replace(/\s/g, "-");
                                    return (
                                      homeTeamName ===
                                        standing.team.name
                                          .toLowerCase()
                                          .replace(/\s/g, "-") ||
                                      awayTeamName ===
                                        standing.team.name
                                          .toLowerCase()
                                          .replace(/\s/g, "-")
                                    );
                                  })
                                  .sort(
                                    (a: any, b: any) =>
                                      new Date(b.fixtures.date).getTime() -
                                      new Date(a.fixtures.date).getTime()
                                  )
                                  .slice(0, 5) || [];

                              let resultIcon;
                              let bgColorClass = "bg-[#fff]";

                              if (latestFixtures[i]) {
                                const fixture = latestFixtures[i];
                                if (fixture?.fixtures?.result) {
                                  const homeScore =
                                    fixture?.fixtures?.result?.home_team_score;
                                  const awayScore =
                                    fixture?.fixtures?.result?.away_team_score;
                                  const isHomeTeam =
                                    fixture?.fixtures?.home_team_id?.name?.toLowerCase() ===
                                    standing.team.name
                                      .toLowerCase()
                                      .replace(/\s/g, "-");
                                  const isAwayTeam =
                                    fixture.fixtures.away_team_id.name.toLowerCase() ===
                                    standing.team.name
                                      .toLowerCase()
                                      .replace(/\s/g, "-");
                                  if (
                                    (isHomeTeam && homeScore > awayScore) ||
                                    (isAwayTeam && awayScore > homeScore)
                                  ) {
                                    resultIcon = (
                                      <img
                                        src="/assets/icons/tik-icon.svg"
                                        alt="Win"
                                        className="w-3 h-3"
                                      />
                                    );
                                    bgColorClass = "bg-[#00DB74]";
                                  } else if (
                                    (isHomeTeam && homeScore < awayScore) ||
                                    (isAwayTeam && awayScore < homeScore)
                                  ) {
                                    resultIcon = (
                                      <img
                                        src="/assets/icons/cancel-icon.svg"
                                        alt="Loss"
                                        className="w-3 h-3"
                                      />
                                    );
                                    bgColorClass = "bg-[#E0005E]";
                                  } else {
                                    resultIcon = (
                                      <FaMinus
                                        color="#666666"
                                        style={{ padding: 2 }}
                                      />
                                    );
                                  }
                                } else {
                                  resultIcon = (
                                    <div className="h-5 w-5 border flex border-[#D9D9D9] justify-center items-center rounded-full"></div>
                                  );
                                }
                              } else {
                                resultIcon = (
                                  <div className="h-5 w-5 border flex border-[#D9D9D9] justify-center items-center rounded-full"></div>
                                );
                              }

                              return (
                                <div
                                  key={i}
                                  className={`h-5 w-5 border flex justify-center items-center rounded-full ${bgColorClass} border-[#D9D9D9]`}
                                >
                                  {resultIcon}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div id="fixtures">
                <div className="flex flex-col gap-4">
                  {fixtureResultsData &&
                    fixtureResultsData?.map((fixture: any, index: number) => (
                      <>
                        {(fixture.fixtures.home_team_id.name
                          .toLowerCase()
                          .replace(/\s/g, "-") === teamName ||
                          fixture.fixtures.away_team_id.name
                            .toLowerCase()
                            .replace(/\s/g, "-") === teamName) && (
                          <Link to={`/matches/${fixture?._id}`}>
                            <div
                              key={index}
                              className="border flex p-4 justify-center items-center flex-col gap-4 border-[#D9D9D9] rounded-xl hover:border-2 hover:shadow-md"
                            >
                              <p className="font-bold">
                                {formatDate(fixture.fixtures.date)}
                              </p>
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                  <p className="font-semibold">
                                    {fixture.fixtures.home_team_id.name}
                                  </p>
                                  <img
                                    src={`/assets/images/${fixture.fixtures.home_team_id.name?.toLowerCase().replace(/\s+/g, "-")}-logo.svg`}
                                    alt="Logo"
                                    className="w-fit h-[3.5rem]"
                                  />
                                </div>
                                <div className="border flex border-[#D9D9D9] px-2 py-1">
                                  {fixture.fixtures.result ? (
                                    <>
                                      <p className="border-r-2 px-1 border-black">
                                        {
                                          fixture.fixtures.result
                                            .home_team_score
                                        }
                                      </p>
                                      <p className="px-1">
                                        {
                                          fixture.fixtures.result
                                            .away_team_score
                                        }
                                      </p>
                                    </>
                                  ) : (
                                    <p className="px-1">vs</p>
                                  )}
                                </div>
                                <div className="flex items-center gap-1">
                                  <img
                                    src={`/assets/images/${fixture.fixtures.away_team_id.name?.toLowerCase().replace(/\s+/g, "-")}-logo.svg`}
                                    alt="Logo"
                                    className="w-fit h-[3.5rem]"
                                  />
                                  <p className="font-semibold">
                                    {fixture.fixtures.away_team_id.name}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </Link>
                        )}
                      </>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    </PageLayout>
  );
};

export default TeamDetails;
