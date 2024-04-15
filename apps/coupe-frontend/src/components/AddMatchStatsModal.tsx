import { Modal, Alert } from "flowbite-react";
import { Form, Formik } from "formik";
import { useCallback, useState } from "react";
import { AddMatchStatsProps } from "../store/interfaces/user.interface";
import {
  useGetFixtureResultByIdQuery,
  useGetPlayersByTeamIdQuery,
  useUpdateFixtureResultStatsMutation,
} from "../store/slices/appSlice";
import ButtonSpinner from "./ButtonSpinner";
import AddItemSuccessModal from "./AddItemSuccessModal";
import AddItemErrorModal from "./AddItemErrorModal";
import { AddMatchStatsSchema } from "../utils/Yup";
import { useParams } from "react-router-dom";
import { getRelevantStats } from "../utils/constants";

interface AddMatchStatsModalProps {
  openModal: boolean;
  setOpenModal: any;
}

const AddMatchStatsModal = ({
  openModal,
  setOpenModal,
}: AddMatchStatsModalProps) => {
  const [isAddMatchStatsLoading, setIsAddMatchStatsLoading] = useState(false);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [openStatussModal, setOpenStatussModal] = useState(false);

  const [team, setTeam] = useState<string>("");
  const { id: fixtureResultId } = useParams<{ id: string }>();

  const { data: fixtureResultData } =
    useGetFixtureResultByIdQuery(fixtureResultId);

  const { data: playersData } = useGetPlayersByTeamIdQuery(team);

  const [
    addMatchStats,
    { error: addMatchStatsError, isError: addMatchStatsIsError },
  ]: any = useUpdateFixtureResultStatsMutation();

  const scrollToTarget = () => {
    const targetElement = document.getElementById("error-alert");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAddMatchStats = useCallback(
    async (values: any) => {
      setIsAddMatchStatsLoading(true);

      try {
        // Prepare the payload for adding match stats
        const payload: AddMatchStatsProps = {
          team: values.team,
          player_id: values.player_id,
          stat: {
            [values.selectedStat]: parseInt(values.selectedNumber),
          },
        };

        // Add the match stats
        const response = await addMatchStats({
          id: fixtureResultId,
          props: payload,
        });

        // Check if the operation was successful
        if (response?.data) {
          setOpenStatusModal(true);
        }

        // Handle errors
        if (response?.error) {
          scrollToTarget();
          setOpenStatussModal(true);
        }
      } catch (error) {
        console.error(error);
        setOpenStatussModal(true);
      } finally {
        setIsAddMatchStatsLoading(false);
      }
    },
    [addMatchStats, fixtureResultId]
  );

  return (
    <>
      <Modal
        dismissible
        size={"2xl"}
        show={openModal}
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header className="text-[#1C274C] text-[1.7rem] font-semibold flex justify-center items-center w-full">
          Add MatchStats
        </Modal.Header>

        <Modal.Body className="overflow-y-visible flex flex-col justify-center w-full max-w-[62rem] bg-[#ffffff] gap-8 rounded-[1.1875rem] px-8 pb-8">
          <Formik
            initialValues={{
              team: "",
              player_id: "",
              selectedStat: "",
              selectedNumber: 0,
            }}
            validationSchema={AddMatchStatsSchema}
            onSubmit={handleAddMatchStats}
          >
            {({ errors, values, setFieldValue }) => (
              <Form className="flex w-full flex-col gap-7 overflow-auto">
                {addMatchStatsIsError && (
                  <Alert color="failure" className="py-3">
                    <span className="font-medium" id="error-alert">
                      {addMatchStatsError && addMatchStatsError?.data?.message}
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
                        setFieldValue("team", e.target.value);
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
                    {errors && errors.team && (
                      <p className="text-[12px] mt-1 text-custom-danger">
                        {errors.team}
                      </p>
                    )}
                  </div>
                </div>

                <div className="w-full flex flex-col gap-3 md:gap-0 md:flex-row">
                  <div className="w-40 text-slate-700 text-sm font-medium  leading-tight">
                    Select Player*
                  </div>
                  <div className="flex flex-col w-full">
                    <select
                      className="flex shadow-none px-4 py-2 bg-white rounded-lg border-[#D9D9D9] w-full items-center"
                      onChange={(e) => {
                        setFieldValue("player_id", e.target.value);
                      }}
                    >
                      <option value="">Select Player</option>
                      {playersData &&
                        playersData?.map((player) => (
                          <option key={player?._id} value={player?._id}>
                            {player.firstname} {player.lastname}
                          </option>
                        ))}
                    </select>
                    {errors && errors.player_id && (
                      <p className="text-[12px] mt-1 text-custom-danger">
                        {errors.player_id}
                      </p>
                    )}
                  </div>
                </div>

                {/* Select Stat */}
                <div className="w-full flex flex-col gap-3 md:gap-0 md:flex-row">
                  <div className="w-40 text-slate-700 text-sm font-medium  leading-tight">
                    Select Stat*
                  </div>
                  <div className="flex flex-col w-full">
                    <select
                      className="flex shadow-none px-4 py-2 bg-white rounded-lg border-[#D9D9D9] w-full items-center"
                      onChange={(e) => {
                        setFieldValue("selectedStat", e.target.value);
                      }}
                    >
                      <option value="">Select stat</option>
                      {fixtureResultData?.sport &&
                        getRelevantStats(fixtureResultData.sport).map(
                          (stat) => (
                            <option key={stat} value={stat}>
                              {stat}
                            </option>
                          )
                        )}
                    </select>
                    {errors && errors.selectedStat && (
                      <p className="text-[12px] mt-1 text-custom-danger">
                        {errors.selectedStat}
                      </p>
                    )}
                  </div>
                </div>

                {/* Select Number */}
                <div className="w-full flex flex-col gap-3 md:gap-0 md:flex-row">
                  <div className="w-40 text-slate-700 text-sm font-medium  leading-tight">
                    Select Number*
                  </div>
                  <div className="flex flex-col w-full">
                    <input
                      type="number"
                      className="shadow-none px-4 py-2 bg-white rounded-lg border-[#D9D9D9] w-full"
                      required
                      placeholder="1"
                      onChange={(e) => {
                        setFieldValue("selectedNumber", e.target.value);
                      }}
                    />
                    {errors && errors.selectedNumber && (
                      <p className="text-[12px] mt-1 text-custom-danger">
                        {errors.selectedNumber}
                      </p>
                    )}
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
                      isAddMatchStatsLoading
                        ? "bg-white"
                        : "bg-custom-primary-1"
                    }  ${
                      isAddMatchStatsLoading
                        ? "border-custom-primary-1"
                        : "border-white"
                    }  font-semibold rounded-[0.5125rem]  text-white w-60 h-[2.5rem] px-4 justify-center items-center self-end hover:bg-custom-primary-2 hover:border border-3 hover:border-white hover:text-white`}
                    disabled={isAddMatchStatsLoading}
                    type="submit"
                  >
                    {isAddMatchStatsLoading ? <ButtonSpinner /> : "Add"}
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
          message={"You have successfully added a MatchStats."}
        />
        <AddItemErrorModal
          openModal={openStatussModal}
          setOpenModal={setOpenStatussModal}
          message={"An error occurred while adding the MatchStats."}
        />
      </Modal>
    </>
  );
};

export default AddMatchStatsModal;
