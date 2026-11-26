
import { useState } from "react";
import { Star, MessageCircle, Send } from "lucide-react";
import "./Reviews.css";

const initialReviews = [
  {
    id: 1,
    name: "Aarav Sharma",
    rating: 5,
    comment: "Beautiful collection of artwork! The website is elegant and easy to explore."
  },
  {
    id: 2,
    name: "Priya Mehta",
    rating: 4,
    comment: "I loved discovering new artists. The gallery has a wonderful collection."
  },
  {
    id: 3,
    name: "Rahul Verma",
    rating: 5,
    comment: "Amazing artwork and a lovely user experience. Highly recommended!"
  }
];

function Reviews() {
  const [reviews, setReviews] = useState(initialReviews);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  const submitReview = (e) => {
    e.preventDefault();

    if (!name.trim() || !comment.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    const newReview = {
      id: Date.now(),
      name: name.trim(),
      rating,
      comment: comment.trim()
    };

    setReviews([newReview, ...reviews]);

    setName("");
    setComment("");
    setRating(5);

    alert("Thank you for your review!");
  };

  return (
    <main className="reviews-page">

      <section className="reviews-heading">
        <p className="eyebrow">YOUR VOICE MATTERS</p>
        <h1>Customer <span>Reviews</span></h1>
        <p>
          Discover what art lovers think about their
          ARTMITHRA experience.
        </p>
      </section>

      <section className="reviews-container">

        <div className="reviews-summary">
          <MessageCircle size={30} />
          <h2>{reviews.length} Reviews</h2>
          <p>Thank you for sharing your experience with us.</p>
        </div>

        <div className="reviews-grid">

          {reviews.map((review) => (
            <div className="review-card" key={review.id}>

              <div className="review-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={19}
                    fill={star <= review.rating ? "#D5A34A" : "none"}
                    color="#D5A34A"
                  />
                ))}
              </div>

              <p className="review-comment">
                "{review.comment}"
              </p>

              <h3>{review.name}</h3>
              <span>ARTMITHRA Visitor</span>

            </div>
          ))}

        </div>

        <div className="review-form-container">

          <h2>Share Your Experience</h2>
          <p>We would love to hear your thoughts!</p>

          <form onSubmit={submitReview}>

            <label>Your Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label>Your Rating</label>
            <div className="rating-select">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  aria-label={`Rate ${star} stars`}
                >
                  <Star
                    size={27}
                    fill={star <= rating ? "#D5A34A" : "none"}
                    color="#D5A34A"
                  />
                </button>
              ))}
            </div>

            <label>Your Review</label>
            <textarea
              placeholder="Write your experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="4"
            />

            <button type="submit" className="submit-review">
              Submit Review <Send size={17} />
            </button>

          </form>
        </div>

      </section>
    </main>
  );
}

export default Reviews;
