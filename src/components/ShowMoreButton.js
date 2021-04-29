import React from 'react'

function ShowMoreButton({
  title,
  onClick,
  disabled,
}) {
  return (
    <div className="show-more-button-container">
      <button
        className="show-more-button"
        onClick={onClick}
        disabled={disabled}
      >
        {title}
      </button>
    </div>

  )
}

export default ShowMoreButton
