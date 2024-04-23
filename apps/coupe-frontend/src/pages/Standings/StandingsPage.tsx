import { Dropdown, DropdownItem } from "flowbite-react";
import PageLayout from "../../components/PageLayout";
import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaMinus } from "react-icons/fa";
import {
  useGetFixtureResultsBySeasonDivisionSportQuery,
  useGetSeasonsQuery,
  useGetStandingsBySeasonDivisionSportQuery,
} from "../../store/slices/appSlice";
import { useSelector } from "react-redux";
import {
  BasketballStandingMetric,
  BasketballStandingMetricAbbreviation,
  FootballStandingMetric,
  FootballStandingMetricAbbreviation,
  Sports,
  VolleyballStandingMetric,
  VolleyballStandingMetricAbbreviation,
} from "../../store/interfaces/user.interface";
import { RootState } from "../../store/store";
import PageLoader from "../../components/PageLoader";
import MetaTags from "../../components/MetaTags";

const StandingsPage = () => {
  const [selectedType, setSelectedType] = useState("mens");

  const activeSportMenu: any = useSelector<RootState>((state) => state.sport);

  const { data: seasonsData } = useGetSeasonsQuery();
  const defaultSeason = seasonsData?.find(
    (season: any) => season.currentSeason
  );

  const [selectedSeason, setSelectedSeason] = useState(defaultSeason);

  const { data: standingsData, isLoading: isLoadingStandings } =
    useGetStandingsBySeasonDivisionSportQuery(
      {
        seasonId: selectedSeason?._id,
        division: selectedType,
        sport: activeSportMenu?.sport,
      },
      {
        refetchOnMountOrArgChange: 10,
      }
    );

  const { data: fixtureResultsData, isLoading: isLoadingfixtureResults } =
    useGetFixtureResultsBySeasonDivisionSportQuery(
      {
        seasonId: defaultSeason?._id,
        division: selectedType,
        sport: activeSportMenu?.sport,
      },
      {
        refetchOnMountOrArgChange: 10,
      }
    );

  const handleSeasonChange = (season: any) => {
    setSelectedSeason(season);
  };

  const handleTypeChange = (type: any) => {
    setSelectedType(type);
  };

  return (
    <PageLayout>
      <>
        <MetaTags
          title={"Standings | Coupe de Escriva"}
          description={"Coupe de Escriva"}
          pageUrl={window.location.href}
        />
        <div className="flex flex-col gap-8 md:gap-12">
          <div className="text-3xl md:text-4xl font-bold">Standings</div>
          <div className="flex flex-col md:flex-row md:gap-12 gap-4">
            <div className="flex flex-col gap-2">
              <p className="font-medium text-base md:text-lg">Season</p>
              <div className="border-2 w-[15.25rem] border-[#D9D9D9] rounded-[0.5rem]">
                <Dropdown
                  color=""
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                  label={selectedSeason?.season || "Select Season"}
                  placement="bottom"
                  arrowIcon={false}
                >
                  {seasonsData?.map((season: any) => (
                    <DropdownItem
                      key={season.id}
                      onClick={() => handleSeasonChange(season)}
                    >
                      {season.season}
                    </DropdownItem>
                  ))}
                </Dropdown>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-medium text-base md:text-lg">Type</p>
              <div className="border-2 w-[15.25rem] border-[#D9D9D9] rounded-[0.5rem]">
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
          </div>

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

            {isLoadingStandings && isLoadingfixtureResults ? (
              <PageLoader />
            ) : (
              <div className="flex flex-col w-[46rem] md:w-full md:items-center">
                {standingsData &&
                  standingsData?.map((standing, index) => (
                    <div
                      key={index}
                      className={`border-b-2 ${(index < 2 && (activeSportMenu.sport === Sports.Football || activeSportMenu.sport === Sports.Volleyball)) || (index < 3 && activeSportMenu.sport === Sports.Basketball) ? "border-l-4 border-l-[#4D8A2F]" : ""} flex h-auto gap-8 border-gray-300 px-3 py-5 md:w-full items-center md:justify-between`}
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
                          src={`/assets/images/${standing.team.name?.toLowerCase().replace(/\s+/g, "-")}-logo.svg`}
                          alt="Logo"
                          className="w-fit h-7"
                        />
                        <p className="font-bold whitespace-nowrap">
                          {standing.team.name}
                        </p>
                      </div>
                      <div className="flex md:w-full text-center gap-4 md:gap-0 md:justify-around">
                        {/* Render other standing data */}
                        {standing.metrics.map((metric, index) => (
                          <p
                            key={index}
                            className={`md:w-8 w-6 ${index === standing.metrics.length - 1 ? "font-bold" : ""}`}
                          >
                            {metric.value}
                          </p>
                        ))}
                      </div>

                      <div className="flex md:w-60 gap-1.5 md:gap-0 md:justify-between">
                        {Array.from({ length: 5 }).map((_, i) => {
                          const latestFixtures =
                            fixtureResultsData
                              ?.filter((fixture: any) => {
                                const homeTeamName =
                                  fixture.fixtures.home_team_id.name
                                    .toLowerCase()
                                    .replace(/\s/g, "-");
                                const awayTeamName =
                                  fixture.fixtures.away_team_id.name
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
                                fixture.fixtures.result.home_team_score;
                              const awayScore =
                                fixture.fixtures.result.away_team_score;
                              const isHomeTeam =
                                fixture.fixtures.home_team_id.name
                                  .toLowerCase()
                                  .replace(/\s/g, "-") ===
                                standing.team.name
                                  .toLowerCase()
                                  .replace(/\s/g, "-");
                              const isAwayTeam =
                                fixture.fixtures.away_team_id.name
                                  .toLowerCase()
                                  .replace(/\s/g, "-") ===
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
                                    className="w-3 h-3 p-0.5"
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

          <div className="w-full px-4 flex flex-col md:mt-6 md:flex-row gap-6 md:gap-24 justify-between">
            <div className="flex flex-col w-full gap-8 items-start">
              <p className="font-bold text-sm">QUALIFICATION</p>
              {activeSportMenu.sport === Sports.Football && (
                <div className="p-2 border-l-4 border-l-[#4D8A2F]">
                  <p className="text-sm text-[#888C90]">Finals</p>
                </div>
              )}
              {activeSportMenu.sport === Sports.Basketball && (
                <div className="p-2 border-l-4 border-l-[#4D8A2F]">
                  <p className="text-sm text-[#888C90]">Play-offs</p>
                </div>
              )}
              {activeSportMenu.sport === Sports.Volleyball && (
                <div className="p-2 border-l-4 border-l-[#4D8A2F]">
                  <p className="text-sm text-[#888C90]">Finals</p>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-8 w-full">
              <p className="font-bold text-sm">LEGEND</p>
              <div className="grid gap-4 text-sm grid-cols-2">
                {activeSportMenu.sport === Sports.Football &&
                  Object.entries(FootballStandingMetricAbbreviation).map(
                    ([abbreviation, metricAbbreviation]) => (
                      <p key={abbreviation} className="text-sm">
                        {`${metricAbbreviation} - ${FootballStandingMetric[abbreviation as keyof typeof FootballStandingMetric]}`}
                      </p>
                    )
                  )}
                {/* Basketball metrics */}
                {activeSportMenu.sport === Sports.Basketball &&
                  Object.entries(BasketballStandingMetricAbbreviation).map(
                    ([abbreviation, metricAbbreviation]) => (
                      <p key={abbreviation} className="text-sm">
                        {`${metricAbbreviation} - ${BasketballStandingMetric[abbreviation as keyof typeof BasketballStandingMetric]}`}
                      </p>
                    )
                  )}
                {/* Volleyball metrics */}
                {activeSportMenu.sport === Sports.Volleyball &&
                  Object.entries(VolleyballStandingMetricAbbreviation).map(
                    ([abbreviation, metricAbbreviation]) => (
                      <p key={abbreviation} className="text-sm">
                        {`${metricAbbreviation} - ${VolleyballStandingMetric[abbreviation as keyof typeof VolleyballStandingMetric]}`}
                      </p>
                    )
                  )}
              </div>
            </div>
          </div>
        </div>
      </>
    </PageLayout>
  );
};

export default StandingsPage;
