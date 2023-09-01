import Header from "./Header"
import Concert from "./Concert"
import data from "./data"

export default function App() {
	const concertElement = data.map(concert => {
		return <Concert
			key={concert.id}
			tour={concert.tour}
			band={concert.band}
			otherActs={concert.otherActs}
			date={concert.date}
			location={concert.location}
			imageUrl={concert.imageUrl}
		/>
	})

	return (<>
		<Header />
		{concertElement}
	</>
	)
}