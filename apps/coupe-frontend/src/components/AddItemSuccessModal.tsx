import { Modal } from "flowbite-react";

interface AddItemSuccessModalProps {
  openModal: boolean;
  setOpenModal: any;
  setOpenParentModal: any;
  message:string;
}

const AddItemSuccessModal = ({
  openModal,
  setOpenModal,
  setOpenParentModal,
  message
}: AddItemSuccessModalProps) => {
  return (
    <>
      <Modal
        size={"sm"}
        dismissible
        show={openModal}
        onClose={() => {
          setOpenModal(false);
          setOpenParentModal(false);
        }}
      >
        <Modal.Header className="border-none pb-0"></Modal.Header>
        <Modal.Body className="pt-0">
          <div className="flex gap-2 items-center">
            <img src="/assets/icons/success-icon.svg" className="w-40"/>
            <div className="flex flex-col gap-4">
              <p className="font-bold text-sm text-custom-primary-1">
                Congrats!
              </p>
              <p className="font-semibold text-xs text-black">
                {message}
              </p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddItemSuccessModal;
