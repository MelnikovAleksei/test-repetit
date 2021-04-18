import React from 'react'

function ShowMoreButton({
  title,
  onClick,
}) {
  return (
    <div className="show-more-button-container">
      <button className="show-more-button" onClick={onClick}>
        {title}
      </button>
    </div>

  )
}

export default ShowMoreButton
