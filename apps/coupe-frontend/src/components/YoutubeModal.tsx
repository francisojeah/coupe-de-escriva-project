import { Modal } from "flowbite-react";


interface YoutubeModalProps {
  videoId: string;
  openModal: boolean;
  setOpenModal: any;
}

const YoutubeModal = ({ videoId, openModal, setOpenModal }: YoutubeModalProps) => {

  return (
    <>
      <Modal
        dismissible
        size={"2xl"}
        show={openModal}
        onClose={() => setOpenModal(false)}
      >
        <div className="modal-content">
        <iframe
          title="YouTube Video"
          className="w-full h-[315px]"
          src={`https://www.youtube.com/embed/${videoId}`}
          allowFullScreen
        ></iframe>
      </div>
        
      </Modal>
    </>
  );
};

export default YoutubeModal;
