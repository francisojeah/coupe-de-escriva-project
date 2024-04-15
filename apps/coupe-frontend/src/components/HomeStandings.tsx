import { Dropdown, DropdownItem } from "flowbite-react";
import { useState } from "react";
import { FaArrowRight, FaChevronDown, FaChevronUp, FaMinus } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  useGetSeasonsQuery,
  useGetStandingsBySeasonDivisionSportQuery,
} from "../store/slices/appSlice";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import {
  BasketballStandingMetricAbbreviation,
  FootballStandingMetricAbbreviation,
  Sports,
  VolleyballStandingMetricAbbreviation,
} from "../store/interfaces/user.interface";

const HomeStandings = () => {
  const [selectedType, setSelectedType] = useState("mens");

  const activeSportMenu: any = useSelector<RootState>((state) => state.sport);

  const { data: seasonsData } = useGetSeasonsQuery();
  const defaultSeason = seasonsData?.find(
    (season: any) => season.currentSeason
  );

  const { data: standingsData, isLoading: isLoadingStandings } =
    useGetStandingsBySeasonDivisionSportQuery({
      seasonId: defaultSeason?._id,
      division: selectedType,
      sport: activeSportMenu?.sport,
    });


  const handleTypeChange = (type: any) => {
    setSelectedType(type);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex w-full items-center justify-between">
        <p className="md:text-3xl text-2xl font-bold">Standings</p>
        <Link to={"/standings"}>
          <div className="flex gap-2 cursor-pointer hover:text-custom-primary-1 items-center">
            <p className="md:text-base text-sm">View Standings</p>
            <FaArrowRight size={"13"} />
          </div>
        </Link>
      </div>
      <div className="flex w-full flex-col lg:flex-row justify-between gap-16 lg:gap-20">
        <div className="flex flex-col gap-8">
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

          <div className="flex flex-col md:w-full  overflow-x-auto">
            <div className="flex text-gray-600 font-semibold md:justify-between px-3 py-5 items-center text-center gap-8 h-auto w-full ">
              <div className="flex md:w-96 md:gap-6 gap-4 w-full">
                <p className="px-2">Pos</p>
                <p className="">Team</p>
              </div>
              <div className="flex w-full text-center justify-around">
                {/* Football metrics */}
                {activeSportMenu.sport === Sports.Football &&
                  Object.values(FootballStandingMetricAbbreviation).map(
                    (metricAbbreviation, index, array) => (
                      <p
                        key={metricAbbreviation}
                        className={`w-8 ${
                          index < 1 || index >= array.length - 2
                            ? ""
                            : "hidden md:flex md:justify-center w-8"
                        }`}
                      >
                        {metricAbbreviation}
                      </p>
                    )
                  )}
                {/* Basketball metrics */}
                {activeSportMenu.sport === Sports.Basketball &&
                  Object.values(BasketballStandingMetricAbbreviation).map(
                    (metricAbbreviation, index, array) => (
                      <p
                        key={metricAbbreviation}
                        className={`w-8 ${
                          index < 1 || index >= array.length - 2
                            ? ""
                            : "hidden md:flex md:justify-center w-8"
                        }`}
                      >
                        {metricAbbreviation}
                      </p>
                    )
                  )}
                {/* Volleyball metrics */}
                {activeSportMenu.sport === Sports.Volleyball &&
                  Object.values(VolleyballStandingMetricAbbreviation).map(
                    (metricAbbreviation, index, array) => (
                      <p
                        key={metricAbbreviation}
                        className={`w-8 ${
                          index < 1 || index >= array.length - 2
                            ? ""
                            : "hidden md:flex md:justify-center w-8"
                        }`}
                      >
                        {metricAbbreviation}
                      </p>
                    )
                  )}
              </div>
            </div>

            {isLoadingStandings ? (
              // <PageLoader />
              <div></div>
            ) : (
              <div className="flex flex-col w-full md:items-center">
                {standingsData?.map((standing:any, index:any) => (
                  <div
                    key={index}
                    className={`border-b-2 ${index < 2 ? "border-l-4 border-l-[#4D8A2F]" : ""} flex h-auto gap-8 border-gray-300 px-3 py-5 md:w-full items-center md:justify-between`}
                  >
                    <div className="flex md:w-96 md:gap-6 gap-4 w-full">
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
                    <div className="flex w-full text-center justify-around">
                      {/* Render other standing data */}
                      <p className="w-8">{standing.metrics[0]?.value}</p>
                      <p className="hidden md:flex md:justify-center w-8">
                        {standing.metrics[1]?.value}
                      </p>
                      <p className="hidden md:flex md:justify-center w-8">
                        {standing.metrics[2]?.value}
                      </p>
                      <p className="hidden md:flex md:justify-center w-8">
                        {standing.metrics[3]?.value}
                      </p>
                      <p className="hidden md:flex md:justify-center w-8">
                        {standing.metrics[4]?.value}
                      </p>
                      <p className="hidden md:flex md:justify-center w-8">
                        {standing.metrics[5]?.value}
                      </p>
                      <p className="w-8">{standing.metrics[6]?.value}</p>
                      <p className="font-bold w-8">
                        {standing.metrics[7]?.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div
          className="rounded-2xl border border-[#D9D9D9] p-4 w-full relative overflow-hidden justify-center items-center shadow-md flex flex-col gap-10"
          style={{ background: "linear-gradient(135deg, #ffffff, #f5f5f5)" }}
        >
          <p className="md:text-3xl text-2xl font-bold text-center">
            Introducing <br /> Fantasy Coupe
          </p>
          <div className="flex flex-col gap-4">
            <p className="text-base text-center font-medium">
              {" "}
              Assemble your dream team, manage your squad, and compete for glory
              against friends.
            </p>
            <p className="text-base text-center font-medium">
              Earn points based on real-life performances and win exclusive
              prizes.
            </p>
            <p className="text-base text-center font-medium">
              Experience Coupe De Escriva like never before with Fantasy Coupe!
            </p>
          </div>
          <div className="w-full flex justify-center items-center">
            <Link to={"/fantasy"}>
              <button className="w-auto h-auto flex justify-center items-center bg-custom-primary-1 hover:bg-custom-primary-2 text-white rounded-[0.5rem] px-4 py-3">
                <p className="text-sm">Join Fantasy Coupe Now</p>
              </button>
            </Link>
            <img
              src="/assets/images/ball-in-net.png"
              className="absolute h-40 top-0 left-0 transform -translate-x-1/4  z-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeStandings;
