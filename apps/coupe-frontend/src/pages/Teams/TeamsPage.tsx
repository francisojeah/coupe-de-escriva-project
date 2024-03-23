import { Link } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import { FaArrowRight } from "react-icons/fa6";

const teamsList = [
  {
    title: "Blue Jays",
    logo: "/assets/images/blue-jays-logo.svg",
    label: "blue-jays",
    color: "#3F9CEC",
    textColor: "white",
  },
  {
    title: "Cirok",
    logo: "/assets/images/cirok-logo.svg",
    label: "cirok",
    color: "white",
    textColor: "black",
  },
  {
    title: "Madiba",
    logo: "/assets/images/madiba-logo.svg",
    label: "madiba",
    color: "black",
    textColor: "white",
  },
  {
    title: "TSG Walkers",
    logo: "/assets/images/tsg-logo.svg",
    label: "tsg-walkers",
    color: "#AA0F0D",
    textColor: "white",
  },
];

const TeamsPage = () => {
  return (
    <PageLayout>
      <div className="flex flex-col gap-12">
        <div className="text-3xl md:text-4xl font-bold">Teams</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-x-24 md:gap-y-16">
          {teamsList.map(({ title, logo, label }, index) => (
            <Link to={`/teams/${label}`} key={index}>
              <div
                className={`flex flex-col gap-4 hover:shadow-lg rounded-2xl border-2 p-6 border-[#D9D9D9]`}
              >
                <div>
                  <img src={logo} alt="Logo" className="w-fit h-[9.5rem]" />
                </div>
                <div className="w-full flex px-6 justify-between items-center">
                  <p className="text-2xl font-bold uppercase">{title}</p>
                  <FaArrowRight />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default TeamsPage;
