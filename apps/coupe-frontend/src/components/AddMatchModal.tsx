import { Modal, Alert } from "flowbite-react";
import { Form, Formik } from "formik";
import { useCallback, useState } from "react";
import { AddFixtureResultProps } from "../store/interfaces/user.interface";
import {
  useCreateFixtureResultMutation,
  useGetSeasonsQuery,
  useGetTeamsQuery,
} from "../store/slices/appSlice";
import ButtonSpinner from "./ButtonSpinner";
import AddItemSuccessModal from "./AddItemSuccessModal";
import AddItemErrorModal from "./AddItemErrorModal";
import { AddFixtureResultSchema } from "../utils/Yup";
import { GameWeek } from "../utils/constants";

interface AddMatchModalProps {
  openModal: boolean;
  setOpenModal: any;
}

const AddMatchModal = ({ openModal, setOpenModal }: AddMatchModalProps) => {
  const [isAddMatchLoading, setIsAddMatchLoading] = useState(false);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [openStatussModal, setOpenStatussModal] = useState(false);
  const [selectedTeamSport, setSelectedTeamSport] = useState<string>("");
  const [selectedTeamDivison, setSelectedTeamDivison] = useState<string>("");

  const { data: seasonsData } = useGetSeasonsQuery();
  const defaultSeason = seasonsData?.find(
    (season: any) => season.currentSeason
  );

  const [addMatch, { error: addMatchError, isError: addMatchIsError }]: any =
    useCreateFixtureResultMutation();

  const { data: teamsData } = useGetTeamsQuery();

  const scrollToTarget = () => {
    const targetElement = document.getElementById("error-alert");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAddMatch = useCallback(
    async (props: AddFixtureResultProps) => {
      setIsAddMatchLoading(true);

      try {
        const { sport, division, ...oldProps } = props;
        const updatedProps = {
          division: selectedTeamDivison,
          sport: selectedTeamSport,
          ...oldProps,
        };
        const response = await addMatch(updatedProps);

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
        setIsAddMatchLoading(false);
      }
    },
    [
      addMatch,
      setIsAddMatchLoading,
      setOpenModal,
      setOpenStatusModal,
      setOpenStatussModal,
    ]
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
          Add Match
        </Modal.Header>

        <Modal.Body className="overflow-y-visible flex flex-col justify-center w-full max-w-[62rem] bg-[#ffffff] gap-8 rounded-[1.1875rem] px-8 pb-8">
          <Formik
            initialValues={{
              sport: selectedTeamSport, // Provide initial values for all fields
              division: selectedTeamDivison,
              season: defaultSeason?._id,
              fixtures: {
                home_team_id: "",
                away_team_id: "",
                date: "",
                gameweek: GameWeek.GameWeek1,
              },
            }}
            validationSchema={AddFixtureResultSchema}
            onSubmit={handleAddMatch}
          >
            {({ errors, setFieldValue }) => (
              <Form className="flex w-full flex-col gap-7 overflow-auto">
                {addMatchIsError && (
                  <Alert color="failure" className="py-3">
                    <span className="font-medium" id="error-alert">
                      {addMatchError && addMatchError?.data?.message}
                    </span>
                  </Alert>
                )}

                {/* Select Season */}
                <div className="w-full flex flex-col gap-3 md:gap-0 md:flex-row">
                  <div className="w-40 text-slate-700 text-sm font-medium  leading-tight">
                    Select Season*
                  </div>
                  <div className="flex flex-col w-full">
                    <select
                      className="flex shadow-none px-4 py-2 bg-white rounded-lg border-[#D9D9D9] w-full items-center"
                      onChange={(e) => {
                        setFieldValue("season", e.target.value);
                      }}
                    >
                      {seasonsData?.map((season: any) => (
                        <option key={season._id} value={season._id}>
                          {`${season.season}`}
                        </option>
                      ))}
                    </select>
                    {errors && errors.season && (
                      <p className="text-[12px] mt-1 text-custom-danger">
                        {errors.season}
                      </p>
                    )}
                  </div>
                </div>

                {/* Select Team */}
                <div className="w-full flex flex-col gap-3 md:gap-0 md:flex-row">
                  <div className="w-40 text-slate-700 text-sm font-medium  leading-tight">
                    Select Home Team*
                  </div>
                  <div className="flex flex-col w-full">
                    <select
                      className="flex shadow-none px-4 py-2 bg-white rounded-lg border-[#D9D9D9] w-full items-center"
                      onChange={(e) => {
                        setFieldValue("fixtures.home_team_id", e.target.value);
                        // Find the selected team object from teams array based on e.target.value
                        const selectedTeam = teamsData?.find(
                          (team: any) => team._id === e.target.value
                        );
                        if (selectedTeam) {
                          setSelectedTeamSport(selectedTeam.sport);
                          setSelectedTeamDivison(selectedTeam.division);
                        } else {
                          setSelectedTeamSport("");
                          setSelectedTeamDivison("");
                        }
                      }}
                    >
                      {teamsData?.map((team: any) => (
                        <option key={team._id} value={team._id}>
                          {`${team.name} - ${team.sport} - ${team.division}`}
                        </option>
                      ))}
                    </select>
                    {errors && errors?.fixtures?.home_team_id && (
                      <p className="text-[12px] mt-1 text-custom-danger">
                        {errors.fixtures.home_team_id}
                      </p>
                    )}
                  </div>
                </div>

                <div className="w-full flex flex-col gap-3 md:gap-0 md:flex-row">
                  <div className="w-40 text-slate-700 text-sm font-medium  leading-tight">
                    Select Away Team*
                  </div>
                  <div className="flex flex-col w-full">
                    <select
                      className="flex shadow-none px-4 py-2 bg-white rounded-lg border-[#D9D9D9] w-full items-center"
                      onChange={(e) => {
                        setFieldValue("fixtures.away_team_id", e.target.value);
                      }}
                    >
                      {teamsData?.map((team: any) => (
                        <option key={team._id} value={team._id}>
                          {`${team.name} - ${team.sport} - ${team.division}`}
                        </option>
                      ))}
                    </select>
                    {errors && errors?.fixtures?.away_team_id && (
                      <p className="text-[12px] mt-1 text-custom-danger">
                        {errors.fixtures.away_team_id}
                      </p>
                    )}
                  </div>
                </div>

                <div className="w-full flex flex-col gap-3 md:gap-0 md:flex-row">
                  <div className="w-40 text-slate-700 text-sm font-medium  leading-tight">
                    Date*
                  </div>

                  <div className="flex flex-col w-full">
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-500"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                        </svg>
                      </div>
                      <input
                        onChange={(e) =>
                          setFieldValue("fixtures.date", e.target.value)
                        }
                        datepicker-orientation="top"
                        type="date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-primary-1 focus:border-custom-primary-1 block w-full ps-10 p-2.5  "
                        placeholder="Select date"
                      />
                    </div>
                    {errors && errors.fixtures?.date && (
                      <p className="text-[12px] mt-1 text-custom-danger">
                        {errors.fixtures.date}
                      </p>
                    )}
                  </div>
                </div>

                <div className="w-full flex flex-col gap-3 md:gap-0 md:flex-row">
                  <div className="w-40 text-slate-700 text-sm font-medium  leading-tight">
                    Select Gameweek*
                  </div>
                  <div className="flex flex-col w-full">
                    <select
                      className="flex shadow-none px-4 py-2 bg-white rounded-lg border-[#D9D9D9] w-full items-center"
                      onChange={(e) => {
                        setFieldValue("fixtures.gameweek", e.target.value);
                      }}
                    >
                      {Object.values(GameWeek).map((week) => (
                        <option key={week} value={week}>
                          {week}
                        </option>
                      ))}
                    </select>
                    {errors && errors.fixtures && errors.fixtures.gameweek && (
                      <p className="text-[12px] mt-1 text-custom-danger">
                        {errors.fixtures.gameweek}
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
                      isAddMatchLoading ? "bg-white" : "bg-custom-primary-1"
                    }  ${
                      isAddMatchLoading
                        ? "border-custom-primary-1"
                        : "border-white"
                    }  font-semibold rounded-[0.5125rem]  text-white w-60 h-[2.5rem] px-4 justify-center items-center self-end hover:bg-custom-primary-2 hover:border border-3 hover:border-white hover:text-white`}
                    disabled={isAddMatchLoading}
                    type="submit"
                  >
                    {isAddMatchLoading ? <ButtonSpinner /> : "Add"}
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
          message={"You have successfully added a Fixture."}
        />
        <AddItemErrorModal
          openModal={openStatussModal}
          setOpenModal={setOpenStatussModal}
          message={"An error occurred while adding the Fixture."}
        />
      </Modal>
    </>
  );
};

export default AddMatchModal;
