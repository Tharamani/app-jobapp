import withRoot from "./modules/withRoot";
// --- Post bootstrap -----
import React from "react";
import ProductSmokingHero from "./modules/views/ProductSmokingHero";
import AppFooter from "./modules/views/AppFooter";
import ProductHero from "./modules/views/ProductHero";
import ProductHowItWorks from "./modules/views/ProductHowItWorks";

import AppAppBar from './modules/views/AppAppBar';
import InfiniteCarousel from './modules/slick/InfiniteCarousel';
import CircularProgress from "@material-ui/core/CircularProgress";

function Home() {
  return (
    <React.Fragment>
      <AppAppBar />
      <InfiniteCarousel />
      <ProductHero />

      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Home);

{/*      <ProductHowItWorks />*/}