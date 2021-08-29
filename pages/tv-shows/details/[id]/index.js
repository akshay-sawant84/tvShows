import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import Head from "next/head";

function ShowDetails() {
  const router = useRouter();
  const [showData, setshowData] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    setisLoading(true);
    const { id } = router?.query;
    // if (Number.isInteger(parseInt(id))) {
    //   getShowDetails(id);
    // }else{
    //   router.push('/500')
    // }

    getShowDetails(id);
  }, [router]);

  const getShowDetails = (id) => {
    axios
      .get(`${process.env.SHOW_DETAILS}/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setshowData(res.data);
        } else {
          alert("something went wrong");
        }
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  };

  return (
    <div className="container">
      <Head>
        <title>Show Details</title>
        <meta name="description" content="avengers movies details" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="http://google.com/" />
      </Head>
      {isLoading ? (
        <h2 className="text-center">Loading ...</h2>
      ) : (
        <>
          <h1 className="text-center">Show Details</h1>
          {showData && (
            <>
              <img src={showData?.image?.medium} className="img-fluid" alt = 'show image' />
              <h1>{showData?.name}</h1>
              <p>AverageRuntime : {showData?.averageRuntime}</p>
              <p>DvdCountry : {showData?.dvdCountry}</p>
              <p>Genres : {showData?.genres.join(", ")}</p>
              <p>Language : {showData?.language}</p>
              <p>Country : {showData?.network?.country?.name}</p>
              <p>OfficialSite : {showData?.officialSite}</p>
              <p>
                Premiered : {moment(showData?.premiered).format("Do MMM, YYYY")}
              </p>
              <p>Rating : {showData?.rating?.average}</p>
              <p>Status : {showData?.status}</p>
              <p>
                Summary : {(showData?.summary).replace(/<\/?[^>]+(>|$)/g, "")}
              </p>
              <p>Type : {showData?.type}</p>
              <p>
                Url :{" "}
                <a href={showData?.url} target="_blank">
                  {showData?.url}
                </a>
              </p>
              <p>Weight : {showData?.weight}</p>{" "}
            </>
          )}

          <Link href="/tv-shows/avengers">
            <button className="btn d-flex align-items-center">
              <span className={`text-white mr-1 arrowRight`}> &larr; </span> Go
              Back{" "}
            </button>
          </Link>
        </>
      )}
    </div>
  );
}

export default ShowDetails;
