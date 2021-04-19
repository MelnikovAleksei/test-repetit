import React from 'react'

function LoadingText({
  text,
}) {
  return (
    <div className="loading-text-container">
      <p className="loading-text">{text}</p>
    </div>
  )
}

export default LoadingText
