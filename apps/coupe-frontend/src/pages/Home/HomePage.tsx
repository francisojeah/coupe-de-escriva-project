import PageLayout from "../../components/PageLayout";
import { Suspense, lazy } from "react";
import "swiper/css";
import MetaTags from "../../components/MetaTags";

const HeroSection = lazy(() => import("../../components/HeroSection"));
const HomeFixtures = lazy(() => import("../../components/HomeFixtures"));
const HomeStandings = lazy(() => import("../../components/HomeStandings"));
const HomeTeams = lazy(() => import("../../components/HomeTeams"));
const HomeBanner = lazy(() => import("../../components/HomeBanner"));
const HomeHighlights = lazy(() => import("../../components/HomeHighlights"));
const HomePosts = lazy(() => import("../../components/HomePosts"));

const HomePage = () => {
  return (
    <PageLayout>
      <>
        <MetaTags
          title={"Coupe de Escriva"}
          description={"Coupe de Escriva"}
          pageUrl={window.location.href}
        />
        <div className="w-full flex flex-col gap-20">
          <Suspense fallback={null}>
            <HeroSection />
          </Suspense>
          <Suspense fallback={null}>
            <HomeFixtures />
          </Suspense>
          <Suspense fallback={null}>
            <HomeStandings />
          </Suspense>
          <Suspense fallback={null}>
            <HomeBanner />
          </Suspense>
          <Suspense fallback={null}>
            <HomeTeams />
          </Suspense>
          <Suspense fallback={null}>
            <HomeHighlights />
          </Suspense>
          <Suspense fallback={null}>
            <HomePosts />
          </Suspense>
        </div>
      </>
    </PageLayout>
  );
};

export default HomePage;
