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
            <div key={concert.id}>
                <Link to={concert.id} className="concert-tile">
                    <img className="concert-img" src={concert.mainImg} />
                    <div className="outer-container">
                        <h1 className="concert-tour">{concert.tour}</h1>
                        <h2 className="concert-headliner">{concert.headliner}</h2>
                        <p className="concert-acts">{joinSupportingActs(concert.supportingActs)}</p>
                        <p className="concert-date">{convertTimestamp(concert.date.seconds)}</p>
                        <div className="inner-container">
                            <i className="fa-solid fa-location-dot location-icon"></i>
                            <p className="concert-location">{concert.location}</p>
                        </div>
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
        <div className="concert-elements">
            {concertElements}
        </div>
    )
}