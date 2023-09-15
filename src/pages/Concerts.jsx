import { useEffect, useState } from "react"
import {convertTimestamp, joinSupportingActs} from "../utils"
import { getConcerts } from "../firebase"
import { Link } from "react-router-dom"

export default function Concerts() {
    const [concerts, setConcerts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)


    useEffect(() => {
        async function loadConcerts() {
            setLoading(true)
            try {
                const data = await getConcerts()
                setConcerts(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        loadConcerts()
    }, [])

    const concertElements = concerts.map(concert => {
        return (
            <div key={concert.id} className="my-4 h-auto w-full border-b-2 border-accent hover:cursor-pointer focus:shadow-lg">

                <Link to={concert.id} className="no-underline text-black leading-snug tracking-tight flex flex-col items-center gap-4 my-8 sm:flex sm:flex-row sm:justify-around md:items-start lg:items-stretch">

                    <img className="border-2 border-accent rounded-lg w-1/2 h-56 object-contain object-center lg:h-64" src={concert.mainImg} />

                    <div className="text-center sm:text-left w-1/2">

                        <h1 className="text-xl font-bold underline leading-snug sm:text-2xl lg:text-3xl lg:mb-2">{concert.tour}</h1>
                    
                        <h2 className="text-lg font-medium sm:text-xl lg:text-2xl">{concert.headliner}</h2>
                    
                        <p className="text-base font-normal sm:text-lg lg:text-xl">{joinSupportingActs(concert.supportingActs)}</p>
                    
                        <p className="uppercase text-xs font-semibold my-1 sm:text-sm lg:text-base">{convertTimestamp(concert.date.seconds)}</p>

                        <p className="uppercase text-xs font-medium tracking-tight"><i className="w-4 text-accent fa-solid fa-location-dot"></i>{concert.location}</p>
                    </div>
                </Link>
            </div>
        )
    })

   
    
    
    if (loading) {
        return <h1>Loading....</h1>
    }
    
    if (error) {
        return <h1>There was an error: {error.message}</h1>
    }
    
    return (
        <div className="md:grid md:grid-cols-2 md:gap-4">
            {concertElements}
        </div>
    )
}