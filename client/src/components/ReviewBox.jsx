import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from './Toast';
import { getReviews, addReview, deleteReview } from '../services/api';

const ReviewBox = ({ productId }) => {
  const { user, token } = useAuth();
  const { t } = useLanguage();
  const { showToast } = useToast();

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchReviews = async () => {
    try {
      const data = await getReviews(productId);
      setReviews(data.reviews || data || []);
    } catch {
      setReviews([]);
    }
  };

  useEffect(() => {
    if (productId) fetchReviews();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating) {
      showToast('Please select a rating', 'error');
      return;
    }
    try {
      setLoading(true);
      await addReview({ productId, rating, comment });
      showToast('Review submitted', 'success');
      setRating(0);
      setComment('');
      fetchReviews();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to submit review', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      await deleteReview(reviewId);
      showToast('Review deleted', 'info');
      fetchReviews();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to delete review', 'error');
    }
  };

  const renderStars = (count) => {
    return '★'.repeat(count) + '☆'.repeat(5 - count);
  };

  return (
    <div className="reviews-section">
      <h2>{t('Reviews')}</h2>

      {token && (
        <form className="review-form" onSubmit={handleSubmit}>
          <h4>{t('Write a Review')}</h4>
          <div className="star-input">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={star <= (hoverRating || rating) ? 'active' : ''}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              >
                ★
              </button>
            ))}
          </div>
          <textarea
            placeholder={t('Your review')}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button type="submit" className="review-submit-btn" disabled={loading}>
            {t('Submit Review')}
          </button>
        </form>
      )}

      <div className="review-list">
        {reviews.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>{t('No reviews yet')}</p>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="review-card">
              <div className="review-header">
                <span className="review-user">{review.user?.name || 'User'}</span>
                <span className="review-date">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="review-stars">{renderStars(review.rating)}</div>
              <p className="review-text">{review.comment}</p>
              {user && (user._id === review.user?._id || user.role === 'admin') && (
                <button
                  className="review-delete"
                  onClick={() => handleDelete(review._id)}
                >
                  {t('Delete')}
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewBox;
