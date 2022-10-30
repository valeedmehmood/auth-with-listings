import React from 'react'

const ErrorComp = () => {
  return (
    <div className="d-flex flex-center h-100 gap-20" data-testid="error">
        <h1>Ooops...</h1>
        <p>Something went wrong, please try again by refreshing the page.</p>
        <button onClick={() => window.location.reload()}>Refresh</button>
    </div>
  )
}

export default ErrorComp