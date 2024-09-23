import Image from 'next/image'
import React from 'react'

function BookCoverPage({imageUrl}:any) {
  return (
    <div><Image src={"/3D.png"} alt='cover' width={500} height={500}/></div>
  )
}

export default BookCoverPage