
import { CalendarDays, MapPin, ArrowUpRight } from "lucide-react";

const exhibitions = [
  {
    id: 1,
    title: "The Beauty of Abstract",
    date: "December 12, 2026",
    location: "Vijayawada Art Centre",
    description: "Explore beautiful abstract paintings created by emerging artists.",
    image: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=700"
  },
  {
    id: 2,
    title: "Colours of Life",
    date: "December 20, 2026",
    location: "Modern Art Gallery",
    description: "A wonderful collection celebrating colours, creativity and emotions.",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=700"
  },
  {
    id: 3,
    title: "Nature Through Art",
    date: "January 05, 2027",
    location: "Creative Arts Studio",
    description: "Discover artistic interpretations of nature and its beauty.",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=700"
  }
];

function Exhibitions() {
  return (
    <main className="exhibitions-page">

      <section className="exhibitions-heading">
        <p className="eyebrow">EXPERIENCE CREATIVITY</p>
        <h1>Art <span>Exhibitions</span></h1>
        <p>
          Discover inspiring exhibitions and experience
          the beauty of creativity.
        </p>
      </section>

      <section className="exhibitions-container">

        <div className="exhibitions-intro">
          <h2>Upcoming Exhibitions</h2>
          <p>Explore events and discover extraordinary artwork.</p>
        </div>

        <div className="exhibitions-grid">

          {exhibitions.map((event) => (
            <div className="exhibition-card" key={event.id}>

              <div className="exhibition-image">
                <img src={event.image} alt={event.title} />
                <span>UPCOMING EVENT</span>
              </div>

              <div className="exhibition-info">

                <h2>{event.title}</h2>

                <p className="exhibition-description">
                  {event.description}
                </p>

                <div className="exhibition-details">
                  <p>
                    <CalendarDays size={17} />
                    {event.date}
                  </p>

                  <p>
                    <MapPin size={17} />
                    {event.location}
                  </p>
                </div>

                <button
                  onClick={() => alert("Welcome to " + event.title)}
                >
                  Explore Event <ArrowUpRight size={18} />
                </button>

              </div>
            </div>
          ))}

        </div>

      </section>
    </main>
  );
}

export default Exhibitions;
