import { FaPlay } from "react-icons/fa";
import YoutubeModal from "./YoutubeModal";
import { useState } from "react";
import { formatDateWithoutTime } from "../utils/constants";

const YoutubeTile = ({
  useType,
  videoId,
  title,
  publishedAt,
  duration,
}: any) => {
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  // Format duration from ISO 8601 duration format to mm:ss
  const formatDuration = (isoDuration: any) => {
    const durationRegex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
    const [, , minutes, seconds]: any = durationRegex.exec(isoDuration);
    const formattedMinutes = minutes ? parseInt(minutes) : 0;
    const formattedSeconds = seconds ? parseInt(seconds) : 0;
    return `${formattedMinutes}:${formattedSeconds.toString().padStart(2, "0")}`;
  };

  const formattedDuration = formatDuration(duration);

  const [openYoutubeModal, setOpenYoutubeModal] = useState(false);

  const handleYoutube = () => {
    setOpenYoutubeModal(true);
  };

  return (
    <>
      <div
        className="youtube-tile cursor-pointer flex flex-col gap-3"
        onClick={handleYoutube}
      >
        <div className="relative overflow-hidden rounded-2xl">
          <div
            className={`w-full scale-110 bg-[#D9D9D9] border border-[#D9D9D9] hover:scale-125 ${useType === "home-page" ? "h-36 md:h-44" : "h-36 md:h-44 lg:h-56"}`}
            style={{
              backgroundImage: `url(${thumbnailUrl})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          ></div>
          <div className="absolute flex bottom-0 text-center items-center gap-1.5 left-0 bg-custom-primary-1 rounded-tr-xl text-white text-sm py-1.5 pl-4 px-2.5 font-bold">
            <FaPlay color="white" />
            {formattedDuration}
          </div>
        </div>
        <div className="md:px-4 px-2 flex flex-col justify-between sm:h-24 h-40 hover:underline">
          <p className="text-sm font-medium">{title}</p>
          <p className="text-sm">{formatDateWithoutTime(publishedAt)}</p>
        </div>
      </div>
      <YoutubeModal
        openModal={openYoutubeModal}
        setOpenModal={setOpenYoutubeModal}
        videoId={videoId}
      />
    </>
  );
};

export default YoutubeTile;
