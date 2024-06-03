import { Helmet } from "react-helmet-async";

type MetaTagsProps = {
  title?: string;
  description?: string;
  keywords?: string;
  pageUrl?: string;
};

const MetaTags = ({
  title = "Coupe De Escriva | News, Fixtures, Scores & Results | Official Website",
  keywords = "Coupe De Escriva, Sports, Soccer, Football, Basketball, Volleyball, League, Official, Coupe, News, Fixtures, Scores, Results",
  description = "Welcome to the official website of Coupe De Escriva! Stay updated with the latest news, fixtures, results, video highlights, transfers, and more. Get insights into matches, player stats, and team standings.",
  pageUrl = window.location.href
}: MetaTagsProps) => {
  return (
    <Helmet>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <link rel="icon" href={"/assets/images/coupe-logo.svg"} />
      <link rel="canonical" href={pageUrl} />
      <title>{title}</title>
      <meta name="og:title" content={title} />
      <meta name="og:description" content={description} />
      <meta name="og:image" content={"/assets/images/coupe-logo.svg"} />
      <meta name="og:url" content={pageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={"/assets/images/coupe-logo.svg"} />
    </Helmet>
  );
};

export default MetaTags;
