import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div>
      <h1>Oops! Page Not Found</h1>
      <p>Something went wrong. The page you are looking for could not be found.</p>
      <p>
        <Link role="button" to="/">Go Home</Link>
      </p>
    </div>
  )
}
