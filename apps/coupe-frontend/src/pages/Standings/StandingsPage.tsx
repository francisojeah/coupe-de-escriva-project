import { Dropdown, DropdownItem } from "flowbite-react";
import PageLayout from "../../components/PageLayout";
import { useState } from "react";
import { FaMinus } from "react-icons/fa";

const StandingsPage = () => {
  const [selecteSeason] = useState("2023/24");
  const [selectedType] = useState("Mens");

  return (
    <PageLayout>
      <div className="flex flex-col gap-8 md:gap-12">
        <div className="text-3xl md:text-4xl font-bold">Standings</div>
        <div className="flex flex-col md:flex-row md:gap-12 gap-4">
          <div className="flex flex-col gap-2">
            <p className="font-medium text-base md:text-lg">Season</p>
            <div className="border-2 w-[15.25rem] border-[#D9D9D9] rounded-[0.5rem]">
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
            <p className="font-medium text-base md:text-lg">Type</p>
            <div className="border-2 w-[15.25rem] border-[#D9D9D9] rounded-[0.5rem]">
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

        <div className="flex flex-col w-full overflow-x-auto">
          <div className="flex gap-8 text-gray-600 font-semibold justify-between px-3 py-5 w-full items-center text-center">
            <div className="flex w-96 gap-6">
              <p className="px-2">Pos</p>
              <p className="">Team</p>
            </div>
            <div className="flex w-full text-center justify-around">
              <p className="w-8">Pl</p>
              <p className="w-8">W</p>
              <p className="w-8">D</p>
              <p className="w-8">L</p>
              <p className="w-8">GF</p>
              <p className="w-8">GA</p>
              <p className="w-8">GD</p>
              <p className="w-8">Pts</p>
            </div>
            <div className="flex w-60">
              <p className="">Last 5 Games</p>
            </div>
          </div>
          <div className="flex flex-col  items-center w-full">
            <div
              className={`border-b-2 border-l-4 border-l-[#4D8A2F] gap-8 flex h-auto border-gray-300 px-3 py-5 w-full items-center justify-between`}
            >
              <div className="flex w-96 gap-6">
                <p className=" flex justify-between font-bold w-10 text-center order items-center">
                  <FaMinus color="grey" />
                  {1}
                </p>
                <img
                  src={"/assets/images/madiba-logo.svg"}
                  alt="Logo"
                  className="w-fit h-7"
                />
                <p className="font-bold">Madiba</p>
              </div>
              <div className="flex w-full items-center text-center justify-around">
                <p className="w-8">6</p>
                <p className="w-8">3</p>
                <p className="w-8">3</p>
                <p className="w-8">0</p>
                <p className="w-8">14</p>
                <p className="w-8">2</p>
                <p className="w-8">12</p>
                <p className="font-bold w-8">12</p>
              </div>
              <div className="flex w-60 justify-between">
                <div className="h-5 w-5 bg-[#00DB74] border flex border-[#D9D9D9] justify-center items-center rounded-full">
                <img
                  src={"/assets/icons/tik-icon.svg"}
                  alt="Logo"
                  className="w-3 h-3"
                />
                </div>
                <div className="h-5 w-5 bg-[#00DB74] border flex border-[#D9D9D9] justify-center items-center rounded-full">
                <img
                  src={"/assets/icons/tik-icon.svg"}
                  alt="Logo"
                  className="w-3 h-3"
                />
                </div>
                <div className="h-5 w-5 bg-[#E0005E] border flex border-[#D9D9D9] justify-center items-center rounded-full">
                <img
                  src={"/assets/icons/cancel-icon.svg"}
                  alt="Logo"
                  className="w-2 h-2"
                />
                </div>
                <div className="h-5 w-5 bg-[#00DB74] border flex border-[#D9D9D9] justify-center items-center rounded-full">
                <img
                  src={"/assets/icons/tik-icon.svg"}
                  alt="Logo"
                  className="w-3 h-3"
                />
                </div>
                <div className="h-5 w-5 border flex border-[#D9D9D9] justify-center items-center rounded-full">
               
                </div>
              </div>
            </div>
            <div
              className={`border-b-2 border-l-4 border-l-[#4D8A2F] gap-8 flex h-auto border-gray-300 px-3 py-5 w-full items-center justify-between`}
            >
              <div className="flex w-96 gap-6">
                <p className=" flex justify-between font-bold w-10 text-center order items-center">
                  <FaMinus color="grey" />
                  {1}
                </p>
                <img
                  src={"/assets/images/madiba-logo.svg"}
                  alt="Logo"
                  className="w-fit h-7"
                />
                <p className="font-bold">Madiba</p>
              </div>
              <div className="flex w-full items-center text-center justify-around">
                <p className="w-8">6</p>
                <p className="w-8">3</p>
                <p className="w-8">3</p>
                <p className="w-8">0</p>
                <p className="w-8">14</p>
                <p className="w-8">2</p>
                <p className="w-8">12</p>
                <p className="font-bold w-8">12</p>
              </div>
              <div className="flex w-60 justify-between">
                <div className="h-5 w-5 bg-[#00DB74] border flex border-[#D9D9D9] justify-center items-center rounded-full">
                <img
                  src={"/assets/icons/tik-icon.svg"}
                  alt="Logo"
                  className="w-3 h-3"
                />
                </div>
                <div className="h-5 w-5 bg-[#00DB74] border flex border-[#D9D9D9] justify-center items-center rounded-full">
                <img
                  src={"/assets/icons/tik-icon.svg"}
                  alt="Logo"
                  className="w-3 h-3"
                />
                </div>
                <div className="h-5 w-5 bg-[#E0005E] border flex border-[#D9D9D9] justify-center items-center rounded-full">
                <img
                  src={"/assets/icons/cancel-icon.svg"}
                  alt="Logo"
                  className="w-2 h-2"
                />
                </div>
                <div className="h-5 w-5 bg-[#00DB74] border flex border-[#D9D9D9] justify-center items-center rounded-full">
                <img
                  src={"/assets/icons/tik-icon.svg"}
                  alt="Logo"
                  className="w-3 h-3"
                />
                </div>
                <div className="h-5 w-5 border flex border-[#D9D9D9] justify-center items-center rounded-full">
               
                </div>
              </div>
            </div>
            <div
              className={`border-b-2 gap-8 flex h-auto border-gray-300 px-3 py-5 w-full items-center justify-between`}
            >
              <div className="flex w-96 gap-6">
                <p className=" flex justify-between font-bold w-10 text-center order items-center">
                  <FaMinus color="grey" />
                  {1}
                </p>
                <img
                  src={"/assets/images/madiba-logo.svg"}
                  alt="Logo"
                  className="w-fit h-7"
                />
                <p className="font-bold">Madiba</p>
              </div>
              <div className="flex w-full items-center text-center justify-around">
                <p className="w-8">6</p>
                <p className="w-8">3</p>
                <p className="w-8">3</p>
                <p className="w-8">0</p>
                <p className="w-8">14</p>
                <p className="w-8">2</p>
                <p className="w-8">12</p>
                <p className="font-bold w-8">12</p>
              </div>
              <div className="flex w-60 justify-between">
                <div className="h-5 w-5 bg-[#00DB74] border flex border-[#D9D9D9] justify-center items-center rounded-full">
                <img
                  src={"/assets/icons/tik-icon.svg"}
                  alt="Logo"
                  className="w-3 h-3"
                />
                </div>
                <div className="h-5 w-5 bg-[#00DB74] border flex border-[#D9D9D9] justify-center items-center rounded-full">
                <img
                  src={"/assets/icons/tik-icon.svg"}
                  alt="Logo"
                  className="w-3 h-3"
                />
                </div>
                <div className="h-5 w-5 bg-[#E0005E] border flex border-[#D9D9D9] justify-center items-center rounded-full">
                <img
                  src={"/assets/icons/cancel-icon.svg"}
                  alt="Logo"
                  className="w-2 h-2"
                />
                </div>
                <div className="h-5 w-5 bg-[#00DB74] border flex border-[#D9D9D9] justify-center items-center rounded-full">
                <img
                  src={"/assets/icons/tik-icon.svg"}
                  alt="Logo"
                  className="w-3 h-3"
                />
                </div>
                <div className="h-5 w-5 border flex border-[#D9D9D9] justify-center items-center rounded-full">
               
                </div>
              </div>
            </div>
            <div
              className={`border-b-2 gap-8 flex h-auto border-gray-300 px-3 py-5 w-full items-center justify-between`}
            >
              <div className="flex w-96 gap-6">
                <p className=" flex justify-between font-bold w-10 text-center order items-center">
                  <FaMinus color="grey" />
                  {1}
                </p>
                <img
                  src={"/assets/images/madiba-logo.svg"}
                  alt="Logo"
                  className="w-fit h-7"
                />
                <p className="font-bold">Madiba</p>
              </div>
              <div className="flex w-full items-center text-center justify-around">
                <p className="w-8">6</p>
                <p className="w-8">3</p>
                <p className="w-8">3</p>
                <p className="w-8">0</p>
                <p className="w-8">14</p>
                <p className="w-8">2</p>
                <p className="w-8">12</p>
                <p className="font-bold w-8">12</p>
              </div>
              <div className="flex w-60 justify-between">
                <div className="h-5 w-5 bg-[#00DB74] border flex border-[#D9D9D9] justify-center items-center rounded-full">
                <img
                  src={"/assets/icons/tik-icon.svg"}
                  alt="Logo"
                  className="w-3 h-3"
                />
                </div>
                <div className="h-5 w-5 bg-[#00DB74] border flex border-[#D9D9D9] justify-center items-center rounded-full">
                <img
                  src={"/assets/icons/tik-icon.svg"}
                  alt="Logo"
                  className="w-3 h-3"
                />
                </div>
                <div className="h-5 w-5 bg-[#E0005E] border flex border-[#D9D9D9] justify-center items-center rounded-full">
                <img
                  src={"/assets/icons/cancel-icon.svg"}
                  alt="Logo"
                  className="w-2 h-2"
                />
                </div>
                <div className="h-5 w-5 bg-[#00DB74] border flex border-[#D9D9D9] justify-center items-center rounded-full">
                <img
                  src={"/assets/icons/tik-icon.svg"}
                  alt="Logo"
                  className="w-3 h-3"
                />
                </div>
                <div className="h-5 w-5 border flex border-[#D9D9D9] justify-center items-center rounded-full">
               
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default StandingsPage;
