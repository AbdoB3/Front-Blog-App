import { useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import { useNavigate, useParams } from 'react-router-dom';



export default function EditePost() {
    const { id } = useParams()
    const [formData, setFormData] = useState({ title: '', content: '' });


    useEffect(() => {
        // Fetch blog post data from the API
        fetch(`http://localhost:3000/post/${id}`)
            .then(response => response.json())
            .then(data => setFormData(data))
            .catch(error => console.error('Error fetching blog posts:', error));
    }, []);


    const token = localStorage.getItem('token');
    const navigate = useNavigate()



    const isLoggedIn = () => {

        // Check if a token exists
        if (token) {
            try {
                // Parse and decode the token
                const decodedToken = jwtDecode(token);

                // Check token expiration
                const currentTime = Date.now() / 1000; // Convert to seconds
                if (decodedToken.exp < currentTime) {
                    console.log('Token expired')
                    return false;
                }

                // Token valid, user is logged in
                return true;
            } catch (error) {
                // Error decoding token, user is not logged in
                return false;
            }
        } else {
            console.log('Login first')
            return false;
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:3000/post/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        });
        if (!response.ok) {
            throw new Error('Failed to submit form');
        }
        navigate('/')
        const responseData = await response.json(); // Parse response data as JSON

        // Handle response data as needed
        console.log('Response data:', responseData);

        // Redirect or display success message, etc.
    };


    return (
        <>
            {isLoggedIn() ? (
                <>
                    <h1 className="container font-bold ml-11 text-3xl mt-36">Edit Post</h1>
                    <form className="max-w-sm mx-auto mb-36" onSubmit={handleSubmit}>


                        <div>
                            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                            <input type="text" id="title" value={formData.title} name="title" onChange={handleChange} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div>
                            <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content</label>
                            <textarea id="content" value={formData.content} name="content" rows="4" onChange={handleChange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>
                        </div>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  my-4">Submit</button>
                    </form>
                </>) : (

                <p className="text-gray-600 m-40 text-center text-4xl">You should login {id}</p>
            )}

        </>
    );
};

