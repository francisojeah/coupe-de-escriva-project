// import { useState } from "react";
// import PageLayout from "../../components/PageLayout";
// import { Dropdown, DropdownItem } from "flowbite-react";
// import { formatDateWithoutTime } from "../../utils/constants";
// import Pagination from "../../components/Pagination";
// import { useGetSeasonsQuery } from "../../store/slices/appSlice";
// import PageLoader from "../../components/PageLoader";
// import { Link } from "react-router-dom";
// import AddPostModal from "../../components/AddPostModal";
// import { useSelector } from "react-redux";
// import { RootState } from "../../store/store";
// import { Role, UserStateProps } from "../../store/interfaces/user.interface";
// import MetaTags from "../../components/MetaTags";

// const PostsPage = () => {
//   const [openAddPostModal, setOpenAddPostModal] = useState(false);
//   const { data: seasonsData } = useGetSeasonsQuery();
//   const defaultSeason = seasonsData?.find(
//     (season: any) => season.currentSeason
//   );

//   const userSlice = useSelector<RootState, UserStateProps>(
//     (state) => state.user
//   );

//   const [selectedSeason, setSelectedSeason] = useState(defaultSeason);

//   const [currentPage, setCurrentPage] = useState(1);

//   const handleSeasonChange = (season: any) => {
//     setSelectedSeason(season);
//   };

//   const handleAddPost = () => {
//     setOpenAddPostModal(true);
//   };

//   const { data: postsData, isLoading: postsIsLoading } =
//     useGetPostsBySeasonQuery(selectedSeason?._id, {
//       refetchOnMountOrArgChange: 10, 
//     });

//   const cardsPerPage = 9;
//   const totalCards = postsData?.length || 0;

//   const totalPages = Math.ceil(totalCards / cardsPerPage);

//   const onPageChange = (page: number) => setCurrentPage(page);

//   // Generate cards for the current page
//   const startIndex = (currentPage - 1) * cardsPerPage;
//   const endIndex = startIndex + cardsPerPage;
//   const currentPosts = Array.isArray(postsData)
//     ? postsData.slice(startIndex, endIndex)
//     : [];

//   return (
//     <PageLayout>
//       <>
//         <MetaTags
//           title={"Posts | Coupe de Escriva"}
//           
//           pageUrl={window.location.href}
//         />
//         <div className="flex flex-col gap-8 md:gap-12">
//           <div className="text-3xl md:text-4xl font-bold">News & Stories</div>
//           <div className="flex flex-col md:flex-row md:gap-12 gap-4">
//             <div className="flex flex-col gap-2">
//               <p className="font-medium text-base">Season</p>
//               <div className="border-2 md:w-[15.25rem] border-[#D9D9D9] rounded-[0.5rem]">
//                 <Dropdown
//                   color=""
//                   style={{
//                     width: "100%",
//                     display: "flex",
//                     justifyContent: "flex-start",
//                   }}
//                   label={selectedSeason?.season || "Select Season"}
//                   placement="bottom"
//                   arrowIcon={false}
//                 >
//                   {seasonsData?.map((season: any) => (
//                     <DropdownItem
//                       key={season.id}
//                       onClick={() => handleSeasonChange(season)}
//                     >
//                       {season.season}
//                     </DropdownItem>
//                   ))}
//                 </Dropdown>
//               </div>
//             </div>
//           </div>
//           {userSlice?.user?.roles.includes(Role.Admin) && (
//             <button
//               className="bg-custom-primary-1 flex w-52 text-white text-[16px] h-fit font-[700] py-2 px-4 rounded-[5px] justify-center hover:text-custom-primary-1 hover:border-custom-primary-1 hover:border hover:bg-white"
//               onClick={handleAddPost}
//             >
//               Add a new post
//             </button>
//           )}
//           <>
//             {postsIsLoading ? (
//               <PageLoader />
//             ) : (
//               <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-2  h-full gap-4 md:gap-8">
//                 {currentPosts?.map((post, index) => (
//                   <Link to={`/posts/${post._id}`}>
//                     <div
//                       key={index}
//                       className="cursor-pointer flex flex-col gap-3"
//                     >
//                       <div className="relative overflow-hidden rounded-2xl">
//                         <div
//                           className="w-full bg-[#D9D9D9] border border-[#D9D9D9] scale-110 hover:scale-125 h-36 md:h-44 lg:h-56"
//                           style={{
//                             backgroundImage: `url(${post.image || "/assets/images/hero-sports.svg"})`,
//                             backgroundSize: "cover",
//                             backgroundRepeat: "no-repeat",
//                             backgroundPosition: "center",
//                           }}
//                         ></div>
//                       </div>
//                       <div className="md:px-4 px-2 flex flex-col justify-between md:h-24 h-28 hover:underline">
//                         <p className="text-sm font-medium">{post.title}</p>
//                         <p className="text-sm">By {post?.author}</p>
//                         <p className="text-sm">
//                           {formatDateWithoutTime(post.createdAt)}
//                         </p>
//                       </div>
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             )}
//             <Pagination
//               currentPage={currentPage}
//               totalPages={totalPages}
//               onPageChange={onPageChange}
//             />
//           </>
//         </div>
//         <AddPostModal
//           openModal={openAddPostModal}
//           setOpenModal={setOpenAddPostModal}
//         />
//       </>
//     </PageLayout>
//   );
// };

// export default PostsPage;



const PicturesPage = () => {
  return (
    <div>PicturesPage</div>
  )
}

export default PicturesPage