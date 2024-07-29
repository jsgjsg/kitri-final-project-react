import ReviewFilter from "./ReviewFilter";
import ReviewList from "./ReviewList";

const Review = () => {
  return (
    <div className="p-4 border border-gray-300 rounded-md">
      Review 페이지
      <ReviewFilter />
      <ReviewList />
    </div>
  );
}

export default Review;
