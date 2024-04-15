import { Link } from "react-router-dom";

const HomeTeams = () => {

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
          logo: "/assets/images/tsg-walkers-logo.svg",
          label: "tsg-walkers",
          color: "#AA0F0D",
          textColor: "white",
        },
      ];
      

  return (
    <div className="flex flex-col gap-8">
        <div className="md:text-3xl text-2xl font-bold">Teams</div>
       

        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 md:gap-14 w-full">
          {teamsList.map(({logo, label }, index) => (
            <Link to={`/teams/${label}`} key={index}>
              <div
                className={`flex items-center justify-center  gap-4 hover:shadow-lg rounded-2xl border-2 p-6 border-[#D9D9D9]`}
              >
                <div className="lg:px-3">
                  <img src={logo} alt="Logo" className="w-fit h-[10rem]" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
  )
}

export default HomeTeams