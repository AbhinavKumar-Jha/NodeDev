import React, {useEffect, useState} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from '../appwrite/config.service'
import { useSelector } from "react-redux";
import Logo from '../components/Logo'

function Home() {

    const [posts, setPosts] = useState([]); // State to hold multiple posts
    const userData = useSelector((state) => state.auth.userData); // Get the logged-in user data from the Redux store

    useEffect(() => {
        const fetchPosts = async () => {
            if (userData?.$id) {
                const userPosts = await appwriteService.getPostforHome(userData.$id); // Fetch posts for the logged-in user
                if (userPosts) {
                    setPosts(userPosts.documents); // Set the posts data
                }
            }
        };

        fetchPosts();
    }, [userData]);

  if(posts.length === 0) return (
            <div className="w-full h-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full h-full">
                            <div className="mb-4 inline-flex items-center">
                                <Logo width='100px' height='100px' />
                            </div>
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
  )
  return (
    <div className='w-full py-8'>
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap flex-col'>
                <h1 className='font-bold text-4xl mb-10'>My Posts</h1>
                    <div className='flex flex-row'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                    </div>
                </div>
            </Container>
        </div>
    </div>
  )
}

export default Home