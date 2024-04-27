import { useEffect, useState } from "react";
import { useGetPlayersCountByCurrentSeasonQuery } from "../store/slices/appSlice";

const useCountUp = (targetValue: number, step: number, delay: number) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => {
        const nextCount = prevCount + step;
        return nextCount >= targetValue ? targetValue : nextCount;
      });
    }, delay);

    return () => clearInterval(timer);
  }, [targetValue, step, delay]);

  return count;
};

const CountUpNumber = ({ value }: any) => (
  <p className="text-[1.5rem] lg:text-[2.25rem] font-bold">{value}</p>
);

const CountUpSection = ({ targetValues, steps, delays, labels }: any) => {
  const counts = targetValues.map((targetValue: any, index: any) =>
    useCountUp(targetValue, steps[index], delays[index])
  );

  return (
    <div className="flex w-full lg:justify-normal justify-between lg:items-start items-center gap-full md:gap-[1.5rem]">
      {labels.map((label: any, index: any) => (
        <div
          key={label}
          className="flex md:p-4 p-2 flex-col items-center gap-2"
        >
          <CountUpNumber value={counts[index]} />
          <p className="font-medium lg:text-[1rem]">{label}</p>
        </div>
      ))}
    </div>
  );
};

const HeroSection = () => {
  const steps = [1, 1, 3];
  const delays = [300, 300, 30];
  const labels = ["Teams", "Sports", "Players"];

  const { data: playersCountData } = useGetPlayersCountByCurrentSeasonQuery(
    undefined,
    {
      refetchOnMountOrArgChange: 10,
    }
  );

  let countSection = null;
  if (playersCountData !== undefined) {
    const targetValues = [4, 3, playersCountData];
    countSection = (
      <CountUpSection
        targetValues={targetValues}
        steps={steps}
        delays={delays}
        labels={labels}
      />
    );
  }

  return (
    <div
      className="w-full grid md:grid-cols-2 border border-[#D9D9D9] rounded-2xl md:rounded-3xl lg:rounded-[2.5rem] shadow-md backdrop:blur-3xl overflow-hidden"
      style={{ background: "linear-gradient(135deg, #ffffff, #f5f5f5)" }}
    >
      <div className=" flex flex-col items-center text-center md:items-start md:text-start gap-[2rem] mx-auto p-[2.5rem]">
        <p className="lg:text-5xl text-3xl text-center md:text-start font-bold lg:leading-[55px] leading-[40px]">
          Ignite your sports passion with <br />
          Coupe De Escriva!
        </p>
        <p className="md:text-xl text-lg text-start leading-[140%]">
          Get live updates and exclusive content for football, basketball, and
          volleyball, all on our official website.
        </p>

        {countSection}
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
