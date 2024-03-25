

import { Link, useNavigate } from 'react-router-dom';


function BlogPost({ userName, title, role, content, id }) {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const handleDelete = async () => {
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
            // Redirect to home page or any other desired action after successful deletion
            console.log('Post deleted')
            navigate('/');
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };


    return (
        <div className="bg-white rounded-lg shadow-md p-6 my-10">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <p className="text-gray-600 mb-2">By {userName} <span className="font-bold underline">{role}</span></p>
            <p className="text-gray-800">{content}</p>

            <div   className="mt-6" >
           <Link to={`edit/${id}`}> <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Edit</button></Link>            
           <button type="button" onClick={handleDelete} class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>        
            </div>

        </div>
    );
}

export default BlogPost
