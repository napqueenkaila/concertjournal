import { useEffect, useState } from "react"
import { getConcert } from "../firebase"
import { useParams, Link } from "react-router-dom"
import { convertTimestamp, joinSupportingActs, getSlideImgs } from "../utils"
import ImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"

export default function ConcertDetail() {
    const [concert, setConcert] = useState({})
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const {id} = useParams()

    useEffect(() => {
        async function loadConcerts() {
            setLoading(true)
            try {
                const data = await getConcert(id)
                setConcert(data)
                setImages(getSlideImgs(data.imgUrls, data.mainImg))
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        loadConcerts()
    }, [id])


    if (loading) {
        return <h1>Loading...</h1>
    }

    if (error) {
        return <h1>There was an error: {error.message}</h1>
    }

    return (
        <div className="concert-detail-container">
            <Link
                to="/"
            >&larr; Back</Link>
            {concert && (
                <div className="concert-detail">
                    <h1>{concert.tour}</h1>
                    <h2>{concert.headliner}</h2>
                    <h3>{joinSupportingActs(concert.supportingActs)}</h3>
                    {/* <p>{convertTimestamp(concert.date.seconds)}</p> */}
                    <p>{concert.location}</p>
                    <div className="img-gallery-container">                        
                        <ImageGallery
                            showFullscreenButton={false}
                            showIndex={true}
                            additionalClass="image"
                            items={images} />
                    </div>
                </div>
            )}
        </div>
    )
}



