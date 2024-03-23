import { Dropdown, DropdownItem } from "flowbite-react";
import PageLayout from "../../components/PageLayout";
import { useState } from "react";

const MatchesPage = () => {
  const [selecteSeason] = useState("2023/24");
  const [selectedType] = useState("Mens");
  const [selectedGameWeek] = useState("Gameweek 1");

  return (
    <PageLayout>
      <div className="flex flex-col gap-12">
        <div className="text-3xl md:text-4xl font-bold">Fixtures & Results</div>
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
            <p className="font-medium text-base md:text-lg">Gameweek</p>
            <div className="border-2 w-[15.25rem] border-[#D9D9D9] rounded-[0.5rem]">
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

        <div className="flex flex-col gap-4">
          <div className="border flex p-4 justify-center items-center flex-col gap-4 border-[#D9D9D9] rounded-xl">
            <p className="font-bold">Wednesday May 24</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <p className="font-semibold">Cirok</p>
                <img
                  src={"/assets/images/cirok-logo.svg"}
                  alt="Logo"
                  className="w-fit h-[3.5rem]"
                />
              </div>
              <div className="border flex border-[#D9D9D9] px-2 py-1">
                <p className="border-r-2 px-1 border-black">1</p>
                <p className="px-1">1</p>
              </div>
              <div className="flex items-center gap-1">
                <img
                  src={"/assets/images/madiba-logo.svg"}
                  alt="Logo"
                  className="w-fit h-[3.5rem]"
                />
                <p className="font-semibold">Madiba</p>
              </div>
            </div>
          </div>
          <div className="border flex p-4 justify-center items-center flex-col gap-4 border-[#D9D9D9] rounded-xl">
            <p className="font-bold">Wednesday May 24</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <p className="font-semibold">Cirok</p>
                <img
                  src={"/assets/images/cirok-logo.svg"}
                  alt="Logo"
                  className="w-fit h-[3.5rem]"
                />
              </div>
              <div className="border flex border-[#D9D9D9] px-2 gap-0.5 py-1">
                <p className="border-r-2 px-1 border-black">1</p>
                <p className="px-1">1</p>
              </div>
              <div className="flex items-center gap-1">
                <img
                  src={"/assets/images/madiba-logo.svg"}
                  alt="Logo"
                  className="w-fit h-[3.5rem]"
                />
                <p className="font-semibold">Madiba</p>
              </div>
            </div>
          </div>
          <div className="border flex p-4 justify-center items-center flex-col gap-4 border-[#D9D9D9] rounded-xl">
            <p className="font-bold">Wednesday May 24</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <p className="font-semibold">Cirok</p>
                <img
                  src={"/assets/images/cirok-logo.svg"}
                  alt="Logo"
                  className="w-fit h-[3.5rem]"
                />
              </div>
              <div className="border flex border-[#D9D9D9] px-2 py-1">
                <p className="border-r-2 px-1 border-black">1</p>
                <p className="px-1">1</p>
              </div>
              <div className="flex items-center gap-1">
                <img
                  src={"/assets/images/madiba-logo.svg"}
                  alt="Logo"
                  className="w-fit h-[3.5rem]"
                />
                <p className="font-semibold">Madiba</p>
              </div>
            </div>
          </div>
          <div className="border flex p-4 justify-center items-center flex-col gap-4 border-[#D9D9D9] rounded-xl">
            <p className="font-bold">Wednesday May 24</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <p className="font-semibold">Cirok</p>
                <img
                  src={"/assets/images/cirok-logo.svg"}
                  alt="Logo"
                  className="w-fit h-[3.5rem]"
                />
              </div>
              <div className="border flex border-[#D9D9D9] px-2 py-1">
                <p className="border-r-2 px-1 border-black">1</p>
                <p className="px-1">1</p>
              </div>
              <div className="flex items-center gap-1">
                <img
                  src={"/assets/images/madiba-logo.svg"}
                  alt="Logo"
                  className="w-fit h-[3.5rem]"
                />
                <p className="font-semibold">Madiba</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default MatchesPage;
