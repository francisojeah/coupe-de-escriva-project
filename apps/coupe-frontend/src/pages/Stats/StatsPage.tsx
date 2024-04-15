import { useState } from "react";
import PageLayout from "../../components/PageLayout";
import { Dropdown, DropdownItem } from "flowbite-react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  useGetPlayersBySeasonDivisionSportQuery,
  useGetSeasonsQuery,
} from "../../store/slices/appSlice";
import MetaTags from "../../components/MetaTags";
import PageLoader from "../../components/PageLoader";
import { getRelevantStats } from "../../utils/constants";

const StatsPage = () => {
  const [selectedType, setSelectedType] = useState("mens");

  const { data: seasonsData } = useGetSeasonsQuery();
  const defaultSeason = seasonsData?.find(
    (season: any) => season.currentSeason
  );
  const [selectedSeason, setSelectedSeason] = useState(defaultSeason);

  const activeSportMenu: any = useSelector<RootState>((state) => state.sport);

  const { data: playersData, isLoading: isLoadingPlayers } =
    useGetPlayersBySeasonDivisionSportQuery({
      seasonId: selectedSeason?._id,
      division: selectedType,
      sport: activeSportMenu?.sport,
    });

  const handleSeasonChange = (season: any) => {
    setSelectedSeason(season);
  };

  const handleTypeChange = (type: any) => {
    setSelectedType(type);
  };

  const relevantStats = getRelevantStats(activeSportMenu?.sport);

  const [selectedStat, setSelectedStat] = useState(relevantStats[0]);

  const handleStatChange = (stat: any) => {
    setSelectedStat(stat);
  };

  let filteredPlayers: any[] | undefined;

  if (playersData) {
    filteredPlayers = playersData.filter(
      (player: any) =>
        player.stats[selectedStat] !== undefined &&
        player.stats[selectedStat] !== 0
    );
  }

  const sortedPlayers = [...(filteredPlayers || [])].sort((a: any, b: any) => {
    return b.stats[selectedStat] - a.stats[selectedStat];
  });

  const processedPlayers = sortedPlayers.reduce((acc, player, index) => {
    if (
      index === 0 ||
      player.stats[selectedStat] !==
        sortedPlayers[index - 1].stats[selectedStat]
    ) {
      // If it's the first player or the current player's stat is different from the previous player's stat
      acc.push({ ...player, position: index + 1 }); // Assign new position
    } else {
      // If the current player's stat is the same as the previous player's stat
      const prevPlayer = acc[index - 1];
      if (prevPlayer.firstname.localeCompare(player.firstname) < 0) {
        acc.push({ ...player, position: prevPlayer.position }); // Use the same position as the previous player
      } else {
        // If the current player's firstname comes before the previous player's firstname alphabetically
        let newIndex = index;
        while (
          newIndex > 0 &&
          player.stats[selectedStat] ===
            sortedPlayers[newIndex - 1].stats[selectedStat] &&
          prevPlayer.firstname.localeCompare(player.firstname) > 0
        ) {
          newIndex--;
        }
        acc.splice(newIndex, 0, { ...player, position: prevPlayer.position });
      }
    }
    return acc;
  }, []);

  return (
    <PageLayout>
      <>
        <MetaTags
          title={"Stats | Coupe de Escriva"}
          description={"Coupe de Escriva"}
          pageUrl={window.location.href}
        />
        {isLoadingPlayers ? (
          <PageLoader />
        ) : (
          <>
            <div className="flex flex-col gap-8 md:gap-12">
              <div className="text-3xl md:text-4xl font-bold">Stats</div>
              <div className="flex flex-col md:flex-row md:gap-12 gap-4">
                <div className="flex flex-col gap-2">
                  <p className="font-medium text-base">Season</p>
                  <div className="border-2 md:w-[15.25rem] border-[#D9D9D9] rounded-[0.5rem]">
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
                  <p className="font-medium text-base">Type</p>
                  <div className="border-2 md:w-[15.25rem] border-[#D9D9D9] rounded-[0.5rem]">
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
                <div className="flex flex-col gap-2">
                  <p className="font-medium text-base">Stat</p>
                  <div className="border-2 md:w-[15.25rem] border-[#D9D9D9] rounded-[0.5rem]">
                    <Dropdown
                      color=""
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-start",
                      }}
                      label={
                        selectedStat[0].toUpperCase() + selectedStat.slice(1)
                      }
                      placement="bottom"
                      arrowIcon={false}
                    >
                      {relevantStats?.map((stat: string) => (
                        <DropdownItem
                          key={stat}
                          onClick={() => handleStatChange(stat)}
                        >
                          {stat[0].toUpperCase() + stat.slice(1)}
                        </DropdownItem>
                      ))}
                    </Dropdown>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 flex flex-col gap-8">
              <div className="font-bold uppercase text-2xl md:text-3xl">
                {selectedStat}
              </div>
              <div>
                <div className="flex flex-col md:w-full  overflow-x-auto">
                  <div className=" text-xs rounded-lg text-gray-700 uppercase bg-gray-50 grid grid-cols-10 md:grid-cols-12 font-semibold md:justify-between px-3 py-5 items-center text-center gap-8 h-auto w-full">
                    <p className="col-span-2 md:col-span-1">Pos</p>
                    <p className="flex col-span-6 md:col-span-5">Player</p>
                    <p className="md:flex hidden md:col-span-4">Team</p>
                    <p className="col-span-2">Stats</p>
                  </div>
                  {processedPlayers.length !== 0 ? (
                    <>
                      {processedPlayers?.map((player: any, index: number) => (
                        <div key={player._id}>
                          <div
                            key={index}
                            className={`border-b grid grid-cols-10 md:grid-cols-12 h-auto gap-8 border-gray-300 px-3 py-5 w-full items-center justify-between`}
                          >
                            <p className="flex justify-center col-span-2 md:col-span-1 font-bold ">
                              {player.position}.
                            </p>
                            <div className="font-semibold col-span-6 md:col-span-5 whitespace-nowrap">{`${player.firstname} ${player.lastname}`}</div>
                            <div className="md:flex hidden md:col-span-4  gap-4">
                              <img
                                src={`/assets/images/${player.team.name?.toLowerCase().replace(/\s+/g, "-")}-logo.svg`}
                                alt="Logo"
                                className="w-fit h-7"
                              />
                              <p className="font-semibold whitespace-nowrap">
                                {player.team.name}
                              </p>
                            </div>
                            <p className="font-bold flex col-span-2 justify-center">
                              {player.stats[selectedStat]}
                            </p>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className="h-44 flex justify-center items-center text-[#888C90] w-full md:text-lg font-semibold">{`No Available ${selectedStat[0].toUpperCase() + selectedStat.slice(1)} Stat for ${activeSportMenu?.sport[0].toUpperCase() + activeSportMenu?.sport.slice(1)} ${selectedType[0].toUpperCase() + selectedType.slice(1)}`}</div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </>
    </PageLayout>
  );
};

export default StatsPage;
