import React from 'react'

function FeedbackText({
  text,
}) {
  return (
    <div className="feedback-text-container">
      <p className="feedback-text">{text}</p>
    </div>
  )
}

export default FeedbackText
