import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { formatDateWithoutTime } from "../utils/constants";

const HomePosts = () => {
  // Dummy data
  const posts = [
    {
      imageUrl: "/assets/images/hero-sports.svg",
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, laudantium. ",
      publishedAt: "2023-01-01T00:00:00Z",
    },
    {
      imageUrl: "/assets/images/hero-sports.svg",
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, laudantium. ",
      publishedAt: "2023-01-02T00:00:00Z",
    },
    {
      imageUrl: "/assets/images/hero-sports.svg",
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, laudantium. ",
      publishedAt: "2023-01-01T00:00:00Z",
    },
    {
      imageUrl: "/assets/images/hero-sports.svg",
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, laudantium. ",
      publishedAt: "2023-01-02T00:00:00Z",
    },
    {
      imageUrl: "/assets/images/hero-sports.svg",
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, laudantium. ",
      publishedAt: "2023-01-01T00:00:00Z",
    },
    {
      imageUrl: "/assets/images/hero-sports.svg",
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, laudantium. ",
      publishedAt: "2023-01-02T00:00:00Z",
    },
    {
      imageUrl: "/assets/images/hero-sports.svg",
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, laudantium. ",
      publishedAt: "2023-01-01T00:00:00Z",
    },
    {
      imageUrl: "/assets/images/hero-sports.svg",
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, laudantium. ",
      publishedAt: "2023-01-02T00:00:00Z",
    },
  ];

  const autoplaySettings = {
    delay: 4000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="md:text-3xl text-2xl font-bold">News & Stories</div>
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
          {posts.map((post, index) => (
            <SwiperSlide key={index} style={{ backgroundColor: "unset" }}>
              <div className="youtube-tile cursor-pointer flex flex-col gap-3">
                <div className="relative overflow-hidden rounded-2xl">
                  <div
                    className="w-full bg-[#D9D9D9] border border-[#D9D9D9] scale-110 hover:scale-125 h-36 md:h-44"
                    style={{
                      backgroundImage: `url(${post.imageUrl})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}
                  ></div>
                </div>
                <div className="md:px-4 px-2 flex flex-col justify-between md:h-24 h-28 hover:underline">
                  <p className="text-sm font-medium">{post.title}</p>
                  <p className="text-sm">
                    {formatDateWithoutTime(post.publishedAt)}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HomePosts;
