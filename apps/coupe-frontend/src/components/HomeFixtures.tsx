import { Dropdown, DropdownItem } from "flowbite-react";
import { useEffect, useState } from "react";
import { GameWeek, formatDate } from "../utils/constants";
import {
  useGetFixtureResultsBySeasonDivisionSportQuery,
  useGetSeasonsQuery,
} from "../store/slices/appSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const HomeFixtures = () => {
  const [selectedType, setSelectedType] = useState("mens");
  const [selectedGameWeek, setSelectedGameWeek] = useState(GameWeek.GameWeek1);

  const activeSportMenu: any = useSelector<RootState>((state) => state.sport);

  const { data: seasonsData } = useGetSeasonsQuery();
  const defaultSeason = seasonsData?.find(
    (season: any) => season.currentSeason
  );

  const { data: fixtureResultsData } =
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

  const handleTypeChange = (type: any) => {
    setSelectedType(type);
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
    <div className="flex flex-col gap-8">
      <div className="flex w-full items-center justify-between">
        <p className="md:text-3xl text-2xl font-bold">Upcoming Fixtures</p>
        <Link to={"/matches"}>
          <div className="flex gap-2 cursor-pointer hover:text-custom-primary-1 items-center">
            <p className="md:text-base text-sm">View Fixtures</p>
            <FaArrowRight size={"13"} />
          </div>
        </Link>
      </div>
      <div className="flex flex-col md:flex-row md:gap-12 gap-4">
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

      <div className="flex lg:flex-row w-full flex-col gap-6 lg:gap-[7rem]">
        {fixtureResultsData &&
          fixtureResultsData?.map((fixture: any, index: number) => (
            <>
              {fixture.fixtures.gameweek === selectedGameWeek && (
                <Link to={`/matches/${fixture._id}`} className="w-full">
                  <div
                    key={index}
                    className="border flex p-4 justify-center items-center flex-col gap-4 border-[#D9D9D9] rounded-xl hover:border-2 hover:shadow-md w-full"
                  >
                    <div className="flex gap-4">
                      <p className="font-bold">
                        {formatDate(fixture.fixtures.date)}
                      </p>
                      {fixture.fixtures.result && fixture.fixtures.isLive && (
                        <div className="px-[0.6rem] font-bold rounded-full text-[0.75rem] text-[#0e4a20] bg-[#bff9c7] flex gap-2 w-fit h-fit items-center justify-center ">
                          <div className="rounded-full bg-[#0e4a20] w-2 h-2"></div>
                          Live
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-4 w-full justify-center">
                      <div className="flex items-center justify-end gap-1 w-full">
                        <p className="font-semibold">
                          {fixture.fixtures.home_team_id.name}
                        </p>
                        <img
                          src={`/assets/images/${fixture.fixtures.home_team_id.name?.toLowerCase().replace(/\s+/g, "-")}-logo.svg`}
                          alt="Logo"
                          className="w-fit h-[3.5rem]"
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
  );
};

export default HomeFixtures;
