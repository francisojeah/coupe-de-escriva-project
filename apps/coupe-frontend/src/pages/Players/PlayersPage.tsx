import { useState } from "react";
import PageLayout from "../../components/PageLayout";
import { Accordion, Dropdown, DropdownItem } from "flowbite-react";

export const teamsData = [
  {
    title: "Blue Jays",
    logo: "/assets/images/blue-jays-logo.svg",
    players: [
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
    ],
  },
  {
    title: "Cirok",
    logo: "/assets/images/cirok-logo.svg",
    players: [
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
    ],
  },
  {
    title: "Madiba",
    logo: "/assets/images/madiba-logo.svg",
    players: [
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
    ],
  },
  {
    title: "TSG Walkers",
    logo: "/assets/images/tsg-logo.svg",
    players: [
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
      { playerNumber: 16, firstname: "Francis", lastname: "Okocha-Ojeah" },
    ],
  },
];

const PlayersPage = () => {
  const [selecteSeason] = useState("2023/24");
  const [selectedType] = useState("Mens");
  const [selectedTeam] = useState("All");

  return (
    <PageLayout>
      <div className="flex flex-col gap-8 md:gap-12">
        <div className="text-3xl md:text-4xl font-bold">Players</div>
        <div className="flex flex-col md:flex-row md:gap-12 gap-4">
          <div className="flex flex-col gap-2">
            <p className="font-medium text-base">Season</p>
            <div className="border-2 md:w-[15.25rem] border-[#D9D9D9] rounded-[0.5rem]">
              <Dropdown
                color=""
                style={{
                  width: "15.25rem",
                  display: "flex",
                  justifyContent: "flex-start",
                }}
                label={selecteSeason}
                placement="bottom"
                arrowIcon={false}
              >
                <DropdownItem>2023/24</DropdownItem>
                <DropdownItem>2022/23</DropdownItem>
              </Dropdown>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-medium text-base">Type</p>
            <div className="border-2 md:w-[15.25rem] border-[#D9D9D9] rounded-[0.5rem]">
              <Dropdown
                color=""
                style={{
                  width: "15.25rem",
                  display: "flex",
                  justifyContent: "flex-start",
                }}
                label={selectedType}
                placement="bottom"
                arrowIcon={false}
              >
                <DropdownItem>Mens</DropdownItem>
                <DropdownItem>Womens</DropdownItem>
              </Dropdown>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-medium text-base">Team</p>
            <div className="border-2 md:w-[15.25rem] border-[#D9D9D9] rounded-[0.5rem]">
              <Dropdown
                color=""
                style={{
                  width: "15.25rem",
                  display: "flex",
                  justifyContent: "flex-start",
                }}
                label={selectedTeam}
                placement="bottom"
                arrowIcon={false}
              >
                <DropdownItem>All</DropdownItem>
                <DropdownItem>2022/23</DropdownItem>
              </Dropdown>
            </div>
          </div>
        </div>
        <Accordion className="border-0">
          {teamsData.map(({ title, logo, players }, index) => (
            <Accordion.Panel key={index}>
              <Accordion.Title>
                <div className="flex gap-4">
                  <img src={logo} alt="Logo" className="w-fit h-[2.5rem] md:h-[3rem]" />
                  <p className="self-center text-black  whitespace-nowrap text-lg md:text-xl font-bold uppercase">
                    {title}
                  </p>
                </div>
              </Accordion.Title>
              <Accordion.Content>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 md:py-4">
                  {players.map(({firstname, lastname, playerNumber}, index) => (
                    <div className="border border-[#D9D9D9] text-base md:text-lg flex rounded-md gap-4 p-4 items-center">
                      <p className="font-bold text-base md:text-lg">{playerNumber}</p>
                      <p key={index} className="">
                        {firstname} <span className="uppercase font-medium">{lastname}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </Accordion.Content>
            </Accordion.Panel>
          ))}
        </Accordion>
      </div>
    </PageLayout>
  );
};

export default PlayersPage;
