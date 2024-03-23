import { Dropdown, DropdownItem } from "flowbite-react";
import { useState } from "react";
import { FaMinus } from "react-icons/fa";
import { Link } from "react-router-dom";

const HomeStandings = () => {
  // const [selecteSeason, setSelecteSeason] = useState("2023/24");
  const [selectedType] = useState("Mens");
  const [selectedGameWeek] = useState("Gameweek 1");

  return (
    <div className="flex flex-col gap-8">
      <div className="md:text-3xl text-2xl font-bold">Standings</div>
      <div className="flex w-full flex-col lg:flex-row justify-between gap-16 lg:gap-20">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:gap-12 gap-4">
            <div className="flex flex-col gap-2">
              <p className="font-medium text-lg">Gameweek</p>
              <div className="border-2 md:w-[15.25rem] border-[#D9D9D9] rounded-[0.5rem]">
                <Dropdown
                  color=""
                  style={{
                    width: "15.25rem",
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                  label={selectedGameWeek}
                  placement="bottom"
                  arrowIcon={false}
                >
                  <DropdownItem>Gameweek 1</DropdownItem>
                  <DropdownItem>2022/23</DropdownItem>
                </Dropdown>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-medium text-lg">Type</p>
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
          </div>
          <div className="flex flex-col w-full">
            <div className="flex gap-8 text-gray-600 font-semibold justify-between px-3 py-5 w-full items-center text-center">
              <div className="flex md:w-96 md:gap-6 gap-4 w-full">
                <p className="px-2">Pos</p>
                <p className="">Team</p>
              </div>
              <div className="flex w-full text-center justify-around">
                <p className="md:w-8 w-6">Pl</p>
                <p className="hidden md:flex md:justify-center w-8">W</p>
                <p className="hidden md:flex md:justify-center w-8">D</p>
                <p className="hidden md:flex md:justify-center w-8">L</p>
                <p className="hidden md:flex md:justify-center w-8">GF</p>
                <p className="hidden md:flex md:justify-center w-8">GA</p>
                <p className="md:w-8 w-6">GD</p>
                <p className="md:w-8 w-6">Pts</p>
              </div>
            </div>
            <div className="flex flex-col  items-center w-full">
              <div
                className={`border-b-2 border-l-4 border-l-[#4D8A2F] gap-8 flex h-auto border-gray-300 px-3 py-5 w-full items-center justify-between`}
              >
                <div className="flex md:w-96 md:gap-6 gap-4 w-full">
                  <p className=" flex justify-between font-bold w-10 text-center order items-center">
                    <FaMinus color="grey" />
                    {1}
                  </p>
                  <img
                    src={"/assets/images/madiba-logo.svg"}
                    alt="Logo"
                    className="w-fit h-7"
                  />
                  <p className="font-bold text-nowrap">Madiba</p>
                </div>
                <div className="flex w-full items-center text-center justify-around">
                  <p className="md:w-8 w-6">6</p>
                  <p className="hidden md:flex md:justify-center w-8">3</p>
                  <p className="hidden md:flex md:justify-center w-8">3</p>
                  <p className="hidden md:flex md:justify-center w-8">0</p>
                  <p className="hidden md:flex md:justify-center w-8">14</p>
                  <p className="hidden md:flex md:justify-center w-8">2</p>
                  <p className="md:w-8 w-6">12</p>
                  <p className="font-bold md:w-8 w-6">12</p>
                </div>
              </div>
              <div
                className={`border-b-2 border-l-4 border-l-[#4D8A2F] gap-8 flex h-auto border-gray-300 px-3 py-5 w-full items-center justify-between`}
              >
                <div className="flex md:w-96 md:gap-6 gap-4 w-full">
                  <p className=" flex justify-between font-bold w-10 text-center order items-center">
                    <FaMinus color="grey" />
                    {1}
                  </p>
                  <img
                    src={"/assets/images/madiba-logo.svg"}
                    alt="Logo"
                    className="w-fit h-7"
                  />
                  <p className="font-bold text-nowrap">Madiba</p>
                </div>
                <div className="flex w-full items-center text-center justify-around">
                  <p className="md:w-8 w-6">6</p>
                  <p className="hidden md:flex md:justify-center w-8">3</p>
                  <p className="hidden md:flex md:justify-center w-8">3</p>
                  <p className="hidden md:flex md:justify-center w-8">0</p>
                  <p className="hidden md:flex md:justify-center w-8">14</p>
                  <p className="hidden md:flex md:justify-center w-8">2</p>
                  <p className="md:w-8 w-6">12</p>
                  <p className="font-bold md:w-8 w-6">12</p>
                </div>
              </div>
              <div
                className={`border-b-2 gap-8 flex h-auto border-gray-300 px-3 py-5 w-full items-center justify-between`}
              >
                <div className="flex md:w-96 md:gap-6 gap-4 w-full">
                  <p className=" flex justify-between font-bold w-10 text-center order items-center">
                    <FaMinus color="grey" />
                    {1}
                  </p>
                  <img
                    src={"/assets/images/madiba-logo.svg"}
                    alt="Logo"
                    className="w-fit h-7"
                  />
                  <p className="font-bold text-nowrap">Madiba</p>
                </div>
                <div className="flex w-full items-center text-center justify-around">
                  <p className="md:w-8 w-6">6</p>
                  <p className="hidden md:flex md:justify-center w-8">3</p>
                  <p className="hidden md:flex md:justify-center w-8">3</p>
                  <p className="hidden md:flex md:justify-center w-8">0</p>
                  <p className="hidden md:flex md:justify-center w-8">14</p>
                  <p className="hidden md:flex md:justify-center w-8">2</p>
                  <p className="md:w-8 w-6">12</p>
                  <p className="font-bold md:w-8 w-6">12</p>
                </div>
              </div>
              <div
                className={`border-b-2 gap-8 flex h-auto border-gray-300 px-3 py-5 w-full items-center justify-between`}
              >
                <div className="flex md:w-96 md:gap-6 gap-4 w-full">
                  <p className=" flex justify-between font-bold w-10 text-center order items-center">
                    <FaMinus color="grey" />
                    {1}
                  </p>
                  <img
                    src={"/assets/images/madiba-logo.svg"}
                    alt="Logo"
                    className="w-fit h-7"
                  />
                  <p className="font-bold text-nowrap">TSG Walkers</p>
                </div>
                <div className="flex w-full items-center text-center justify-around">
                  <p className="md:w-8 w-6">6</p>
                  <p className="hidden md:flex md:justify-center w-8">3</p>
                  <p className="hidden md:flex md:justify-center w-8">3</p>
                  <p className="hidden md:flex md:justify-center w-8">0</p>
                  <p className="hidden md:flex md:justify-center w-8">14</p>
                  <p className="hidden md:flex md:justify-center w-8">2</p>
                  <p className="md:w-8 w-6">12</p>
                  <p className="font-bold md:w-8 w-6">12</p>
                </div>
              </div>
            </div>
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
