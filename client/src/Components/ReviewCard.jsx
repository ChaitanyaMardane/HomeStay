import React from 'react'

const ReviewCard = ({r}) => {
  return (
   <div key={r.id} className="p-4 border rounded-xl bg-gray-50">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-800 font-medium">
                    {r.user?.username || "Anonymous"}
                  </span>
                  <span className="text-yellow-500 text-sm">
                    {"⭐".repeat(4)}
                  </span>
                </div>
                <p className="text-gray-700 text-sm">{r.comment}</p>
              </div>
  )
}

export default ReviewCard
