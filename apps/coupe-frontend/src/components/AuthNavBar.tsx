import { useCallback, useEffect } from "react";
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
} from "flowbite-react";
import { UserStateProps } from "../store/interfaces/user.interface";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { appApi } from "../store/slices/appSlice";
import { logoutUser } from "../store/slices/userSlice";
import { Link, useLocation } from "react-router-dom";
import { updateMenu } from "../store/slices/menuSlice";
import { updateSport } from "../store/slices/sportSlice";
import { SportsType } from "../utils/constants";

const AuthNavBar = () => {
  const userSlice = useSelector<RootState, UserStateProps>(
    (state) => state.user
  );

  const location = useLocation();
  const dispatch = useDispatch();
  const activeNavBarMenu = useSelector<RootState>((state) => state.menu);
  const activeSportMenu = useSelector<RootState>((state) => state.sport);

  const { menu }: any = activeNavBarMenu;
  const { sport }: any = activeSportMenu;

  const handleNavBarMenuClick = (navBarMenu: number) => {
    dispatch(updateMenu(navBarMenu));
  };

  const handleSportMenuClick = (sport: string) => {
    dispatch(updateSport(sport));
  };

  const menus = [
    {
      title: "Home",
      link: "home",
      isActive: true,
    },
    {
      title: "Standings",
      link: "standings",
      isActive: false,
    },
    {
      title: "Fixtures & Results",
      link: "matches",
      isActive: false,
    },
    {
      title: "Teams",
      link: "teams",
      isActive: false,
    },
    {
      title: "Stats",
      link: "stats",
      isActive: false,
    },
    {
      title: "Players",
      link: "players",
      isActive: false,
    },
    {
      title: "Fantasy Coupe",
      link: "fantasy",
      isActive: false,
    },
    // {
    //   title: "Table Predictor",
    //   link: "table-predictor",
    //   isActive: false,
    // },
  ];

  const sports = [
    {
      title: "Football",
      link: SportsType.FOOTBALL,
      icon: "/assets/icons/football-icon.svg",
      isActive: true,
    },
    {
      title: "Basketball",
      link: SportsType.BASKETBALL,
      icon: "/assets/icons/basketball-icon.svg",
      isActive: false,
    },
    {
      title: "Volleyball",
      link: SportsType.VOLLEYBALL,
      icon: "/assets/icons/volleyball-icon.svg",
      isActive: false,
    },
  ];

  const handleLogout = useCallback(() => {
    dispatch(appApi.util.resetApiState());
    dispatch(logoutUser());
  }, []);

  // const {data: currentSessionData} = useGetCurrentSessionQuery();

  useEffect(() => {
    const pathName = location.pathname
      .split("/")
      .filter((element) => element !== "");
    const pathTitle = pathName[0];
    const navBarMenuTitle = menus.find(
      (navBarmenu) => navBarmenu.link === pathTitle
    )?.title;

    if (navBarMenuTitle && navBarMenuTitle !== activeNavBarMenu) {
      handleNavBarMenuClick(
        menus.findIndex((navBarmenu) => navBarmenu.title === navBarMenuTitle)
      );
    }
  }, [location.pathname, menus, activeNavBarMenu, dispatch]);

  return (
    <div className=" flex flex-col w-full justify-between items-center bg-white shadow-md z-20 top-0 left-0 fixed">
      <div className="w-full  flex justify-center items-center border-b py-1 px-4 border-b-[#E0E1E3]">
        <div className="w-full max-w-[90rem] flex items-center">
          <div className="flex text-[0.875rem] gap-4 h-full w-full md:w-fit  whitespace-nowrap">
            {sports.map(({ title, link, icon }, index) => (
              <div
                className={`w-full h-full cursor-pointer ${
                  sport === link
                    ? "border-b-2 border-b-custom-primary-1 text-custom-primary-1 font-semibold"
                    : ""
                }`}
                key={index}
                onClick={() => handleSportMenuClick(link)}
              >
                <div
                  className={`flex w-full h-full gap-2 px-2 items-center text-[#888C90] text-[0.75rem]`}
                >
                  <img src={icon} alt="Logo" className="w-fit h-[0.9375rem]" />
                  {title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex w-full max-w-[90rem] h-full items-center justify-between py-2 px-4">
        <Link className="flex h-full gap-1" to="/">
          <img
            src="/assets/images/coupe-logo.svg"
            alt="Logo"
            className="w-fit h-[2.5rem]"
          />
          <p className="self-center text-black  whitespace-nowrap text-xl md:text-[1.375rem] font-bold dark:text-white">
            COUPE DE ESCRIVA
          </p>
        </Link>

        <div className="lg:flex hidden text-[0.875rem] gap-6 h-full whitespace-nowrap">
          {menus.map(({ title, link }, index) => (
            <Link
              className={`w-full h-full py-1 ${
                menu === index
                  ? "border-b-2 border-b-custom-primary-1 text-custom-primary-1 font-semibold"
                  : ""
              }`}
              to={`/${link}`}
              key={index}
            >
              <div className={`flex w-full h-full items-center`}>{title}</div>
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex md:order-2 gap-1 md:gap-3">
          {userSlice?.user?.email ? (
            <Dropdown
              arrowIcon={true}
              inline
              className="md:w-[20%]"
              label={
                <div className="flex items-center gap-4">
                  <Avatar alt="User" img={userSlice?.user?.profileImage} rounded />
                </div>
              }
            >
              <DropdownHeader>
            <p className="text-xs font-bold text-custom-primary-1">{`${
              userSlice?.user?.firstname || "Coupe"
            } ${userSlice?.user?.lastname || "User"}`}</p>
            <span className="block truncate text-sm font-medium">
              Coupe de Escriva user
            </span>
          </DropdownHeader>
              <DropdownItem onClick={handleLogout} className="text-base">
                Sign out
              </DropdownItem>
            </Dropdown>
          ) : (
            <Link to={"/login"}>
              <div className="w-[5.5rem] h-[2.5rem]  flex justify-center items-center bg-custom-primary-1 hover:bg-custom-primary-2 text-white rounded-[0.5rem] ">
                <p className="text-sm">Login</p>
              </div>
            </Link>
          )}
        </div>

        <div className="flex lg:hidden md:order-2 gap-1 md:gap-3">
          <Dropdown
            arrowIcon={false}
            inline
            className="md:w-[35%]"
            label={
              userSlice?.user?.email ? (
                <>
                  <div className="flex items-center gap-4">
                    <Avatar
                      alt="User"
                      img={userSlice?.user?.profileImage}
                      rounded
                    />
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 17 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 1h15M1 7h15M1 13h15"
                      />
                    </svg>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 17 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1h15M1 7h15M1 13h15"
                    />
                  </svg>
                </div>
              )
            }
          >
            <DropdownHeader>
            <p className="text-xs font-bold text-custom-primary-1">{`${
              userSlice?.user?.firstname || "Coupe"
            } ${userSlice?.user?.lastname || "User"}`}</p>
            <span className="block truncate text-sm font-medium">
              Coupe de Escriva user
            </span>
          </DropdownHeader>
            {menus.map(({ title, link }, index) => (
              <DropdownItem className="w-full" key={index}>
                <Link className="w-full" to={`/${link}`} key={index}>
                  <div className="flex w-full text-base">{title}</div>
                </Link>
              </DropdownItem>
            ))}
            <DropdownDivider />

            {userSlice?.user?.email ? (
              <DropdownItem onClick={handleLogout} className="text-base">
                Sign out
              </DropdownItem>
            ) : (
              <DropdownItem className="w-full">
                <Link to={"/login"}>
                  <div className="w-[5.5rem] h-[2.5rem]  flex justify-center items-center bg-custom-primary-1 hover:bg-custom-primary-2 text-white rounded-[0.5rem] ">
                    <p className="text-sm">Login</p>
                  </div>
                </Link>
              </DropdownItem>
            )}
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default AuthNavBar;
