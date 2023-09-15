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
        <div className="p-2">
            <Link
                className="font-semibold"
                to="/"
            >&larr; Back</Link>
            {concert && (
                <>
                <div className="mt-4">

                    <h1 className="text-xl font-bold underline sm:text-2xl lg:text-3xl lg:mb-2">{concert.tour}</h1>
                    
                    <h2 className="text-lg font-medium sm:text-xl lg:text-2xl">{concert.headliner}</h2>
                    
                    <h3 className="text-base font-normal sm:text-lg lg:text-xl">{joinSupportingActs(concert.supportingActs)}</h3>
                    
                    {/* <p className="uppercase text-xs font-semibold my-1 sm:text-sm lg:text-base">{convertTimestamp(concert.date.seconds)}</p> */}
                    
                    <p className="uppercase text-xs font-medium tracking-tight sm:text-sm lg:text-base"><i className="w-4 text-accent fa-solid fa-location-dot"></i>{concert.location}</p>
                    </div>
                    
                    <div className="img-gallery-container">                        
                        <ImageGallery
                            showFullscreenButton={false}
                            showIndex={true}
                            additionalClass="image"
                            items={images} />
                    </div>
                </>
                
            )}
        </div>
    )
}



