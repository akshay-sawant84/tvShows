import React from "react";
import styles from "../styles/Card.module.css";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";
import Error from "next/error";
import { useRouter } from "next/router";

function Card({ shows }) {
  const router = useRouter();
  return (
    <>
      {shows.length > 1 &&
        shows.map((val, i) => (
          <div className={styles.card} key={i}>
            <img src={val.show?.image?.medium} className={styles.cardImage} alt = 'show image' />
            <Link
              href={{
                pathname: "/tv-shows/details/[id]",
                query: {
                  id: Number.isInteger(val.show.id)
                    ? val.show.id
                    : () => router.push("/500"),
                },
              }}
              // href={`/tv-shows/details/${val.show.id}`}
            >
              <h2 style={{ cursor: "pointer" }}>{val.show.name}</h2>
            </Link>
            <p>Language : {val.show.language}</p>
            <p>Genres : {val.show.genres.join(", ")}</p>
            <p>Runtime : {val.show.runtime}</p>
            <p>
              Premiered : {moment(val.show.premiered).format("Do MMM, YYYY")}{" "}
            </p>
            <p>Rating : {val.show.rating?.average}</p>
            <p>Country : {val.show?.network?.country?.name}</p>
          </div>
        ))}
    </>
  );
}

export default Card;
