import PageLayout from "../../components/PageLayout";
import HeroSection from "../../components/HeroSection";
import HomeFixtures from "../../components/HomeFixtures";
import HomeStandings from "../../components/HomeStandings";
import HomeTeams from "../../components/HomeTeams";
import HomeBanner from "../../components/HomeBanner";
import HomeHighlights from "../../components/HomeHighlights";
import HomePosts from "../../components/HomePosts";
import "swiper/css";

const HomePage = () => {
  return (
    <PageLayout>
      <div className="w-full flex flex-col gap-20">
       <HeroSection/>
        <HomeFixtures/>
        <HomeStandings/>
        <HomeBanner/>
        <HomeTeams/>
        <HomeHighlights/>
        <HomePosts/>
      </div>
    </PageLayout>
  );
};

export default HomePage;
