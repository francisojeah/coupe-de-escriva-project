import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { GameWeek, formatDateWithoutTime } from "../utils/constants";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  useGetPicturesBySeasonSportWithLimitQuery,
  useGetSeasonsQuery,
} from "../store/slices/appSlice";
import { useEffect, useState } from "react";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { Dropdown, DropdownItem } from "flowbite-react";

const HomePictures = () => {
  // Dummy data
  const autoplaySettings = {
    delay: 4000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  };

  const [selectedGameWeek, setSelectedGameWeek] = useState(GameWeek.GameWeek1);

  const activeSportMenu: any = useSelector<RootState>((state) => state.sport);

  const { data: seasonsData } = useGetSeasonsQuery();
  const defaultSeason = seasonsData?.find(
    (season: any) => season.currentSeason
  );

  const { data: picturesData } = useGetPicturesBySeasonSportWithLimitQuery(
    {
      seasonId: defaultSeason?._id,
      sport: activeSportMenu?.sport,
      maxLimit: 10,
    },
    {
      refetchOnMountOrArgChange: 10,
    }
  );

  function getISOWeek(date: Date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  }

  useEffect(() => {
    if (!picturesData) return;

    const todayWeek = getISOWeek(new Date());
    let closestDiff = Number.MAX_SAFE_INTEGER;
    let closestGameweek: GameWeek = GameWeek.GameWeek1;

    for (const picture of picturesData) {
      const pictureDate = new Date(picture.date);
      const pictureWeek = getISOWeek(pictureDate);

      const diff = Math.abs(todayWeek - pictureWeek);
      if (diff < closestDiff) {
        closestDiff = diff;
        closestGameweek = picture?.gameweek;
      }
    }

    setSelectedGameWeek(closestGameweek);
  }, [picturesData]);

  const handleGameweekChange = (gameweek: GameWeek) => {
    setSelectedGameWeek(gameweek);
  };


  return (
    <div className="flex flex-col gap-8">
      <div className="flex w-full items-center justify-between">
        <p className="md:text-3xl text-2xl font-bold">Image Gallery</p>
        <Link to={"/images"}>
          <div className="flex gap-2 cursor-pointer hover:text-custom-primary-1 items-center">
            <p className="md:text-base text-sm">More Images </p>
            <FaArrowRight size={"13"} />
          </div>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row md:gap-12 gap-4">
        <div className="flex flex-col gap-2">
          <p className="font-medium text-base md:text-lg">Gameweek</p>
          <div className="border-2 w-[15.25rem] border-[#D9D9D9] rounded-[0.5rem]">
            <Dropdown
              color=""
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
              }}
              label={selectedGameWeek || "Select GameWeek"}
              placement="bottom"
              arrowIcon={false}
            >
              {Object.values(GameWeek).map((gameweek) => (
                <DropdownItem
                  key={gameweek}
                  onClick={() => handleGameweekChange(gameweek)}
                >
                  {gameweek}
                </DropdownItem>
              ))}
            </Dropdown>
          </div>
        </div>
      </div>

      <div className="w-full overflow-hidden">
        <Swiper
          slidesPerView={4}
          spaceBetween={10}
          breakpoints={{
            300: { slidesPerView: 2, spaceBetween: 10 },
            750: { slidesPerView: 3, spaceBetween: 20 },
            1280: { slidesPerView: 4, spaceBetween: 10 },
          }}
          loop={true}
          autoplay={autoplaySettings}
          modules={[Autoplay]}
        >
          {Array.isArray(picturesData) &&
            picturesData?.map((picture: any, index: any) => (
              <>
              {picture.gameweek === selectedGameWeek && (
              <SwiperSlide key={index} style={{ backgroundColor: "unset" }}>
                <Link to={`/images/${picture?._id}`}>
                  <div className="cursor-pointer flex flex-col gap-3">
                    <div className="relative overflow-hidden rounded-2xl">
                      <div
                        className="w-full bg-[#D9D9D9] border border-[#D9D9D9] scale-110 hover:scale-125 h-36 md:h-44"
                        style={{
                          backgroundImage: `url(${picture?.image || "/assets/images/hero-sports.svg"})`,
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                        }}
                      ></div>
                    </div>
                    <div className="md:px-4 px-2 flex flex-col justify-between md:h-24 h-28 hover:underline">
                      <p className="text-sm">
                        {formatDateWithoutTime(picture.date)}
                      </p>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
               )}
               </>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HomePictures;
