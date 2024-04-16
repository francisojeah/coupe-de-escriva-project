import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { formatDateWithoutTime } from "../utils/constants";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  useGetPostsBySeasonWithLimitQuery,
  useGetSeasonsQuery,
} from "../store/slices/appSlice";

const HomePosts = () => {
  // Dummy data
  const autoplaySettings = {
    delay: 4000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  };

  const { data: seasonsData } = useGetSeasonsQuery();
  const defaultSeason = seasonsData?.find(
    (season: any) => season.currentSeason
  );

  const { data: postsData } = useGetPostsBySeasonWithLimitQuery(
    {
      seasonId: defaultSeason?._id,
      maxLimit: 10,
    },
    {
      refetchOnMountOrArgChange: 10,
    }
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex w-full items-center justify-between">
        <p className="md:text-3xl text-2xl font-bold">News & Stories</p>
        <Link to={"/posts"}>
          <div className="flex gap-2 cursor-pointer hover:text-custom-primary-1 items-center">
            <p className="md:text-base text-sm">More Posts </p>
            <FaArrowRight size={"13"} />
          </div>
        </Link>
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
          {Array.isArray(postsData) &&
            postsData?.map((post: any, index: any) => (
              <SwiperSlide key={index} style={{ backgroundColor: "unset" }}>
                <Link to={`/posts/${post?._id}`}>
                  <div className="cursor-pointer flex flex-col gap-3">
                    <div className="relative overflow-hidden rounded-2xl">
                      <div
                        className="w-full bg-[#D9D9D9] border border-[#D9D9D9] scale-110 hover:scale-125 h-36 md:h-44"
                        style={{
                          backgroundImage: `url(${post?.image || "/assets/images/hero-sports.svg"})`,
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                        }}
                      ></div>
                    </div>
                    <div className="md:px-4 px-2 flex flex-col justify-between md:h-24 h-28 hover:underline">
                      <p className="text-sm font-medium">{post.title}</p>
                      <p className="text-sm">{post.author}</p>
                      <p className="text-sm">
                        {formatDateWithoutTime(post.createdAt)}
                      </p>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HomePosts;
