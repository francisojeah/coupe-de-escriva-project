import { Link } from "react-router-dom";

const footerPageLinks = [
  {
    title: "Home",
    link: "home",
  },
  {
    title: "Standings",
    link: "standings",
  },
  {
    title: "Fixtures & Results",
    link: "matches",
  },
  {
    title: "Teams",
    link: "teams",
  },
  {
    title: "Stats",
    link: "stats",
  },
  {
    title: "Players",
    link: "players",
  },
  {
    title: "Fantasy Coupe",
    link: "fantasy",
  },
  {
    title: "Table Predictor",
    link: "table-predictor",
  },
];

const Footer = () => {
  return (
    <div className="bg-custom-primary-2 flex justify-center w-full text-white text-sm bottom-0 ">
      <div className=" flex flex-col items-center w-full py-4 pt-8">
        <div className="w-full max-w-[73.25rem] px-4 flex flex-col md:flex-row gap-6 md:gap-0 justify-between">
          <div className="flex items-start">
            <div className="flex gap-3 items-center">
              <img
                src="/assets/images/coupe-logo.svg"
                alt="Logo"
                className="w-fit h-[4rem] flex self-start"
              />
              <div className="flex flex-col py-4 gap-6">
                <div className="text-[1.5rem] font-semibold uppercase">
                  COUPE DE ESCRIVA
                </div>
                <div className="text-xs font-medium">
                  Where Champions Rise and Legends Shine!
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="grid gap-6 text-sm grid-cols-2">
              {footerPageLinks.map(({ title, link }, index) => (
                <Link to={`/${link}`} key={index} className="text-sm mr-16">
                  {title}
                </Link>
              ))}
            </div>
            <div className="flex justify-between w-full">
              <a href={"https://twitter.com/SportsPAU"} target="_blank">
                <img
                  src={"/assets/icons/twitter-icon.svg"}
                  alt="Twitter Icon"
                  className="h-fit w-[1.5rem]"
                />
              </a>
              <a href={"https://youtube.com/@PAUSports"} target="_blank">
                <img
                  src={"/assets/icons/youtube-icon.svg"}
                  alt="Youtube Icon"
                  className="h-fit w-[1.5rem]"
                />
              </a>
              <a href={"https://www.tiktok.com/@pau.sports"} target="_blank">
                <img
                  src={"/assets/icons/tiktok-icon.svg"}
                  alt="Tiktok Icon"
                  className="h-fit w-[1.5rem]"
                />
              </a>
              <a href={"https://youtube.com/@PAUSports"} target="_blank">
                <img
                  src={"/assets/icons/instagram-icon.svg"}
                  alt="Instagram Icon"
                  className="h-fit w-[1.5rem]"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="flex md:flex-row flex-col items-center gap-4 md:gap-0 w-full max-w-[73.25rem] px-4 py-2 justify-between mt-4 border-t-2 pt-4">
          <div className="font-medium">Powered by Francis Okocha-Ojeah</div>
          <div className="flex justify-between gap-20">
            <a
              href={"https://www.linkedin.com/in/francis-okocha-ojeah/"}
              target="_blank"
            >
              <img
                src={"/assets/icons/linkedin-icon.svg"}
                alt="Tiktok Icon"
                className="h-fit w-[1.2rem]"
              />
            </a>
            <a
              href={"https://github.com/francisojeah"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={"/assets/icons/github-icon.svg"}
                alt="Youtube Icon"
                className="h-fit w-[1.2rem]"
              />
            </a>
            <a href={"https://twitter.com/FrancisOjeah"} target="_blank">
              <img
                src={"/assets/icons/twitter-icon.svg"}
                alt="Twitter Icon"
                className="h-fit w-[1.2rem]"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
