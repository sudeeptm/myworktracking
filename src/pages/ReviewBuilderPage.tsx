import { useState } from 'react';
import { ReviewBuilder } from '../components/ReviewBuilder';
import { workEntries } from '../data/seed';
import { ReviewArtifact } from '../types';

export const ReviewBuilderPage = () => {
  const [reviews, setReviews] = useState<ReviewArtifact[]>([]);

  const handleGenerate = (review: ReviewArtifact) => {
    setReviews([review, ...reviews]);
  };

  return (
    <div className="page-grid">
      <ReviewBuilder entries={workEntries} onGenerate={handleGenerate} />
      <section className="card">
        <div className="card-header">
          <h3>Generated Reviews</h3>
          <span className="hint">Evidence list attached</span>
        </div>
        <div className="review-list">
          {reviews.length === 0 ? (
            <p className="hint">No reviews generated yet.</p>
          ) : (
            reviews.map((review) => (
              <article key={review.id} className="review">
                <h4>{review.scopeType} · {review.timeframe}</h4>
                <p>{review.content}</p>
                <p className="entry-meta">Evidence: {review.entryIds.join(', ')}</p>
              </article>
            ))
          )}
        </div>
      </section>
      <section className="card">
        <div className="card-header">
          <h3>Export Bundles</h3>
          <span className="hint">JSON · Markdown · CSV</span>
        </div>
        <div className="button-row">
          <button className="secondary" type="button">Download JSON</button>
          <button className="secondary" type="button">Download Markdown</button>
          <button className="secondary" type="button">Download CSV</button>
        </div>
      </section>
    </div>
  );
};
