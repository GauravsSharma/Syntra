import React, { Suspense } from 'react'

const EmbedLayout = ({ children }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        {children}
      </div>
    </Suspense>
  )
}

export default EmbedLayout