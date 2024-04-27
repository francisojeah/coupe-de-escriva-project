import { Dropdown, DropdownItem } from "flowbite-react";
import PageLayout from "../../components/PageLayout";
import { useEffect, useState } from "react";
import MetaTags from "../../components/MetaTags";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  useGetFixtureResultsBySeasonDivisionSportQuery,
  useGetSeasonsQuery,
} from "../../store/slices/appSlice";
import { GameWeek, formatDate } from "../../utils/constants";
import PageLoader from "../../components/PageLoader";
import { Role, UserStateProps } from "../../store/interfaces/user.interface";
import AddMatchModal from "../../components/AddMatchModal";
import { Link } from "react-router-dom";

const MatchesPage = () => {
  const [selectedType, setSelectedType] = useState("mens");
  const [selectedGameWeek, setSelectedGameWeek] = useState(GameWeek.GameWeek1);

  const activeSportMenu: any = useSelector<RootState>((state) => state.sport);

  const userSlice = useSelector<RootState, UserStateProps>(
    (state) => state.user
  );

  const { data: seasonsData } = useGetSeasonsQuery();
  const defaultSeason = seasonsData?.find(
    (season: any) => season.currentSeason
  );

  const [selectedSeason, setSelectedSeason] = useState(defaultSeason);
  const [openAddFixtureModal, setOpenAddFixtureModal] = useState(false);

  const { data: fixtureResultsData, isLoading: isLoadingfixtureResults } =
    useGetFixtureResultsBySeasonDivisionSportQuery(
      {
        seasonId: selectedSeason?._id,
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

  const handleAddFixture = () => {
    setOpenAddFixtureModal(true);
  };

  const handleGameweekChange = (gameweek: GameWeek) => {
    setSelectedGameWeek(gameweek);
  };

  function getISOWeek(date: Date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  }

  // UseEffect to set default gameweek
  useEffect(() => {
    if (!fixtureResultsData) return;

    const todayWeek = getISOWeek(new Date());
    let closestDiff = Number.MAX_SAFE_INTEGER;
    let closestGameweek: GameWeek = GameWeek.GameWeek1;

    for (const fixture of fixtureResultsData) {
      const fixtureDate = new Date(fixture.fixtures.date);
      const fixtureWeek = getISOWeek(fixtureDate);

      const diff = Math.abs(todayWeek - fixtureWeek);
      if (diff < closestDiff) {
        closestDiff = diff;
        closestGameweek = fixture?.fixtures?.gameweek;
      }
    }

    setSelectedGameWeek(closestGameweek);
  }, [fixtureResultsData]);

  return (
    <PageLayout>
      <>
        <MetaTags
          title={"Fixtures & Results | Coupe de Escriva"}
          pageUrl={window.location.href}
        />
        {isLoadingfixtureResults ? (
          <PageLoader />
        ) : (
          <>
            <div className="flex flex-col gap-12">
              <div className="text-3xl md:text-4xl font-bold">
                Fixtures & Results
              </div>
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
                  <p className="font-medium text-base md:text-lg">Gameweek</p>
                  <div className="border-2 w-[15.25rem] border-[#D9D9D9] rounded-[0.5rem]">
                    <Dropdown
                      color=""
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-start",
                      }}
                      label={selectedGameWeek || "Select GameWeek"}
                      placement="bottom"
                      arrowIcon={false}
                    >
                      {Object.values(GameWeek).map((gameweek) => (
                        <DropdownItem
                          key={gameweek}
                          onClick={() => handleGameweekChange(gameweek)}
                        >
                          {gameweek}
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
                      label={
                        selectedType[0].toUpperCase() + selectedType.slice(1)
                      }
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
              {userSlice?.user?.roles.includes(Role.Admin) && (
                <button
                  className="bg-custom-primary-1 flex w-52 text-white text-[16px] h-fit font-[700] py-2 px-4 rounded-[5px] justify-center hover:text-custom-primary-1 hover:border-custom-primary-1 hover:border hover:bg-white"
                  onClick={handleAddFixture}
                >
                  Add a new fixture
                </button>
              )}

              <div className="flex flex-col gap-4">
                {fixtureResultsData &&
                  fixtureResultsData?.map((fixture: any, index: number) => (
                    <>
                      {fixture.fixtures.gameweek === selectedGameWeek && (
                        <Link to={`/matches/${fixture._id}`}>
                          <div
                            key={index}
                            className="border flex p-4 justify-center items-center flex-col gap-4 border-[#D9D9D9] rounded-xl hover:border-2 hover:shadow-md w-full"
                          >
                            <div className="flex gap-4">
                              <p className="font-bold">
                                {formatDate(fixture.fixtures.date)}
                              </p>
                              {fixture.fixtures.result &&
                                fixture.fixtures.isLive && (
                                  <div className="px-[0.6rem] font-bold rounded-full text-[0.75rem] text-[#0e4a20] bg-[#bff9c7] flex gap-2 w-fit h-fit items-center justify-center ">
                                    <div className="rounded-full bg-[#0e4a20] w-2 h-2"></div>
                                    Live
                                  </div>
                                )}
                            </div>
                            <div className="flex items-center gap-1 sm:gap-4 w-full justify-center">
                              <div className="flex items-center justify-end gap-1 w-full">
                                <p className="font-semibold text-right">
                                  {fixture.fixtures.home_team_id.name}
                                </p>
                                <img
                                  src={`/assets/images/${fixture.fixtures.home_team_id.name?.toLowerCase().replace(/\s+/g, "-")}-logo.svg`}
                                  alt="Logo"
                                  className="w-fit h-[2.5rem] sm:h-[3.5rem]"
                                />
                              </div>
                              <div className="border flex border-[#D9D9D9] px-2 py-2">
                                {fixture.fixtures.result ? (
                                  <>
                                    <p className="border-r-2 px-2 border-black">
                                      {fixture.fixtures.result.home_team_score}
                                    </p>
                                    <p className="px-2">
                                      {fixture.fixtures.result.away_team_score}
                                    </p>
                                  </>
                                ) : (
                                  <p className="px-2">vs</p>
                                )}
                              </div>
                              <div className="flex items-center w-full gap-1">
                                <img
                                  src={`/assets/images/${fixture.fixtures.away_team_id.name?.toLowerCase().replace(/\s+/g, "-")}-logo.svg`}
                                  alt="Logo"
                                  className="w-fit h-[2.5rem] sm:h-[3.5rem]"
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
            <AddMatchModal
              openModal={openAddFixtureModal}
              setOpenModal={setOpenAddFixtureModal}
            />
          </>
        )}
      </>
    </PageLayout>
  );
};

export default MatchesPage;
