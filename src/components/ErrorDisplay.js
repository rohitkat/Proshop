import React from 'react'

function ErrorDisplay({errorMessage}) {
  return (
    <div className="alert alert-danger alert-dismissible fade show">
        <h3 className="alert-heading"><i class="fa fa-exclamation-triangle"></i> Oops! Something went wrong.</h3>
        <p>{errorMessage}.</p>
        <hr />
        <p className="mb-0">Try Loading again or check with the Administrator for more details.</p>
    </div>
  )
}

export default ErrorDisplay