import React from "react";
import { Helmet } from "react-helmet";
import Banner from "~/client/home/Banner";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>首页</title>
        <meta name="name" content="content" />
      </Helmet>
      <div className="page-wrapper homepage">
        <Banner />
      </div>
    </>
  );
}
