// import { Modal, Alert } from "flowbite-react";
// import { Form, Formik } from "formik";
// import { useCallback, useState } from "react";
// import {
//   useCreatePictureMutation,
//   useGetSeasonsQuery,
// } from "../store/slices/appSlice";
// import ButtonSpinner from "./ButtonSpinner";
// import AddItemSuccessModal from "./AddItemSuccessModal";
// import AddItemErrorModal from "./AddItemErrorModal";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { AddPictureProps } from "../store/interfaces/user.interface";
// import { AddPictureSchema } from "../utils/Yup";

// interface AddPictureModalProps {
//   openModal: boolean;
//   setOpenModal: any;
// }

// const AddPictureModal = ({ openModal, setOpenModal }: AddPictureModalProps) => {
//   const [isAddPictureLoading, setIsAddPictureLoading] = useState(false);
//   const [openStatusModal, setOpenStatusModal] = useState(false);
//   const [openStatussModal, setOpenStatussModal] = useState(false);

//   const { data: seasonsData } = useGetSeasonsQuery();
//   const defaultSeason = seasonsData?.find(
//     (season: any) => season.currentSeason
//   );

//   const [addPicture, { error: addPictureError, isError: addPictureIsError }]: any =
//     useCreatePictureMutation();

//   const scrollToTarget = () => {
//     const targetElement = document.getElementById("error-alert");
//     if (targetElement) {
//       targetElement.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   const handleAddPicture = useCallback(
//     async (props: AddPictureProps) => {
//       setIsAddPictureLoading(true);

//       try {
//         const response = await addPicture(props);

//         if (response?.data) {
//           setOpenStatusModal(true);
//         }

//         if (response?.error) {
//           scrollToTarget();
//           setOpenStatussModal(true);
//         }
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setIsAddPictureLoading(false);
//       }
//     },
//     [
//       addPicture,
//       setIsAddPictureLoading,
//       setOpenModal,
//       setOpenStatusModal,
//       setOpenStatussModal,
//     ]
//   );

//   return (
//     <>
//       <Modal
//         dismissible
//         size={"2xl"}
//         show={openModal}
//         onClose={() => setOpenModal(false)}
//       >
//         <Modal.Header className="text-[#1C274C] text-[1.7rem] font-semibold flex justify-center items-center w-full">
//           Add Picture
//         </Modal.Header>

//         <Modal.Body className="overflow-y-visible flex flex-col justify-center w-full max-w-[62rem] bg-[#ffffff] gap-8 rounded-[1.1875rem] px-8 pb-8">
//           <Formik
//             initialValues={{
//               season: defaultSeason?._id,
//               sport: "",
//               gameweek: "",
//               image: "",
//               date: "",
//             }}
//             validationSchema={AddPictureSchema}
//             onSubmit={handleAddPicture}
//           >
//             {({ errors, values, setFieldValue }) => (
//               <Form className="flex w-full flex-col gap-7 overflow-auto">
//                 {addPictureIsError && (
//                   <Alert color="failure" className="py-3">
//                     <span className="font-medium" id="error-alert">
//                       {addPictureError && addPictureError?.data?.message}
//                     </span>
//                   </Alert>
//                 )}

//                 {/* Select Season */}
//                 {/* <div className="w-full flex flex-col gap-3 md:gap-0 md:flex-row">
//                   <div className="w-40 text-slate-700 text-sm font-medium  leading-tight">
//                     Select Season*
//                   </div>
//                   <div className="flex flex-col w-full">
//                     <select
//                       className="flex shadow-none px-4 py-2 bg-white rounded-lg border-[#D9D9D9] w-full items-center"
//                       onChange={(e) => {
//                         setFieldValue("season", e.target.value);
//                       }}
//                     >
//                       {seasonsData?.map((season: any) => (
//                         <option key={season._id} value={season._id}>
//                           {`${season.season}`}
//                         </option>
//                       ))}
//                     </select>
//                     {errors && errors.season && (
//                       <p className="text-[12px] mt-1 text-custom-danger">
//                         {errors.season}
//                       </p>
//                     )}
//                   </div>
//                 </div> */}

//                 <div className="w-full flex flex-col gap-3 md:gap-0 md:flex-row">
//                   <div className="w-40 text-slate-700 text-sm font-medium  leading-tight">
//                     Title*
//                   </div>
//                   <div className="w-full">
//                     <input
//                       type="text"
//                       className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-primary-1 focus:border-custom-primary-1 block p-2.5 "
//                       placeholder="Enter title"
//                       onChange={(e) => setFieldValue("title", e.target.value)}
//                       required
//                     />
//                     {errors && errors.title && (
//                       <p className="text-[12px] mt-1 text-custom-danger">
//                         {errors.title}
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 <div className="w-full flex flex-col gap-3 md:gap-0 md:flex-row">
//                   <div className="w-40 text-slate-700 text-sm font-medium  leading-tight">
//                     content*
//                   </div>
//                   <div className="w-full">
//                     <div
//                       style={{
//                         height: "200px",
//                         minHeight: "200px",
//                         maxHeight: "100%",
//                         position: "relative",
//                         fontSize: "14px",
//                         fontWeight: "400",
//                         marginBottom: "24px",
//                       }}
//                     >
//                       <ReactQuill
//                         style={{
//                           height: "100%",
//                           position: "absolute",
//                           top: 0,
//                           left: 0,
//                           right: 0,
//                           bottom: 0,
//                         }}
//                         theme="snow"
//                         value={values.content}
//                         onChange={(e) => setFieldValue("content", e)}

//                       />
//                     </div>
//                     {errors && errors.content && (
//                       <p className="text-[12px] mt-1 text-custom-danger">
//                         {errors.content}
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 {/* Image Input Box */}
//                 <div className="w-full flex flex-col gap-3 md:gap-0 md:flex-row">
//                   <div className="w-40 text-slate-700 text-sm font-medium  leading-tight">
//                     Image
//                   </div>
//                   <div className="gap-5 flex items-center w-full flex-row">
//                     <img
//                       src={values?.image || ""}
//                       className="w-18 h-14 border  bg-gray-100 rounded-full justify-center items-center flex"
//                     />
//                     <div className="w-full">
//                       <input
//                         type="text"
//                         id="item_image"
//                         className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-primary-1 focus:border-custom-primary-1 block p-2.5 "
//                         placeholder="e.g. https://imagestock.com/francis.png"
//                         onChange={(e) => setFieldValue("image", e.target.value)}
//                       />
//                       {errors && errors.image && (
//                         <p className="text-[12px] mt-1 text-custom-danger">
//                           {errors.image}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="w-full flex flex-col gap-3 md:gap-0 md:flex-row">
//                   <div className="w-40 text-slate-700 text-sm font-medium  leading-tight">
//                     Author*
//                   </div>
//                   <div className="w-full">
//                     <input
//                       type="text"
//                       className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-primary-1 focus:border-custom-primary-1 block p-2.5 "
//                       placeholder="Enter author"
//                       onChange={(e) => setFieldValue("author", e.target.value)}
//                       required
//                     />
//                     {errors && errors.author && (
//                       <p className="text-[12px] mt-1 text-custom-danger">
//                         {errors.author}
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 <div className="flex border-0 justify-between w-full">
//                   <button
//                     className={`font-semibold rounded-[0.5125rem] text-custom-primary-1 w-60 h-[2.5rem] px-4 justify-center items-center self-end hover:bg-white hover:border border-3 hover:border-custom-primary-1 hover:text-custom-primary-1`}
//                     onClick={() => setOpenModal(false)}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     className={`${
//                       isAddPictureLoading ? "bg-white" : "bg-custom-primary-1"
//                     }  ${
//                       isAddPictureLoading
//                         ? "border-custom-primary-1"
//                         : "border-white"
//                     }  font-semibold rounded-[0.5125rem]  text-white w-60 h-[2.5rem] px-4 justify-center items-center self-end hover:bg-custom-primary-2 hover:border border-3 hover:border-white hover:text-white`}
//                     disabled={isAddPictureLoading}
//                     type="submit"
//                   >
//                     {isAddPictureLoading ? <ButtonSpinner /> : "Add"}
//                   </button>
//                 </div>
//               </Form>
//             )}
//           </Formik>
//         </Modal.Body>

//         <AddItemSuccessModal
//           openModal={openStatusModal}
//           setOpenModal={setOpenStatusModal}
//           setOpenParentModal={setOpenModal}
//           message={"You have successfully added a picture."}
//         />
//         <AddItemErrorModal
//           openModal={openStatussModal}
//           setOpenModal={setOpenStatussModal}
//           message={"An error occurred while adding the picture."}
//         />
//       </Modal>
//     </>
//   );
// };

// export default AddPictureModal;

const AddPictureModal = () => {
  return (
    <div>AddPictureModal</div>
  )
}

export default AddPictureModal