import React from "react";
import { Button } from "@/components/ui/button";
import animationData from "../../public/guitar-animation.json";
import Lottie from "lottie-react";

interface HomePageProps {
  onClick: () => void;
  isMobile: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ onClick, isMobile }) => {
  return (
    <section className="w-full max-h-screen flex lg:flex-row md:flex-row flex-col items-center justify-center flex-1 gap-3 ">
      <div className="lg:w-[50%] md:w-[50%] w-full flex flex-col lg:gap-y-6 md:gap-y-5 gap-y-7 items-center ">
        <div className={`${isMobile ? "text-center" : "text-left"}`}>
        <span className="text-center font-bold lg:text-7xl md:text-5xl text-5xl">
          Discover a new musical gem every day.
        </span>
        </div>
        <div className={`${isMobile ? "text-center" : "text-left"}`}>
        <p className="text-base lg:text-xl "> Explore diverse genres, from
          folk to rock. Immerse yourself
          in the melodies that inspire and the rhythms that resonate. Start your
          musical journey today!</p>
          </div>
        <Button
          className="text-base md:text-lg lg:text-xl w-fit px-9 py-4"
          onClick={onClick}
        >
          Generate
        </Button>
      </div>
      <div className="lg:w-[50%] md:w-[50%] w-full lg:h-[50%] md:h-[50%] h-full flex items-center justify-center">
        {isMobile ? <Lottie animationData={animationData} style={{height:200}} />: <Lottie animationData={animationData}/>}
        
      </div>
    </section>
  );
};

export default HomePage;
