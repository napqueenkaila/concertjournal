import { useEffect, useState } from "react";
import { convertTimestamp, joinSupportingActs } from "../utils";
import { getConcerts } from "../firebase";
import { Link } from "react-router-dom";

export default function Concerts() {
  const [concerts, setConcerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadConcerts() {
      setLoading(true);
      try {
        const data = await getConcerts();
        setConcerts(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    loadConcerts();
  }, []);

  const concertElements = concerts.map((concert) => {
    return (
      <div
        key={concert.id}
        className="my-4 h-auto w-full border-b-2 border-accent hover:cursor-pointer focus:shadow-lg"
      >
        <Link
          to={concert.id}
          className="my-8 flex flex-col items-center gap-4 leading-snug tracking-tight text-black no-underline sm:flex sm:flex-row sm:justify-around md:items-start lg:items-stretch"
        >
          <img
            className="h-56 w-1/2 rounded-lg border-2 border-accent object-cover object-center lg:h-64"
            src={concert.mainImg}
          />

          <div className="w-1/2 text-center sm:text-left">
            <h1 className="text-xl font-bold leading-snug underline sm:text-2xl lg:mb-2 lg:text-3xl">
              {concert.tour}
            </h1>

            <h2 className="text-lg font-medium sm:text-xl lg:text-2xl">
              {concert.headliner}
            </h2>

            <p className="text-base font-normal sm:text-lg lg:text-xl">
              {joinSupportingActs(concert.supportingActs)}
            </p>

            <p className="my-1 text-xs font-semibold uppercase sm:text-sm lg:text-base">
              {convertTimestamp(concert.date.seconds)}
            </p>

            <p className="text-xs font-medium uppercase tracking-tight sm:text-sm lg:text-base">
              <i className="fa-solid fa-location-dot w-4 text-accent"></i>
              {concert.location}
            </p>
          </div>
        </Link>
      </div>
    );
  });

  if (loading) {
    return <h1>Loading....</h1>;
  }

  if (error) {
    return <h1>There was an error: {error.message}</h1>;
  }

  return (
    <div className="md:grid md:grid-cols-2 md:gap-x-8  xl:grid-cols-3 xl:gap-12">
      {concertElements}
    </div>
  );
}
