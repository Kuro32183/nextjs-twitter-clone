import type { NextPage } from "next";
import Head from "next/head";
import Feed from "../components/Feed";

const Home: NextPage = () => {
  return (
    <div className="col-span-7 min-h-screen overflow-scroll border-x scrollbar-hide lg:col-span-5">
      <Head>
        <title>Twitter Clone Tutorial Apps</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Feed />
    </div>
  );
};

export default Home;
