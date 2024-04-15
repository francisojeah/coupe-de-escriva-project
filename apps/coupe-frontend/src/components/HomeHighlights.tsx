import { Swiper, SwiperSlide } from "swiper/react";
import YoutubeTile from "./HighlightTile";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { VideoDetails } from "../utils/constants";
import { useGetVideosWithLimitQuery } from "../store/slices/appSlice";
// require('dotenv').config();


const HomeHighlights = () => {
  // const dispatch = useDispatch<any>();

  // const userSlice = useSelector<RootState, UserStateProps>(
  //   (state) => state.user
  // );

  const { data: videoData } = useGetVideosWithLimitQuery(10);


  
  const autoplaySettings = {
    delay: 4000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex w-full items-center justify-between">
        <p className="md:text-3xl text-2xl font-bold">Latest Highlights</p>
        <Link to={"/videos"}>
          <div className="flex gap-2 cursor-pointer hover:text-custom-primary-1 items-center">
            <p className="md:text-base text-sm">More Videos </p>
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
          {videoData?.map((video: VideoDetails, index: any) => (
            <SwiperSlide key={index} style={{ backgroundColor: "unset" }}>
              <YoutubeTile
                useType={"home-page"}
                key={video.videoId}
                videoId={video.videoId}
                description={video.description}
                title={video.title}
                publishedAt={video.publishedAt}
                duration={video.duration}
                tags={video.tags}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HomeHighlights;
