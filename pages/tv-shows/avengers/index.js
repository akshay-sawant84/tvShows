import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../../../components/Card";
import Head from "next/head";

function TvListShow() {
  const [tvShows, setTvShows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getTVShows();
  }, []);

  const getTVShows = () => {
    axios
      .get(`${process.env.BASE_PATH}?q=avengers`)
      .then((res) => {
        const { status } = res;

        if (status === 200) {
          setTvShows(res.data);
        } else {
          alert("Something Went Wrong");
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <div className="container">
      <Head>
        <title>Tv Shows</title>
        <meta name="description" content="avengers movies list" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="http://google.com/" />

      </Head>
      <h1 className="text-center">TV Shows</h1>
      <div className="grid">
        {isLoading ? <h2>Loading ...</h2> : <Card shows={tvShows} />}
      </div>
    </div>
  );
}

export default TvListShow;
