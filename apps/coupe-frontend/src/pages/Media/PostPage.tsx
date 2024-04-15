import { useParams } from "react-router-dom";
import { useGetPostsByIdQuery } from "../../store/slices/appSlice";
import PageLayout from "../../components/PageLayout";
import { formatDateWithoutTime } from "../../utils/constants";
import PageLoader from "../../components/PageLoader";
import MetaTags from "../../components/MetaTags";

const PostPage = () => {
  const params = useParams();
  const postId = params?.id;

  const { data: postData, isLoading: postIsLoading } =
    useGetPostsByIdQuery(postId);

  return (
    <PageLayout>
      <>
      <MetaTags
          title={"Post | Coupe de Escriva"}
          description={"Coupe de Escriva"}
          pageUrl={window.location.href}
        />
      {postIsLoading ? (
        <PageLoader />
      ) : (
        <div className=" flex flex-col gap-12">
          <div className="md:px-4 px-2 flex flex-col justify-between">
            <p className="text-2xl md:text-3xl lg:text-4xl mb-8 font-bold">
              {postData?.title}
            </p>
            <p className="">{formatDateWithoutTime(postData?.createdAt)}</p>
          </div>
          <div className="relative overflow-hidden rounded-2xl">
            <div
              className="w-full bg-[#D9D9D9] border border-[#D9D9D9] h-64 md:h-96 lg:h-screen"
              style={{
                backgroundImage: `url(${postData?.image || "/assets/images/hero-sports.svg"})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            ></div>
          </div>
          <div
            dangerouslySetInnerHTML={{
              // @ts-ignore
              __html: postData?.content?.replace(
                /<a\b([^>]*)>(.*?)<\/a>/g,
                `<a $1 style='color: #0F5EFE;'>$2</a>`
              ),
            }} className="text-lg"
          ></div>
        </div>
      )}
      </>
    </PageLayout>
  );
};

export default PostPage;
