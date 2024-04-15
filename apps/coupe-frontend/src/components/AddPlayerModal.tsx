import { Modal, Alert } from "flowbite-react";
import { Form, Formik } from "formik";
import { useCallback, useState } from "react";
import { AddPlayerProps } from "../store/interfaces/user.interface";
import {
  useCreatePlayerMutation,
  useGetSeasonsQuery,
  useGetTeamsQuery,
} from "../store/slices/appSlice";
import ButtonSpinner from "./ButtonSpinner";
import AddItemSuccessModal from "./AddItemSuccessModal";
import AddItemErrorModal from "./AddItemErrorModal";
import { AddPlayerSchema } from "../utils/Yup";
import {
  FootballPosition,
  BasketballPosition,
  VolleyballPosition,
  PlayerRole,
} from "../utils/constants";

interface AddPlayerModalProps {
  openModal: boolean;
  setOpenModal: any;
}

const AddPlayerModal = ({ openModal, setOpenModal }: AddPlayerModalProps) => {
  const [isAddPlayerLoading, setIsAddPlayerLoading] = useState(false);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [openStatussModal, setOpenStatussModal] = useState(false);
  const [selectedTeamSport, setSelectedTeamSport] = useState<string>("");

  const { data: seasonsData } = useGetSeasonsQuery();
  const defaultSeason = seasonsData?.find(
    (season: any) => season.currentSeason
  );

  const [addPlayer, { error: addPlayerError, isError: addPlayerIsError }]: any =
    useCreatePlayerMutation();

  const { data: teamsData } = useGetTeamsQuery();

  const scrollToTarget = () => {
    const targetElement = document.getElementById("error-alert");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAddPlayer = useCallback(
    async (props: AddPlayerProps) => {
      setIsAddPlayerLoading(true);

      try {
        const response = await addPlayer(props);

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
        setIsAddPlayerLoading(false);
      }
    },
    [
      addPlayer,
      setIsAddPlayerLoading,
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
          Add Player
        </Modal.Header>

        <Modal.Body className="overflow-y-visible flex flex-col justify-center w-full max-w-[62rem] bg-[#ffffff] gap-8 rounded-[1.1875rem] px-8 pb-8">
          <Formik
            initialValues={{
              season: defaultSeason?._id,
              team: "",
              firstname: "",
              lastname: "",
              playerNumber: 0,
              position: FootballPosition.FORWARD, // Default value for dropdown
              playerRole: PlayerRole.PLAYER, // Default value for dropdown
            }}
            validationSchema={AddPlayerSchema}
            onSubmit={handleAddPlayer}
          >
            {({ errors, values, setFieldValue }) => (
              <Form className="flex w-full flex-col gap-7 overflow-auto">
                {addPlayerIsError && (
                  <Alert color="failure" className="py-3">
                    <span className="font-medium" id="error-alert">
                      {addPlayerError && addPlayerError?.data?.message}
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
                    Select Team*
                  </div>
                  <div className="flex flex-col w-full">
                    <select
                      className="flex shadow-none px-4 py-2 bg-white rounded-lg border-[#D9D9D9] w-full items-center"
                      onChange={(e) => {
                        setFieldValue("team", e.target.value);
                        // Find the selected team object from teams array based on e.target.value
                        const selectedTeam = teamsData?.find(
                          (team: any) => team._id === e.target.value
                        );
                        if (selectedTeam) {
                          setSelectedTeamSport(selectedTeam.sport);
                        } else {
                          setSelectedTeamSport("");
                        }
                      }}
                    >
                      {teamsData?.map((team: any) => (
                        <option key={team._id} value={team._id}>
                          {`${team.name} - ${team.sport} - ${team.division}`}
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

                {/* Input fields for player details */}
                <div className="w-full flex flex-col gap-3 md:gap-0 md:flex-row">
                  <div className="w-40 text-slate-700 text-sm font-medium  leading-tight">
                    First Name*
                  </div>
                  <div className="w-full">
                    <input
                      type="text"
                      className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-primary-1 focus:border-custom-primary-1 block p-2.5 "
                      placeholder="Enter first name"
                      onChange={(e) =>
                        setFieldValue("firstname", e.target.value)
                      }
                      required
                    />
                    {errors && errors.firstname && (
                      <p className="text-[12px] mt-1 text-custom-danger">
                        {errors.firstname}
                      </p>
                    )}
                  </div>
                </div>

                {/* Input fields for player details */}
                <div className="w-full flex flex-col gap-3 md:gap-0 md:flex-row">
                  <div className="w-40 text-slate-700 text-sm font-medium  leading-tight">
                    Last Name*
                  </div>
                  <div className="w-full">
                    <input
                      type="text"
                      className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-primary-1 focus:border-custom-primary-1 block p-2.5 "
                      placeholder="Enter last name"
                      onChange={(e) =>
                        setFieldValue("lastname", e.target.value)
                      }
                      required
                    />
                    {errors && errors.lastname && (
                      <p className="text-[12px] mt-1 text-custom-danger">
                        {errors.lastname}
                      </p>
                    )}
                  </div>
                </div>

                {/* Image Input Box */}
                <div className="w-full flex flex-col gap-3 md:gap-0 md:flex-row">
                  <div className="w-40 text-slate-700 text-sm font-medium  leading-tight">
                    Profile Image
                  </div>
                  <div className="gap-5 flex items-center w-full flex-row">
                    <img
                      src={values?.profileImage || ""}
                      className="w-18 h-14 border  bg-gray-100 rounded-full justify-center items-center flex"
                    />
                    <div className="w-full">
                      <input
                        type="text"
                        id="item_image"
                        className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-primary-1 focus:border-custom-primary-1 block p-2.5 "
                        placeholder="e.g. https://imagestock.com/francis.png"
                        onChange={(e) =>
                          setFieldValue("profileImage", e.target.value)
                        }
                      />
                      {errors && errors.profileImage && (
                        <p className="text-[12px] mt-1 text-custom-danger">
                          {errors.profileImage}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Repeat similar structure for other input fields */}
                <div className="w-full flex flex-col gap-3 md:gap-0 md:flex-row">
                  <div className="w-40 text-slate-700 text-sm font-medium  leading-tight">
                    {" "}
                    Player Number*
                  </div>
                  <div className="w-full">
                  <input
                    type="number"
                    id="player_number"
                    className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-primary-1 focus:border-custom-primary-1 block p-2.5 "
                    placeholder="66"
                    required
                    onChange={(e) =>
                      setFieldValue(
                        "playerNumber",
                        parseInt(e.target.value, 10)
                      )
                    }
                  />
                  {errors && errors.playerNumber && (
                    <p className="text-[12px] mt-1 text-custom-danger">
                      {errors.playerNumber}
                    </p>
                  )}
                  </div>
                </div>
                {/* Dropdown for Position */}
                <div className="w-full flex flex-col gap-3 md:gap-0 md:flex-row">
                  <div className="w-40 text-slate-700 text-sm font-medium  leading-tight">
                    Position*
                  </div>
                  <div className="flex flex-col w-full">
                    <select
                      className="flex shadow-none px-4 py-2 bg-white rounded-lg border-[#D9D9D9] w-full items-center"
                      onChange={(e) =>
                        setFieldValue("position", e.target.value)
                      }
                      required
                    >
                      <option value="">Select position</option>
                      {selectedTeamSport === "football" &&
                        Object.values(FootballPosition).map((position) => (
                          <option key={position} value={position}>
                            {position}
                          </option>
                        ))}
                      {selectedTeamSport === "basketball" &&
                        Object.values(BasketballPosition).map((position) => (
                          <option key={position} value={position}>
                            {position}
                          </option>
                        ))}
                      {selectedTeamSport === "volleyball" &&
                        Object.values(VolleyballPosition).map((position) => (
                          <option key={position} value={position}>
                            {position}
                          </option>
                        ))}
                    </select>
                    {errors && errors.position && (
                      <p className="text-[12px] mt-1 text-custom-danger">
                        {errors.position}
                      </p>
                    )}
                  </div>
                </div>

                {/* Dropdown for Player Role */}
                <div className="w-full flex flex-col gap-3 md:gap-0 md:flex-row">
                  <div className="w-40 text-slate-700 text-sm font-medium  leading-tight">
                    Player Role*
                  </div>
                  <div className="flex flex-col w-full">
                    <select
                      className="flex shadow-none px-4 py-2 bg-white rounded-lg border-[#D9D9D9] w-full items-center"
                      onChange={(e) =>
                        setFieldValue("playerRole", e.target.value)
                      }
                      required
                    >
                      <option value="">Select player role</option>
                      {Object.values(PlayerRole).map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                    {errors && errors.playerRole && (
                      <p className="text-[12px] mt-1 text-custom-danger">
                        {errors.playerRole}
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
                      isAddPlayerLoading ? "bg-white" : "bg-custom-primary-1"
                    }  ${
                      isAddPlayerLoading
                        ? "border-custom-primary-1"
                        : "border-white"
                    }  font-semibold rounded-[0.5125rem]  text-white w-60 h-[2.5rem] px-4 justify-center items-center self-end hover:bg-custom-primary-2 hover:border border-3 hover:border-white hover:text-white`}
                    disabled={isAddPlayerLoading}
                    type="submit"
                  >
                    {isAddPlayerLoading ? <ButtonSpinner /> : "Add"}
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
          message={"You have successfully added a player."}
        />
        <AddItemErrorModal
          openModal={openStatussModal}
          setOpenModal={setOpenStatussModal}
          message={"An error occurred while adding the player."}
        />
      </Modal>
    </>
  );
};

export default AddPlayerModal;
