import { useState } from "react";
import PageLayout from "../../components/PageLayout";
import Pagination from "../../components/Pagination";
import PageLoader from "../../components/PageLoader";
import { VideoDetails } from "../../utils/constants";
import YoutubeTile from "../../components/HighlightTile";
import { useGetVideosQuery } from "../../store/slices/appSlice";
import MetaTags from "../../components/MetaTags";

const VideosPage = () => {
  // const dispatch = useDispatch<any>();

  const [currentPage, setCurrentPage] = useState(1);

  // const userSlice = useSelector<RootState, UserStateProps>(
  //   (state) => state.user
  // );

  const { data: videoData, isLoading: isLoadingVideo } = useGetVideosQuery(
    undefined,
    {
      refetchOnMountOrArgChange: 3600,
    }
  );

  const cardsPerPage = 9;
  const totalCards = videoData?.length || 0;

  const totalPages = Math.ceil(totalCards / cardsPerPage);

  const onPageChange = (page: number) => setCurrentPage(page);

  // Generate cards for the current page
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentVideos = videoData?.slice(startIndex, endIndex);

  return (
    <PageLayout>
      <>
        <MetaTags
          title={"Videos | Coupe de Escriva"}
          pageUrl={window.location.href}
        />
        <div className="flex flex-col gap-8 md:gap-12">
          <div className="text-3xl md:text-4xl font-bold">Videos</div>

          <>
            {isLoadingVideo ? (
              <PageLoader />
            ) : (
              <>
                <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-2  h-full md:gap-x-6 md:gap-y-10 gap-4">
                  {currentVideos?.map((video: VideoDetails) => (
                    <YoutubeTile
                      useType={"video-page"}
                      key={video.videoId}
                      videoId={video.videoId}
                      description={video.description}
                      title={video.title}
                      publishedAt={video.publishedAt}
                      duration={video.duration}
                      tags={video.tags}
                    />
                  ))}
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={onPageChange}
                />
              </>
            )}
          </>
        </div>
      </>
    </PageLayout>
  );
};

export default VideosPage;
