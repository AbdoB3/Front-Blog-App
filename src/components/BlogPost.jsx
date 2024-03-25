import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';


function BlogPost() {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [blogPosts, setBlogPosts] = useState([]);


    useEffect(() => {
        // Fetch blog post data from the API
        fetch('http://localhost:3000/post')
            .then(response => response.json())
            .then(data => setBlogPosts(data))
            .catch(error => console.error('Error fetching blog posts:', error));
    }, []);


    const handleDelete = async (id) => {
        try {

            const response = await fetch(`http://localhost:3000/post/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to delete post');
            }
            console.log('Post deleted')
            navigate('/');
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };


    return (
        blogPosts.length > 0 ? (
            <div className="container mx-auto px-4 py-8 my-9">
                <h1 className="text-3xl font-bold mb-8">My Blog</h1>


                <Link to="/addPost" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mx-6'>Ajouter</Link>
                <div className="posts lg:grid grid-cols-3 gap-2">
                    
                    {blogPosts.map(post => (
                        <div className="bg-white  rounded-lg shadow-md p-6 my-10">
                            <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
                            <p className="text-gray-600 mb-2">By {post.username} <span className="font-bold underline">{post.role}</span></p>
                            <p className="text-gray-800">{post.content}</p>

                            <div className="mt-6" >
                                <Link to={`edit/${post._id}`}> <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Edit</button></Link>
                                <button type="button" onClick={() => handleDelete(post._id)} class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        ) : (
            <p className="text-gray-600 m-40 text-center text-4xl">No posts available</p>
        )
    );
}

export default BlogPost
