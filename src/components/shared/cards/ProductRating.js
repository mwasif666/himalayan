import Link from "next/link";

const ProductRating = ({ reviews=[], isProductDetail }) => {

let averageRating = 0;

if (reviews.length > 0) {
    averageRating =
      reviews.reduce((sum, r) => sum + parseFloat(r.rating), 0) / reviews.length;
  }
averageRating =
    reviews.reduce((sum, r) => sum + parseFloat(r.rating), 0) / reviews.length;

  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (averageRating >= i) {
      stars.push(<i key={i} className="fas fa-star"></i>);
    } else if (averageRating >= i - 0.5) {
      stars.push(<i key={i} className="fas fa-star-half-alt"></i>); 
    } else {
      stars.push(<i key={i} className="far fa-star"></i>);
    }
  }

  return (
    <div className="product-ratting">
      <ul>
        {stars.map((star, index) => (
          <li key={index}>
            <Link href="#">{star}</Link>
          </li>
        ))}
      </ul>
      {reviews.length > 0 && isProductDetail && (
        <div className="rating-info">
          <span>{averageRating.toFixed(1)} / 5</span>{" "}
          <span>({reviews.length} reviews)</span>
        </div>
      )}
    </div>
  );
};

export default ProductRating;
