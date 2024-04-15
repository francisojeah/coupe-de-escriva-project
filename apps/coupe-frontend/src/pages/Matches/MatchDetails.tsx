import { useParams } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import {
  getRelevantStats,
  teamsList,
  toCamelCase,
} from "../../utils/constants";
import { useState, useRef, useEffect} from "react";
import {
  useGetFixtureResultByIdQuery,
  useGetPlayersByTeamIdQuery,
  useUpdateFixtureResultMutation,
} from "../../store/slices/appSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import PageLoader from "../../components/PageLoader";
import MetaTags from "../../components/MetaTags";
import { Role, UserStateProps } from "../../store/interfaces/user.interface";
import ConfirmationModal from "../../components/ConfirmationModal";
import AddLineUpModal from "../../components/AddLineUpModal";
import { FaUsers } from "react-icons/fa";
import { Avatar } from "flowbite-react";
import AddMatchStatsModal from "../../components/AddMatchStatsModal";

const MatchDetails = () => {
  const params = useParams();
  const fixtureResultId = params?.id;

  const [activeDetailTab, setActiveDetailTab] = useState("lineup");
  const [activeLineup, setActiveLineup] = useState("home");
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [openAddLineUpModal, setOpenAddLineUpModal] = useState(false);
  const [openAddMatchStatsModal, setOpenAddMatchStatsModal] = useState(false);

  const userSlice = useSelector<RootState, UserStateProps>(
    (state) => state.user
  );

  const { data: fixtureResultData, isLoading: isLoadingFixtureResult } =
    useGetFixtureResultByIdQuery(fixtureResultId);

  const handleChangeTab = (tabId: any) => {
    setActiveDetailTab(tabId);
    const tabElement = document.getElementById(tabId);
    if (tabElement) {
      const navbarHeight = 150; // Adjust this value to match your navbar height
      const offsetTop = tabElement.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: offsetTop - navbarHeight, behavior: "smooth" });
    }
  };

  const [
    updateFixtureResult,
  ]: any = useUpdateFixtureResultMutation();

  const handleStartGame = () => {
    setOpenConfirmationModal(true);
  };

  const handleAddLineUp = () => {
    setOpenAddLineUpModal(true);
  };

  const handleAddMatchStats = () => {
    setOpenAddMatchStatsModal(true);
  };

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

  const homeTeam: any = teamsList?.find(
    (team) =>
      team?.label ===
      fixtureResultData?.fixtures?.home_team_id?.name
        ?.toLowerCase()
        ?.replace(/\s/g, "-")
  );
  const awayTeam: any = teamsList?.find(
    (team) =>
      team?.label ===
      fixtureResultData?.fixtures?.away_team_id?.name
        ?.toLowerCase()
        ?.replace(/\s/g, "-")
  );

  const { data: homePlayersData, isLoading: isLoadingHomePlayers } =
    useGetPlayersByTeamIdQuery(fixtureResultData?.fixtures?.home_team_id?._id);

  const { data: awayPlayersData, isLoading: isLoadingAwayPlayers } =
    useGetPlayersByTeamIdQuery(fixtureResultData?.fixtures?.away_team_id?._id);

  const positionAbbreviations: any = {
    Defender: "DEF",
    Midfielder: "MID",
    Forward: "FWD",
    Goalkeeper: "GK",
    "Point Guard": "PG",
    "Shooting Guard": "SG",
    "Small Forward": "SF",
    "Power Forward": "PF",
    Center: "C",
    Setter: "SET",
    "Outside Hitter": "OH",
    "Middle Blocker": "MB",
    Libero: "LIB",
    "Opposite Hitter": "OPP",
  };

  const homeTeamId = fixtureResultData?.fixtures?.lineup?.home?.team_id;
  const awayTeamId = fixtureResultData?.fixtures?.lineup?.away?.team_id;

  // Helper function to filter players by team ID and role
  const filterPlayers = (
    players: any,
    teamId: any,
    role: any,
    isSubstitute: any
  ) => {
    return players?.filter(
      (player: any) =>
        player?.team._id === teamId &&
        player?.playerRole === role &&
        isSubstitute(player)
    );
  };

  // Helper function to check if a player is a substitute
  const isSubstitute = (player: any) => {
    const lineup =
      player?.team?._id === homeTeamId
        ? fixtureResultData?.fixtures?.lineup?.home
        : fixtureResultData?.fixtures?.lineup?.away;
    return lineup?.players.some(
      (p) => p?.player_id === player?._id && p?.isSubstitute
    );
  };

  // Sort players by position abbreviation
  const sortPlayersByPosition = (players: any) => {
    return players?.sort((a: any, b: any) => {
      const positionOrder =
        positionAbbreviations[a?.position] - positionAbbreviations[b?.position];
      if (positionOrder !== 0) {
        return positionOrder;
      } else {
        // If positions are equal, sort by player name
        return a?.firstname?.localeCompare(b?.firstname);
      }
    });
  };

  const groupPlayerStatsByType = (players: any) =>
    players?.reduce((acc: any, player: any) => {
      if (player.stats) {
        Object.entries(player.stats).forEach(([stat, value]) => {
          acc[stat] = acc[stat] || [];
          acc[stat].push({ player_id: player.player_id, value });
        });
      }
      return acc;
    }, {});

  // Get relevant stats based on the sport
  const relevantStats = getRelevantStats(fixtureResultData?.sport);

  // Order the stats based on the relevant stats
  const homeOrderedStats: any = {};
  const awayOrderedStats: any = {};

  // Iterate over the relevantStats array and add the stats to orderedStats in the desired order
  relevantStats.forEach((key: any) => {
    if (
      groupPlayerStatsByType(
        fixtureResultData?.fixtures?.lineup?.home?.players
      )?.hasOwnProperty(key)
    ) {
      homeOrderedStats[key] = groupPlayerStatsByType(
        fixtureResultData?.fixtures?.lineup?.home?.players
      )[key];
    }
  });

  relevantStats.forEach((key: any) => {
    if (
      groupPlayerStatsByType(
        fixtureResultData?.fixtures?.lineup?.away?.players
      )?.hasOwnProperty(key)
    ) {
      awayOrderedStats[key] = groupPlayerStatsByType(
        fixtureResultData?.fixtures?.lineup?.away?.players
      )[key];
    }
  });

  // Function to render player stats by type
  const renderPlayerStatsByType = (
    homeStatsByType: any,
    awayStatsByType: any,
    playerData: any
  ) => {
    const combinedStatsByType: any = {};

    // Merge home and away stats for each type
    Object.keys(homeStatsByType)?.forEach((statType) => {
      combinedStatsByType[statType] = homeStatsByType[statType].concat(
        awayStatsByType[statType]
      );
    });

    return Object.entries(combinedStatsByType)?.map(([stat, players]: any) => {
      // Sort players by the value of the stat and then alphabetically by first name if positions are the same
      const sortedPlayers = players?.sort((a: any, b: any) => {
        if (a.value === b.value) {
          const playerA = playerData?.find(
            (player: any) => player._id === a.player_id
          );
          const playerB = playerData?.find(
            (player: any) => player._id === b.player_id
          );
          if (playerA && playerB) {
            if (playerA.position === playerB.position) {
              return playerA.firstname.localeCompare(playerB.firstname);
            }
          }
        }
        return b.value - a.value; // Sort in descending order by value of the stat
      });

      return (
        <div className="flex flex-col gap-8" key={stat}>
          {/* Stat type header */}
          <p className="font-bold text-xl md:text-2xl flex justify-center">
            {stat?.toUpperCase()}
          </p>
          {/* Players with this stat */}
          {sortedPlayers?.map((player: any, index: number) => {
            if (!player) return null; // Skip null or undefined players
            const { player_id, value } = player; // Destructure player object
            // Find player details from playerData using player_id
            const playerDetails = playerData?.find(
              (player: any) => player._id === player_id
            );

            const selectedTeam = teamsList.find(
              (team) =>
                team.label ===
                playerDetails.team.name?.toLowerCase().replace(/\s+/g, "-")
            );
            return (
              <>
                {stat !== "mvp" ? (
                  <div
                    key={index} // Use index as key since player_id might be undefined
                    className={`flex justify-between items-center border-b border-gray-200 md:px-12 px-4 py-2 `}
                  >
                    <div className="flex gap-4 md:gap-8">
                      <img
                        src={`/assets/images/${playerDetails.team.name?.toLowerCase().replace(/\s+/g, "-")}-logo.svg`}
                        alt="Logo"
                        className="w-fit h-7"
                      />
                      <div className="font-semibold">
                        {playerDetails
                          ? `${toCamelCase(playerDetails.firstname)} ${playerDetails.lastname}`
                          : ""}
                      </div>
                    </div>
                    {/* Player stat value */}
                    <div className="font-bold text-lg">{value}</div>
                  </div>
                ) : (
                  <div
                    key={index} // Use index as key since player_id might be undefined
                    className={`flex flex-col gap-10 hover:shadow-lg md:w-[32rem] w-full self-center items-center rounded-2xl border-2 p-6 py-10 border-[#D9D9D9]`}
                    style={{
                      backgroundImage: `url(${selectedTeam?.backgroundBanner})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "repeat",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="flex  w-full justify-center gap-1">
                      <img
                        src="/assets/images/coupe-logo.svg"
                        alt="Logo"
                        className="w-fit h-[2.5rem]"
                      />
                      <p
                        className="self-center whitespace-nowrap text-lg font-bold"
                        style={{ color: selectedTeam?.textColor }}
                      >
                        COUPE DE ESCRIVA
                      </p>
                    </div>
                    <div className="flex gap-8 items-center">
                      <div className="rounded-full p-2 bg-white border-4 border-[#D9D9D9]">
                        <img
                          src={selectedTeam?.logo}
                          alt="Logo"
                          className="w-fit h-[5rem] md:h-[7rem] flex self-start"
                        />
                      </div>
                    </div>

                    <p
                      className=" md:text-4xl text-3xl font-bold uppercase"
                      style={{ color: selectedTeam?.textColor }}
                    >
                      {playerDetails ? (
                        <div className="flex flex-col justify-center items-center">
                          <div>{toCamelCase(playerDetails.firstname)}</div>{" "}
                          <div> {playerDetails.lastname}</div>
                        </div>
                      ) : (
                        ""
                      )}
                    </p>

                    <p
                      className="self-center uppercase  whitespace-nowrap text-lg font-bold"
                      style={{ color: selectedTeam?.textColor }}
                    >
                      Player of the Match
                    </p>
                  </div>
                )}
              </>
            );
          })}
        </div>
      );
    });
  };

  console.log(awayPlayersData);

  return (
    <PageLayout>
      <>
        <MetaTags
          title={`${fixtureResultData?.fixtures?.home_team_id?.name?.slice(0, 3)?.toUpperCase() ?? ""} vs ${fixtureResultData?.fixtures?.away_team_id?.name?.slice(0, 3)?.toUpperCase() ?? ""} | Coupe de Escriva`}
          description={"Coupe de Escriva"}
          pageUrl={window.location.href}
        />
        {isLoadingFixtureResult ? (
          <PageLoader />
        ) : (
          <>
            {fixtureResultData && (
              <div ref={contentRef} className="flex flex-col gap-8">
                <div className="h-[5.5rem] md:h-[7.5rem] lg:h-[8.5rem] relative flex items-center justify-center">
                  {/* Home Team */}
                  <div
                    className="ml-6"
                    style={{
                      backgroundImage: `url(${homeTeam?.backgroundBanner})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "repeat",
                      backgroundPosition: "center",
                      width: "100%",
                      height: "60%",
                    }}
                  />

                  <div className="flex gap-2 md:gap-4 lg:gap-8 items-center absolute top-0 left-0">
                    <div className="rounded-full p-2 bg-white border-4 border-[#E0E1E3]">
                      <img
                        src={homeTeam?.logo}
                        alt="Logo"
                        className="w-[4rem] h-[4rem] md:w-[6rem] md:h-[6rem] lg:w-[7rem] lg:h-[7rem] flex self-start"
                      />
                    </div>
                    <div
                      className="hidden sm:flex lg:text-3xl md:text-2xl sm:text-xl text-base font-bold uppercase"
                      style={{ color: homeTeam?.textColor }}
                    >
                      {homeTeam?.title}
                    </div>
                  </div>
                  {/* Score Line or VS */}
                  <div
                    className={`lg:text-4xl text-xl md:text-2xl border-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-custom-primary-2 ${fixtureResultData?.fixtures?.result ? "px-4 md:px-6" : "px-8 md:px-12"} h-[90%] md:h-[80%] border-4 flex justify-center items-center rounded-2xl md:rounded-3xl text-white font-bold uppercase`}
                  >
                    {fixtureResultData?.fixtures?.result
                      ? `${fixtureResultData?.fixtures?.result?.home_team_score} - ${fixtureResultData?.fixtures?.result?.away_team_score}`
                      : "VS"}
                  </div>

                  <div
                    className="mr-6"
                    style={{
                      backgroundImage: `url(${awayTeam?.backgroundBanner})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "repeat",
                      backgroundPosition: "center",
                      width: "100%",
                      height: "60%",
                    }}
                  />
                  <div className="flex gap-2 md:gap-4 lg:gap-8 items-center justify-end absolute top-0 right-0">
                    <div
                      className="hidden sm:flex lg:text-3xl md:text-2xl sm:text-xl text-base font-bold uppercase"
                      style={{ color: awayTeam?.textColor }}
                    >
                      {awayTeam?.title}
                    </div>
                    <div className="rounded-full p-2 bg-white border-4 border-[#E0E1E3]">
                      <img
                        src={awayTeam?.logo}
                        alt="Logo"
                        className="w-[4rem] h-[4rem] md:w-[6rem] md:h-[6rem] lg:w-[7rem] lg:h-[7rem] flex self-start"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-10 flex-col md:flex-row">
                  {userSlice?.user?.roles?.includes(Role.Admin) &&
                    !fixtureResultData?.fixtures?.result && (
                      <button
                        className="bg-custom-primary-1 flex w-52 text-white text-[16px] h-fit font-[700] py-2 px-4 rounded-[5px] justify-center hover:text-custom-primary-1 hover:border-custom-primary-1 hover:border hover:bg-white"
                        onClick={handleStartGame}
                      >
                        Start Game
                      </button>
                    )}

                  {userSlice?.user?.roles?.includes(Role.Admin) && (
                    <button
                      className="bg-custom-primary-1 flex w-52 text-white text-[16px] h-fit font-[700] py-2 px-4 rounded-[5px] justify-center hover:text-custom-primary-1 hover:border-custom-primary-1 hover:border hover:bg-white"
                      onClick={handleAddLineUp}
                    >
                      Add Lineup
                    </button>
                  )}

                  {userSlice?.user?.roles?.includes(Role.Admin) &&
                    fixtureResultData?.fixtures?.lineup && (
                      <button
                        className="bg-custom-primary-1 flex w-52 text-white text-[16px] h-fit font-[700] py-2 px-4 rounded-[5px] justify-center hover:text-custom-primary-1 hover:border-custom-primary-1 hover:border hover:bg-white"
                        onClick={handleAddMatchStats}
                      >
                        Add Match Stats
                      </button>
                    )}
                </div>

                <div
                  ref={stickyRef}
                  className={`flex bg-white gap-8  p-4 sticky-element ${
                    isSticky ? "sticky top-20 z-10" : ""
                  }`}
                >
                  <div
                    className={`uppercase p-2 cursor-pointer ${activeDetailTab === "lineup" ? "text-custom-primary-1 font-bold border-b-2 border-custom-primary-1" : "text-black"}`}
                    onClick={() => handleChangeTab("lineup")}
                  >
                    Line-Ups
                  </div>
                  <div
                    className={`uppercase p-2 cursor-pointer ${activeDetailTab === "stats" ? "text-custom-primary-1 font-bold border-b-2 border-custom-primary-1 " : "text-black"}`}
                    onClick={() => handleChangeTab("stats")}
                  >
                    Stats
                  </div>
                </div>
                <div
                  className={`${activeDetailTab === "lineup" ? "flex flex-col gap-8 justify-center self-center w-full max-w-[966px]" : "hidden"}`}
                >
                  <div className="h-[4rem] hidden md:flex w-full items-center justify-center">
                    {/* Home Team */}
                    <div className="flex w-full h-full">
                      <div
                        style={{
                          backgroundImage: `url(${homeTeam?.backgroundBanner})`,
                          backgroundSize: "contain",
                      backgroundRepeat: "repeat",
                      backgroundPosition: "center",
                          width: "100%",
                          height: "100%",
                        }}
                        className="px-4 flex justify-end items-center"
                      >
                        <div
                          className="md:text-2xl sm:text-xl text-base font-bold uppercase"
                          style={{ color: homeTeam?.textColor }}
                        >
                          {homeTeam?.title}
                        </div>
                      </div>

                      <div className="bg-white">
                        <img
                          src={homeTeam?.logo}
                          alt="Logo"
                          className="w-full h-full"
                        />
                      </div>
                    </div>
                    {/* Score Line or VS */}
                    <div
                      className={`text-xl md:text-2xl border-white bg-custom-primary-2 px-8 md:px-12 h-full flex justify-center items-center text-white font-bold uppercase`}
                    >
                      VS
                    </div>

                    <div className="flex w-full h-full">
                      <div className="bg-white">
                        <img
                          src={awayTeam?.logo}
                          alt="Logo"
                          className="w-full h-full"
                        />
                      </div>
                      <div
                        style={{
                          backgroundImage: `url(${awayTeam?.backgroundBanner})`,
                          backgroundSize: "contain",
                      backgroundRepeat: "repeat",
                      backgroundPosition: "center",
                          width: "100%",
                          height: "100%",
                        }}
                        className="px-4 flex justify-start items-center"
                      >
                        <div
                          className="md:text-2xl sm:text-xl text-base font-bold uppercase"
                          style={{ color: awayTeam?.textColor }}
                        >
                          {awayTeam?.title}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="md:hidden flex gap-3 w-full items-center justify-center">
                    {/* Home Team */}
                    <div
                      className={`flex w-full ${activeLineup === "home" ? "bg-[#E0E1E3] border-custom-primary-1" : ""} cursor-pointer h-full gap-2 items-center justify-end rounded-md p-2 border`}
                      onClick={() => setActiveLineup("home")}
                    >
                      <div className="text-sm font-bold uppercase">
                        {homeTeam?.title}
                      </div>

                      <div className="">
                        <img
                          src={homeTeam?.logo}
                          alt="Logo"
                          className="w-[2.5rem] h-[2.5rem]"
                        />
                      </div>
                    </div>

                    <div
                      className={`flex w-full ${activeLineup === "away" ? "bg-[#E0E1E3] border-custom-primary-1" : ""} cursor-pointer h-full gap-2 items-center rounded-md p-2 border`}
                      onClick={() => setActiveLineup("away")}
                    >
                      <div className="">
                        <img
                          src={awayTeam?.logo}
                          alt="Logo"
                          className="w-[2.5rem] h-[2.5rem]"
                        />
                      </div>

                      <div className="text-sm font-bold uppercase">
                        {awayTeam?.title}
                      </div>
                    </div>
                  </div>
                  {!fixtureResultData?.fixtures?.lineup ? (
                    <div className="flex flex-col text-[#888C90] gap-5  w-full py-24 justify-center items-center">
                      <FaUsers size={40} />
                      <p className="">
                        The line-up will be posted before the match
                      </p>
                    </div>
                  ) : (
                    <>
                      {isLoadingAwayPlayers || isLoadingHomePlayers ? (
                        <PageLoader />
                      ) : (
                        <div className="flex flex-col gap-6">
                          <p className="flex justify-center font-bold uppercase text-lg">
                            Managers
                          </p>
                          <div className="flex gap-8 w-full">
                            {/* Conditionally render the home lineup div */}
                            {(activeLineup === "home" ||
                              window.innerWidth >= 768) && (
                              <div className="w-full">
                                {["Coach", "Assistant Coach"]?.map((role) =>
                                  sortPlayersByPosition(
                                    filterPlayers(
                                      homePlayersData,
                                      homeTeamId,
                                      role,
                                      isSubstitute
                                    )
                                  )?.map((player: any, index: any) => (
                                    <div
                                      key={index}
                                      className={`w-full ${
                                        index % 2 === 0
                                          ? "bg-white"
                                          : "bg-[#E0E1E3]"
                                      } border border-[#E0E1E3] text-base  flex w-full justify-between gap-4 py-3 px-4 items-center`}
                                    >
                                      <div className="flex gap-4 items-center">
                                        <p className="font-semibold  text-base ">
                                          {toCamelCase(player?.firstname)}{" "}
                                          <span className="font-semibold uppercase">
                                            {player.lastname}
                                          </span>{" "}
                                        </p>
                                        <Avatar
                                          alt="Player"
                                          img={player?.profileImage}
                                          rounded
                                        />
                                      </div>
                                    </div>
                                  ))
                                )}
                              </div>
                            )}

                            {/* Conditionally render the away lineup div */}
                            {(activeLineup === "away" ||
                              window.innerWidth >= 768) && (
                              <div className="w-full">
                                {["Coach", "Assistant Coach"]?.map((role) =>
                                  sortPlayersByPosition(
                                    filterPlayers(
                                      awayPlayersData,
                                      awayTeamId,
                                      role,
                                      isSubstitute
                                    )
                                  )?.map((player: any, index: any) => (
                                    <div
                                      key={index}
                                      className={`w-full ${
                                        index % 2 === 0
                                          ? "bg-white"
                                          : "bg-[#E0E1E3]"
                                      } border border-[#E0E1E3] text-base  flex w-full justify-between gap-4 py-3 px-4 items-center`}
                                    >
                                      <div className="flex gap-4 items-center">
                                        <Avatar
                                          alt="Player"
                                          img={player?.profileImage}
                                          rounded
                                        />
                                        <p className="font-semibold  text-base ">
                                          {toCamelCase(player?.firstname)}{" "}
                                          <span className="font-semibold uppercase">
                                            {player?.lastname}
                                          </span>{" "}
                                        </p>
                                      </div>
                                    </div>
                                  ))
                                )}
                              </div>
                            )}
                          </div>
                          <p className="flex justify-center font-bold uppercase text-lg">
                            Starters
                          </p>
                          <div className="flex gap-8 w-full">
                            {/* Conditionally render the home lineup div */}
                            {(activeLineup === "home" ||
                              window.innerWidth >= 768) && (
                              <div className="w-full">
                                {[
                                  "Player",
                                  "Assistant Captain",
                                  "Captain",
                                ]?.map((role) =>
                                  // Map through each role
                                  sortPlayersByPosition(
                                    filterPlayers(
                                      homePlayersData,
                                      homeTeamId,
                                      role,
                                      (player: any) => !isSubstitute(player)
                                    )
                                  )?.map((player: any, index: any) => (
                                    // Map through players of each role
                                    <div
                                      key={index}
                                      className={`w-full ${
                                        index % 2 === 0
                                          ? "bg-white"
                                          : "bg-[#E0E1E3]"
                                      } border border-[#E0E1E3] text-base  flex w-full justify-between gap-4 py-3 px-4 items-center`}
                                    >
                                      <p className="font-bold text-lg text-start">
                                        {player?.playerNumber} -{" "}
                                        {
                                          positionAbbreviations[
                                            player?.position
                                          ]
                                        }
                                      </p>

                                      <div className="flex gap-4 items-center">
                                        <p className="font-semibold  text-base ">
                                          {toCamelCase(player?.firstname)}{" "}
                                          <span className="font-semibold uppercase">
                                            {player?.lastname}{" "}
                                            {player?.playerRole === "Captain" &&
                                              " (C)"}
                                          </span>{" "}
                                        </p>
                                        <Avatar
                                          alt="Player"
                                          img={player?.profileImage}
                                          rounded
                                        />
                                      </div>
                                    </div>
                                  ))
                                )}
                              </div>
                            )}

                            {/* Conditionally render the away lineup div */}
                            {(activeLineup === "away" ||
                              window.innerWidth >= 768) && (
                              <div className="w-full">
                                {[
                                  "Player",
                                  "Assistant Captain",
                                  "Captain",
                                ]?.map((role) =>
                                  sortPlayersByPosition(
                                    filterPlayers(
                                      awayPlayersData,
                                      awayTeamId,
                                      role,
                                      (player: any) => !isSubstitute(player)
                                    )
                                  )?.map((player: any, index: any) => (
                                    <div
                                      key={index}
                                      className={`w-full ${
                                        index % 2 === 0
                                          ? "bg-white"
                                          : "bg-[#E0E1E3]"
                                      } border border-[#E0E1E3] text-base  flex w-full justify-between gap-4 py-3 px-4 items-center`}
                                    >
                                      <div className="flex gap-4 items-center">
                                        <Avatar
                                          alt="Player"
                                          img={player?.profileImage}
                                          rounded
                                        />
                                        <p className="font-semibold  text-base ">
                                          {toCamelCase(player?.firstname)}{" "}
                                          <span className="font-semibold uppercase">
                                            {player?.lastname}{" "}
                                            {player?.playerRole === "Captain" &&
                                              " (C)"}
                                          </span>{" "}
                                        </p>
                                      </div>

                                      <p className="font-bold text-lg text-start">
                                        {
                                          positionAbbreviations[
                                            player?.position
                                          ]
                                        }{" "}
                                        - {player?.playerNumber}
                                      </p>
                                    </div>
                                  ))
                                )}
                              </div>
                            )}
                          </div>
                          <p className="flex justify-center font-bold uppercase text-lg">
                            Substitutes
                          </p>
                          <div className="flex gap-8 w-full">
                            {/* Conditionally render the home lineup div */}
                            {(activeLineup === "home" ||
                              window.innerWidth >= 768) && (
                              <div className="w-full">
                                {[
                                  "Player",
                                  "Assistant Captain",
                                  "Captain",
                                ]?.map((role) =>
                                  sortPlayersByPosition(
                                    filterPlayers(
                                      homePlayersData,
                                      homeTeamId,
                                      role,
                                      isSubstitute
                                    )
                                  )?.map((player: any, index: any) => (
                                    <div
                                      key={index}
                                      className={`w-full ${
                                        index % 2 === 0
                                          ? "bg-white"
                                          : "bg-[#E0E1E3]"
                                      } border border-[#E0E1E3] text-base  flex w-full justify-between gap-4 py-3 px-4 items-center`}
                                    >
                                      <p className="font-bold text-lg text-start">
                                        {player?.playerNumber} -{" "}
                                        {
                                          positionAbbreviations[
                                            player?.position
                                          ]
                                        }
                                      </p>

                                      <div className="flex gap-4 items-center">
                                        <p className="font-semibold  text-base ">
                                          {toCamelCase(player?.firstname)}{" "}
                                          <span className="font-semibold uppercase">
                                            {player?.lastname}{" "}
                                            {player?.playerRole === "Captain" &&
                                              " (C)"}
                                          </span>{" "}
                                        </p>
                                        <Avatar
                                          alt="Player"
                                          img={player?.profileImage}
                                          rounded
                                        />
                                      </div>
                                    </div>
                                  ))
                                )}
                              </div>
                            )}

                            {/* Conditionally render the away lineup div */}
                            {(activeLineup === "away" ||
                              window.innerWidth >= 768) && (
                              <div className="w-full">
                                {[
                                  "Player",
                                  "Assistant Captain",
                                  "Captain",
                                ]?.map((role) =>
                                  sortPlayersByPosition(
                                    filterPlayers(
                                      awayPlayersData,
                                      awayTeamId,
                                      role,
                                      isSubstitute
                                    )
                                  )?.map((player: any, index: any) => (
                                    <div
                                      key={index}
                                      className={`w-full ${
                                        index % 2 === 0
                                          ? "bg-white"
                                          : "bg-[#E0E1E3]"
                                      } border border-[#E0E1E3] text-base  flex w-full justify-between gap-4 py-3 px-4 items-center`}
                                    >
                                      <div className="flex gap-4 items-center">
                                        <Avatar
                                          alt="Player"
                                          img={player?.profileImage}
                                          rounded
                                        />
                                        <p className="font-semibold  text-base ">
                                          {toCamelCase(player?.firstname)}{" "}
                                          <span className="font-semibold uppercase">
                                            {player?.lastname}{" "}
                                            {player?.playerRole === "Captain" &&
                                              " (C)"}
                                          </span>{" "}
                                        </p>
                                      </div>

                                      <p className="font-bold text-lg text-start">
                                        {
                                          positionAbbreviations[
                                            player?.position
                                          ]
                                        }{" "}
                                        - {player?.playerNumber}
                                      </p>
                                    </div>
                                  ))
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
                <div
                  className={`${activeDetailTab === "stats" ? "flex flex-col gap-8" : "hidden"}`}
                >
                  {!homeOrderedStats || !awayOrderedStats ? (
                    <div className="flex flex-col text-[#888C90] gap-5  w-full py-24 justify-center items-center">
                      <FaUsers size={40} />
                      <p className="">
                        There are no available stats for this fixture
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-14">
                      {homePlayersData &&
                        awayPlayersData &&
                        renderPlayerStatsByType(
                          homeOrderedStats,
                          awayOrderedStats,
                          [
                            ...(homePlayersData || []),
                            ...(awayPlayersData || []),
                          ]
                        )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
        <ConfirmationModal
          openModal={openConfirmationModal}
          isLoading={isLoadingFixtureResult}
          setOpenModal={setOpenConfirmationModal}
          confirmationFunction={() =>
            updateFixtureResult({ id: fixtureResultId })
          }
          message={"Are you sure you want to start this match?"}
        />
        <AddLineUpModal
          openModal={openAddLineUpModal}
          setOpenModal={setOpenAddLineUpModal}
        />
        <AddMatchStatsModal
          openModal={openAddMatchStatsModal}
          setOpenModal={setOpenAddMatchStatsModal}
        />
      </>
    </PageLayout>
  );
};

export default MatchDetails;
