import { Modal } from "flowbite-react";
import { useCallback, useState } from "react";
import ButtonSpinner from "./ButtonSpinner";
import AddItemSuccessModal from "./AddItemSuccessModal";
import AddItemErrorModal from "./AddItemErrorModal";

interface ConfirmationModalProps {
  openModal: boolean;
  setOpenModal: any;
  confirmationFunction?: any;
  isLoading?: any;
  message: string;
}

const ConfirmationModal = ({
  openModal,
  setOpenModal,
  confirmationFunction,
  isLoading,
  message,
}: ConfirmationModalProps) => {
  const [isConfirmationLoading, setIsConfirmationLoading] = useState(false);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [openStatussModal, setOpenStatussModal] = useState(false);

  const handleConfirmationFunction = useCallback(
    async () => {
      setIsConfirmationLoading(true);

      try {
        const response = await confirmationFunction();

        if (response?.data) {
          setOpenStatusModal(true);
        }

        if (response?.error) {
          setOpenStatussModal(true);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsConfirmationLoading(false);
      }
    },
    [
      confirmationFunction,
      setIsConfirmationLoading,
      setOpenModal,
      setOpenStatusModal,
      setOpenStatussModal,
    ]
  );

  return (
    <>
      <Modal
        dismissible
        size={"lg"}
        show={openModal}
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header className="text-[#1C274C] text-[1.7rem] font-semibold flex justify-center items-center w-full">
          Confirmation
        </Modal.Header>

        <Modal.Body className="overflow-y-visible flex flex-col justify-center w-full  bg-[#ffffff] gap-8 rounded-[1.1875rem] px-8 pb-8">
          <p className="font-semibold text-base text-black">{message}</p>
        </Modal.Body>

        <Modal.Footer className="flex justify-between w-full">
          <button
            className={`font-semibold rounded-[0.5125rem] text-custom-primary-1 w-60 h-[2.5rem] px-4 justify-center items-center self-end hover:bg-white hover:border border-3 hover:border-custom-primary-1 hover:text-custom-primary-1`}
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </button>
          <button
            className={`${
              isLoading || isConfirmationLoading ? "bg-white" : "bg-custom-primary-1"
            }  ${
              isLoading || isConfirmationLoading ? "border-custom-primary-1" : "border-white"
            }  font-semibold rounded-[0.5125rem]  text-white w-60 h-[2.5rem] px-4 justify-center items-center self-end hover:bg-custom-primary-2 hover:border border-3 hover:border-white hover:text-white`}
            disabled={isLoading || isConfirmationLoading}
            onClick={handleConfirmationFunction}
          >
            {isLoading || isConfirmationLoading ? <ButtonSpinner /> : "Confirm"}
          </button>
        </Modal.Footer>

        <AddItemSuccessModal
          openModal={openStatusModal}
          setOpenModal={setOpenStatusModal}
          setOpenParentModal={setOpenModal}
          message={"You have successfully performed this operation."}
        />
        <AddItemErrorModal
          openModal={openStatussModal}
          setOpenModal={setOpenStatussModal}
          message={"An error occurred while performing this operation"}
        />
      </Modal>
    </>
  );
};

export default ConfirmationModal;
