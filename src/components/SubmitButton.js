import React from 'react'

function SubmitButton({
  title,
  disabled,
}) {
  return (
    <button disabled={disabled} type="submit" className="submit-button">
      {title}
    </button>
  )
}

export default SubmitButton
