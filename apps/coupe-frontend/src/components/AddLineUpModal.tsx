import { Modal, Alert } from "flowbite-react";
import { Form, Formik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { PlayerLineup, TeamLineup } from "../store/interfaces/user.interface";
import {
  useAddLineUpMutation,
  useGetFixtureResultByIdQuery,
  useGetPlayersByTeamIdQuery,
} from "../store/slices/appSlice";
import ButtonSpinner from "./ButtonSpinner";
import AddItemSuccessModal from "./AddItemSuccessModal";
import AddItemErrorModal from "./AddItemErrorModal";
import { AddLineupSchema } from "../utils/Yup";
import { useParams } from "react-router-dom";

interface AddLineUpModalProps {
  openModal: boolean;
  setOpenModal: any;
}

const AddLineUpModal: React.FC<AddLineUpModalProps> = ({
  openModal,
  setOpenModal,
}) => {
  const [isAddLineUpLoading, setIsAddLineUpLoading] = useState(false);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [openStatussModal, setOpenStatussModal] = useState(false);
  const [team, setTeam] = useState<string>("");
  const [selectedPlayers, setSelectedPlayers] = useState<PlayerLineup[]>([]);
  const { id: fixtureResultId } = useParams<{ id: string }>();

  const { data: fixtureResultData } =
    useGetFixtureResultByIdQuery(fixtureResultId);

  const [addLineUp, { error: addLineUpError, isError: addLineUpIsError }]: any =
    useAddLineUpMutation();

  const { data: playersData } = useGetPlayersByTeamIdQuery(team);

  useEffect(() => {
    if (playersData) {
      setSelectedPlayers(
        playersData?.map((player) => ({
          player_id: player._id,
          isSubstitute: true,
        }))
      );
    }
  }, [playersData, team]);

  const handlePlayerSelection = (selectedPlayer: PlayerLineup) => {
    setSelectedPlayers((prevPlayers) =>
      prevPlayers.map((p) =>
        p.player_id === selectedPlayer.player_id
          ? { ...p, isSubstitute: !p.isSubstitute }
          : p
      )
    );
  };


  const handleAddLineUp = useCallback(
    async (props: TeamLineup) => {
      setIsAddLineUpLoading(true);
      try {

        const lineupObject = {
          id: fixtureResultId,
          ...props,
          players: selectedPlayers,
        }
        const response = await addLineUp(lineupObject);

        if (response?.data) {
          setOpenStatusModal(true);
        }
        if (response?.error) {
          scrollToTarget();
          setOpenStatussModal(true);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsAddLineUpLoading(false);
      }
    },
    [
      addLineUp,
      setIsAddLineUpLoading,
      setOpenModal,
      setOpenStatusModal,
      setOpenStatussModal,
      selectedPlayers,
    ]
  );

  const scrollToTarget = () => {
    const targetElement = document.getElementById("error-alert");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Modal
        dismissible
        size={"2xl"}
        show={openModal}
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header className="text-[#1C274C] text-[1.7rem] font-semibold flex justify-center items-center w-full">
          Add Lineup
        </Modal.Header>

        <Modal.Body className="overflow-y-visible flex flex-col justify-center w-full max-w-[62rem] bg-[#ffffff] gap-8 rounded-[1.1875rem] px-8 pb-8">
          <Formik
            initialValues={{
              team_id: "",
              players: selectedPlayers,
            }}
            validationSchema={AddLineupSchema}
            onSubmit={handleAddLineUp}
          >
            {({ errors, setFieldValue }) => (
              <Form className="flex w-full flex-col gap-7 overflow-auto">
                {addLineUpIsError && (
                  <Alert color="failure" className="py-3">
                    <span className="font-medium" id="error-alert">
                      {addLineUpError && addLineUpError?.data?.message}
                    </span>
                  </Alert>
                )}

                {/* Select Team */}
                <div className="w-full flex flex-col gap-3 md:gap-0 md:flex-row">
                  <div className="w-40 text-slate-700 text-sm font-medium  leading-tight">
                    Select Team*
                  </div>
                  <div className="flex flex-col w-full">
                    <select
                      className="flex shadow-none px-4 py-2 bg-white rounded-lg border-[#D9D9D9] w-full items-center"
                      onChange={(e) => {
                        setFieldValue("team_id", e.target.value);
                        setTeam(e.target.value);
                      }}
                    >
                      <option value="">Select team</option>
                      {fixtureResultData &&
                        [
                          fixtureResultData?.fixtures?.home_team_id,
                          fixtureResultData?.fixtures?.away_team_id,
                        ].map((team) => (
                          <option key={team?._id} value={team?._id}>
                            {`${team?.name} - ${team?.sport} - ${team?.division}`}
                          </option>
                        ))}
                    </select>
                    {errors && errors.team_id && (
                      <p className="text-[12px] mt-1 text-custom-danger">
                        {errors.team_id}
                      </p>
                    )}
                  </div>
                </div>

                {/* Input fields for player details */}
                <div className="w-full flex flex-col gap-3 md:gap-0 md:flex-row">
                  <div className="w-40 text-slate-700 text-sm font-medium  leading-tight">
                    Select Players*
                  </div>
                  <div className="w-full">
                    <div className="relative overflow-x-auto border sm:rounded-lg">
                      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                          <tr>
                            <th scope="col" className="px-6 py-3">
                              Select
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Player Name
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedPlayers &&
                            playersData?.map((player) => {
                              const selectedPlayer: PlayerLineup =
                                selectedPlayers?.find(
                                  (selectedPlayer) =>
                                    selectedPlayer.player_id === player._id
                                )!;

                              const isChecked = selectedPlayer
                                ? !selectedPlayer.isSubstitute
                                : false;

                              return (
                                <tr
                                  key={player._id}
                                  className="bg-white border-b dark:bg-gray-800 hover:bg-gray-50"
                                >
                                  <td className="w-4 p-4">
                                    <div className="flex items-center">
                                      <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={() =>
                                          handlePlayerSelection(selectedPlayer)
                                        }
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                      />
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">
                                    {player.firstname} {player.lastname}
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="flex border-0 justify-between w-full">
                  <button
                    className={`font-semibold rounded-[0.5125rem] text-custom-primary-1 w-60 h-[2.5rem] px-4 justify-center items-center self-end hover:bg-white hover:border border-3 hover:border-custom-primary-1 hover:text-custom-primary-1`}
                    onClick={() => setOpenModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className={`${
                      isAddLineUpLoading ? "bg-white" : "bg-custom-primary-1"
                    }  ${
                      isAddLineUpLoading
                        ? "border-custom-primary-1"
                        : "border-white"
                    }  font-semibold rounded-[0.5125rem]  text-white w-60 h-[2.5rem] px-4 justify-center items-center self-end hover:bg-custom-primary-2 hover:border border-3 hover:border-white hover:text-white`}
                    disabled={isAddLineUpLoading}
                    type="submit"
                  >
                    {isAddLineUpLoading ? <ButtonSpinner /> : "Add"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>

        <AddItemSuccessModal
          openModal={openStatusModal}
          setOpenModal={setOpenStatusModal}
          setOpenParentModal={setOpenModal}
          message={"You have successfully added a lineup."}
        />
        <AddItemErrorModal
          openModal={openStatussModal}
          setOpenModal={setOpenStatussModal}
          message={"An error occurred while adding the lineup."}
        />
      </Modal>
    </>
  );
};

export default AddLineUpModal;
