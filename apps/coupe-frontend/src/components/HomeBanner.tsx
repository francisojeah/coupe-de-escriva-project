const HomeBanner = () => {
  return (
    <div
      className="rounded-2xl w-full lg:h-[17.5rem] md:h-[12rem] h-[9rem] bg-cover flex justify-center items-center"
      style={{
        backgroundImage: `url('/assets/images/banner-bg.png')`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <p className="text-white font-bold lg:text-4xl md:text-3xl text-xl text-center flex">
        The Biggest Sports Tournament in <br />
        Pan-Atlantic University
      </p>
    </div>
  );
};

export default HomeBanner;
