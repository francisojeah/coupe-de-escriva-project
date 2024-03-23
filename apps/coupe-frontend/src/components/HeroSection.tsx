const HeroSection = () => {
  return (
    <div
      className="w-full grid md:grid-cols-2 border border-[#D9D9D9] rounded-2xl md:rounded-3xl lg:rounded-[2.5rem] shadow-md backdrop:blur-3xl overflow-hidden"
      style={{ background: "linear-gradient(135deg, #ffffff, #f5f5f5)" }}
    >
      <div className=" flex flex-col items-center text-center md:items-start md:text-start gap-[2rem] mx-auto p-[2.5rem]">
        <p className="lg:text-5xl text-3xl text-center md:text-start font-bold lg:leading-[55px] leading-[40px]">
          Ignite your sports passion with <br/>Coupe De Escriva!
        </p>
        <p className="md:text-xl text-lg text-start leading-[140%]">
          Get live updates and exclusive content for football, basketball, and
          volleyball, all on our official website.
        </p>

        <div className="flex w-full lg:justify-normal justify-between lg:items-start items-center gap-full md:gap-[1.5rem]">
          <div className="flex md:p-4 p-2 flex-col items-center gap-2">
            <p className="text-[1.5rem] lg:text-[2.25rem] font-bold">
              4
            </p>
            <p className="font-medium lg:text-[1rem]">Teams</p>
          </div>
          <div className="flex md:p-4 p-2 flex-col items-center gap-2">
            <p className="text-[1.5rem] lg:text-[2.25rem] font-bold">
              3
            </p>
            <p className="font-medium lg:text-[1rem]">Sports</p>
          </div>
          <div className="flex md:p-4 p-2 flex-col items-center gap-2">
            <p className="text-[1.5rem] lg:text-[2.25rem] font-bold">
              200+
            </p>
            <p className="font-medium lg:text-[1rem]">Players</p>
          </div>
        </div>
      </div>
      <div className="hidden md:flex lg:p-[2.5rem] md:p-[1.5rem] p-[1rem] justify-center items-center w-full">
        <img
          src={"/assets/images/collage-image.png"}
          alt="Logo"
          className="lg:w-[25rem] lg:h-[25rem]"
        />
      </div>
    </div>
  );
};

export default HeroSection;
