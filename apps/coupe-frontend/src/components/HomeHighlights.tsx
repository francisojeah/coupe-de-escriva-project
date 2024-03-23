import { Swiper, SwiperSlide } from "swiper/react";
import YoutubeTile from "./HighlightTile";
import axios from "axios";
import { useEffect, useState } from "react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

// Define types for video details
interface VideoDetails {
  videoId: string;
  title: string;
  description: string;
  publishedAt: string;
  duration: string;
  tags: string[];
}

const fetchChannelVideosWithTags = async (
  channelId: string,
  apiKey: string,
  words: string[],
  maxResults: number
): Promise<VideosWithDetails> => {
  try {
    // First, get the uploads playlist ID of the channel
    const channelResponse = await axios.get(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`
    );
    const uploadsPlaylistId =
      channelResponse.data.items[0].contentDetails.relatedPlaylists.uploads;

    // Then, get all videos from the uploads playlist
    const videosResponse = await axios.get(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&key=${apiKey}&maxResults=${maxResults}`
    );

    // Extract video IDs from the response
    const videoIds: string[] = videosResponse.data.items.map(
      (item: any) => item.snippet.resourceId.videoId
    );

    // Fetch more details for each video
    const videosWithDetails: VideosWithDetails = [];
    for (const videoId of videoIds) {
      // Get video details
      const videoDetailsResponse = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=${apiKey}`
      );

      // Extract relevant information from the response
      const videoDetails = videoDetailsResponse.data.items[0];
      const videoTags: string[] = videoDetails.snippet.tags || [];
      const videoDuration: string = videoDetails.contentDetails.duration;

      // Check if the video has any of the specified words in its tags
      if (
        videoTags.some((tag: string) =>
          words.some((word: string) => tag.includes(word))
        )
      ) {
        const video: VideoDetails = {
          videoId: videoId,
          title: videoDetails.snippet.title,
          description: videoDetails.snippet.description,
          publishedAt: videoDetails.snippet.publishedAt,
          duration: videoDuration,
          tags: videoTags,
        };
        videosWithDetails.push(video);
      }
    }

    return videosWithDetails;
  } catch (error) {
    console.error("Error fetching channel videos with words:", error);
    return [];
  }
};

// Define type for the array of videos with details
type VideosWithDetails = VideoDetails[];

const HomeHighlights = () => {
  const [videos, setVideos] = useState<VideosWithDetails>([]);

  

  useEffect(() => {
    const channelId = "UCxU2vvsPfDz5A3hzkSTeCAA";
    const apiKey = "AIzaSyB0mzbY0af2IGnD9CpBqocnuqIA4lnAd5g";
    const words = ["Coupe de Escriva"];
    const maxResults = 10; // Adjust the number of results as needed

    fetchChannelVideosWithTags(channelId, apiKey, words, maxResults)
      .then((videosWithDetails) => {
        setVideos(videosWithDetails);
        console.log(videosWithDetails);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  // Example usage

  const autoplaySettings = {
    delay: 4000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="md:text-3xl text-2xl font-bold">Latest Highlights</div>

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
          {videos.map((video: VideoDetails, index) => (
            <SwiperSlide key={index} style={{ backgroundColor: "unset" }}>
              <YoutubeTile
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
