import React from 'react'
import {LoaderIcon} from 'lucide-react'

const Loader = () => {
  return (
    <div className='flex items-center justify-center w-[100%] h-[100vh]'>
      <LoaderIcon  className='w-200 h-200 animate-spin' />
    </div>
  )
}

export default Loader
