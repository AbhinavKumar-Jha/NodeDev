import React from 'react'
import appwriteService from "../appwrite/config.service"
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage}) { //$id - special syntax of aappwrite
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img className="rounded-xl" src={appwriteService.getFilePreview(featuredImage)}
                 alt={title}/>
            </div>
        </div>
        <h2 className='text-xl font-bold'>
            {title}</h2>
    </Link>
  )
}

export default PostCard