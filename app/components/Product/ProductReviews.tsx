"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface Review {
  id: string | number
  author: string
  rating: number
  comment: string
  date: string
}

interface ProductReviewsProps {
  reviews: Review[]
  productId: string | number
}

export function ProductReviews({ reviews, productId }: ProductReviewsProps) {
  const [activeTab, setActiveTab] = useState<"related" | "write" | "all">("all")
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ""
  })

  // Function to render star rating
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={i < Math.floor(rating) ? "#FFD700" : "#E5E7EB"}
        className="w-4 h-4"
      >
        <path
          fillRule="evenodd"
          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
          clipRule="evenodd"
        />
      </svg>
    ))
  }

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would normally send this to your API
    alert(`Review submitted: ${newReview.rating} stars, "${newReview.comment}"`)
    setNewReview({ rating: 5, comment: "" })
  }

  return (
    <div className="mt-12">
      {/* Tabs */}
      <div className="border-b flex space-x-8 mb-6">
        <button 
          className={`pb-2 font-medium ${
            activeTab === "related" 
              ? "border-b-2 border-blue-600 text-blue-600" 
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("related")}
        >
          Related Products
        </button>
        <button 
          className={`pb-2 font-medium ${
            activeTab === "write" 
              ? "border-b-2 border-blue-600 text-blue-600" 
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("write")}
        >
          Write your Review
        </button>
        <button 
          className={`pb-2 font-medium ${
            activeTab === "all" 
              ? "border-b-2 border-blue-600 text-blue-600" 
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("all")}
        >
          All Reviews
        </button>
      </div>

      {/* Review List */}
      {activeTab === "all" && (
        <div className="space-y-6">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className="border-b pb-6">
                <h3 className="font-medium">{review.author}</h3>
                <div className="flex my-1">
                  {renderStars(review.rating)}
                </div>
                <p className="text-sm my-2">{review.comment}</p>
                <p className="text-xs text-gray-500">{review.date}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">No reviews yet. Be the first to leave a review!</p>
          )}
        </div>
      )}

      {/* Write Review Form */}
      {activeTab === "write" && (
        <form onSubmit={handleSubmitReview} className="bg-gray-50 p-6 rounded-md">
          <h3 className="font-medium mb-4">Write a Review</h3>
          
          <div className="mb-4">
            <label htmlFor="rating" className="block text-sm mb-1">Rating</label>
            <select 
              id="rating"
              className="w-full p-2 border border-gray-300 rounded bg-white"
              value={newReview.rating}
              onChange={(e) => setNewReview({...newReview, rating: Number(e.target.value)})}
            >
              <option value="5">5 Stars - Excellent</option>
              <option value="4">4 Stars - Very Good</option>
              <option value="3">3 Stars - Good</option>
              <option value="2">2 Stars - Fair</option>
              <option value="1">1 Star - Poor</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label htmlFor="comment" className="block text-sm mb-1">Comments</label>
            <textarea 
              id="comment"
              className="w-full p-2 border border-gray-300 rounded bg-white h-32"
              placeholder="Share your experience with this product..."
              value={newReview.comment}
              onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
              required
            />
          </div>
          
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            Submit Review
          </Button>
        </form>
      )}

      {/* Related Products Tab - This would be populated from RelatedProducts component */}
      {activeTab === "related" && (
        <div className="text-center py-6">
          <p className="text-gray-500">Related products will be shown here.</p>
        </div>
      )}
    </div>
  )
}