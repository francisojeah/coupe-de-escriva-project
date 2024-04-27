import { useState } from "react";
import PageLayout from "../../components/PageLayout";
import { Accordion, Avatar, Dropdown, DropdownItem } from "flowbite-react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  useGetPlayersBySeasonDivisionSportQuery,
  useGetSeasonsQuery,
  useGetTeamsQuery,
} from "../../store/slices/appSlice";
import AddPlayerModal from "../../components/AddPlayerModal";
import { Role, UserStateProps } from "../../store/interfaces/user.interface";
import MetaTags from "../../components/MetaTags";
import PageLoader from "../../components/PageLoader";
import { FaEdit } from "react-icons/fa";
import EditPlayerModal from "../../components/EditPlayerModal";

const PlayersPage = () => {
  const [selectedType, setSelectedType] = useState("mens");
  const [selectedTeam, setSelectedTeam] = useState("All");
  const [openAddPlayerModal, setOpenAddPlayerModal] = useState(false);
  const [openEditPlayerModal, setOpenEditPlayerModal] = useState(false);
  const [editPlayerId, setEditPlayerId] = useState("");

  const userSlice = useSelector<RootState, UserStateProps>(
    (state) => state.user
  );

  const activeSportMenu: any = useSelector<RootState>((state) => state.sport);

  const { data: seasonsData } = useGetSeasonsQuery();
  const defaultSeason = seasonsData?.find(
    (season: any) => season.currentSeason
  );

  const { data: teamsData } = useGetTeamsQuery();

  const [selectedSeason, setSelectedSeason] = useState(defaultSeason);

  const { data: playersData, isLoading: isLoadingPlayers } =
    useGetPlayersBySeasonDivisionSportQuery(
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

  const handleTeamChange = (team: string) => {
    setSelectedTeam(team);
  };

  const handleAddPlayer = () => {
    setOpenAddPlayerModal(true);
  };

  const handleEditPlayer = (playerId: string) => {
    setEditPlayerId(playerId);
    setOpenEditPlayerModal(true);
  };

  return (
    <PageLayout>
      <>
        <MetaTags
          title={"Players | Coupe de Escriva"}
          pageUrl={window.location.href}
        />
        {isLoadingPlayers ? (
          <PageLoader />
        ) : (
          <>
            <div className="flex flex-col gap-8 md:gap-12">
              <div className="text-3xl md:text-4xl font-bold">Players</div>
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
                  <p className="font-medium text-base">Team</p>
                  <div className="border-2 md:w-[15.25rem] border-[#D9D9D9] rounded-[0.5rem]">
                    <Dropdown
                      color=""
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-start",
                      }}
                      label={selectedTeam
                        .toLowerCase()
                        .split("-")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                      placement="bottom"
                      arrowIcon={false}
                    >
                      <DropdownItem onClick={() => handleTeamChange("All")}>
                        All
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => handleTeamChange("blue-jays")}
                      >
                        Blue Jays
                      </DropdownItem>
                      <DropdownItem onClick={() => handleTeamChange("cirok")}>
                        Cirok
                      </DropdownItem>
                      <DropdownItem onClick={() => handleTeamChange("madiba")}>
                        Madiba
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => handleTeamChange("tsg-walkers")}
                      >
                        TSG Walkers
                      </DropdownItem>
                    </Dropdown>
                  </div>
                </div>
              </div>
              {userSlice?.user?.roles.includes(Role.Admin) && (
                <button
                  className="bg-custom-primary-1 flex w-52 text-white text-[16px] h-fit font-[700] py-2 px-4 rounded-[5px] justify-center hover:text-custom-primary-1 hover:border-custom-primary-1 hover:border hover:bg-white"
                  onClick={handleAddPlayer}
                >
                  Add a new player
                </button>
              )}
              <Accordion collapseAll className="border-0">
                {selectedTeam === "All"
                  ? (teamsData || [])
                      ?.filter(
                        (team: any) =>
                          team.division === selectedType &&
                          team.sport === activeSportMenu?.sport
                      )
                      .slice(0, 4)
                      .map((team: any, index: number) => (
                        <Accordion.Panel key={index}>
                          <Accordion.Title>
                            <div className="flex gap-4">
                              <img
                                src={`/assets/images/${team.name
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}-logo.svg`}
                                alt="Logo"
                                className="w-fit h-[2.5rem] md:h-[3rem]"
                              />
                              <p className="self-center text-black whitespace-nowrap text-lg md:text-xl font-bold uppercase">
                                {team.name}
                              </p>
                            </div>
                          </Accordion.Title>
                          <Accordion.Content>
                            {groupPlayersByPosition(
                              playersData?.filter(
                                (player) =>
                                  player.team._id.toString() ===
                                  team._id.toString()
                              ) || []
                            )?.map(
                              ({ position, players }: any, idx: number) => (
                                <div className="py-4" key={idx}>
                                  <p className="text-lg font-bold text-[#888C90] uppercase">
                                    {position}
                                  </p>
                                  {/* Render individual players */}
                                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 md:py-4">
                                    {players.map(
                                      (player: any, index: number) => (
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
                                              {player.playerRole ===
                                                "Captain" && " (C)"}
                                            </span>
                                          </p>
                                          {userSlice?.user?.roles.includes(
                                            Role.Admin
                                          ) && (
                                            <div
                                              className="px-2 cursor-pointer"
                                              onClick={() =>
                                                handleEditPlayer(player?._id)
                                              }
                                            >
                                              <FaEdit />
                                            </div>
                                          )}
                                        </div>
                                      )
                                    )}
                                  </div>
                                </div>
                              )
                            )}
                          </Accordion.Content>
                        </Accordion.Panel>
                      ))
                  : (teamsData || [])
                      ?.filter(
                        (team) =>
                          team.name.toLowerCase().replace(/\s/g, "-") ===
                            selectedTeam &&
                          team.division === selectedType &&
                          team.sport === activeSportMenu?.sport
                      )
                      .map((team: any, index: number) => (
                        <Accordion.Panel key={index}>
                          <Accordion.Title>
                            <div className="flex gap-4">
                              <img
                                src={`/assets/images/${team.name
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}-logo.svg`}
                                alt="Logo"
                                className="w-fit h-[2.5rem] md:h-[3rem]"
                              />
                              <p className="self-center text-black whitespace-nowrap text-lg md:text-xl font-bold uppercase">
                                {team.name}
                              </p>
                            </div>
                          </Accordion.Title>
                          <Accordion.Content>
                            {groupPlayersByPosition(
                              playersData?.filter(
                                (player) =>
                                  player.team._id.toString() ===
                                  team._id.toString()
                              ) || []
                            )?.map(
                              ({ position, players }: any, idx: number) => (
                                <div className="py-4" key={idx}>
                                  <p className="text-lg font-bold text-[#888C90] uppercase">
                                    {position}
                                  </p>
                                  {/* Render individual players */}
                                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 md:py-4">
                                    {players.map(
                                      (player: any, index: number) => (
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
                                              {player.playerRole ===
                                                "Captain" && " (C)"}
                                            </span>
                                          </p>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </div>
                              )
                            )}
                          </Accordion.Content>
                        </Accordion.Panel>
                      ))}
              </Accordion>
            </div>
            <AddPlayerModal
              openModal={openAddPlayerModal}
              setOpenModal={setOpenAddPlayerModal}
            />
            <EditPlayerModal
              openModal={openEditPlayerModal}
              setOpenModal={setOpenEditPlayerModal}
              playerId={editPlayerId}
            />
          </>
        )}
      </>
    </PageLayout>
  );
};

export const groupPlayersByPosition = (players: any[]) => {
  const groupedPlayers: { position: string; players: any[] }[] = [];

  players?.forEach((player: any) => {
    // Check if the position already exists in groupedPlayers
    const existingPositionIndex = groupedPlayers.findIndex(
      (groupedPlayer) => groupedPlayer.position === player.position
    );

    if (existingPositionIndex !== -1) {
      // Add player to existing position
      groupedPlayers[existingPositionIndex].players.push(player);
    } else {
      // Create new position and add player
      groupedPlayers.push({ position: player.position, players: [player] });
    }
  });

  return groupedPlayers;
};

export default PlayersPage;
