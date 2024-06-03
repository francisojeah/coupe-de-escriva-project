import { Helmet } from "react-helmet-async";

type MetaTagsProps = {
  title?: string;
  description?: string;
  keywords?: string;
  pageUrl?: string;
  imageUrl?: string;
};

const MetaTags = ({
  title = "Coupe De Escriva | News, Fixtures, Scores & Results | Official Website",
  keywords = "Coupe De Escriva, Sports, Soccer, Football, Basketball, Volleyball, League, Official, Coupe, News, Fixtures, Scores, Results",
  description = "Welcome to the official website of Coupe De Escriva! Stay updated with the latest news, fixtures, results, video highlights, transfers, and more. Get insights into matches, player stats, and team standings.",
  pageUrl = window.location.href,
  imageUrl = "/assets/images/coupe-logo.svg"
}: MetaTagsProps) => {
  return (
    <Helmet>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <link rel="icon" href="/assets/images/coupe-logo.svg" />
      <link rel="canonical" href={pageUrl} />
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
};

export default MetaTags;
