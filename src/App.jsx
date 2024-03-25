import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import BlogPost from './components/BlogPost.jsx'
import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes,Link } from 'react-router-dom';
import LoginForm from './components/Auth/LoginForm.jsx';
import AddPost from './components/Post/AddPost.jsx';
import SignUpForm from './components/Auth/SignUpForm.jsx';
import EditePost from './components/Post/EditePost.jsx';

function App() {

  const [blogPosts, setBlogPosts] = useState([]);

  function addPost(val) {
    setBlogPosts([
      ...blogPosts,
      val
    ]);
  }

  useEffect(() => {
    // Fetch blog post data from the API
    fetch('http://localhost:3000/post')
      .then(response => response.json())
      .then(data => setBlogPosts(data))
      .catch(error => console.error('Error fetching blog posts:', error));
  }, []);


  return (
    <>
      {/*Heder component*/}
      <Header
        isLoggedIn={false}
      />
  <Routes>
        {/*Post component checks if the blogPosts arry empty or not*/}
        <Route path="/" element={
    blogPosts.length > 0 ? (
      <div className="container mx-auto px-4 py-8 my-9">
        <h1 className="text-3xl font-bold mb-8">My Blog</h1>
        <Link to="/addPost" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mx-6'>Ajouter</Link>
        {blogPosts.map(post => (
          <BlogPost
            userName={post.username}
            title={post.title}
            role={post.role}
            content={post.content}
            id={post._id} // Assuming each post has a unique ID
          />
        ))}
      </div>
    ) : (
      <p className="text-gray-600 m-40 text-center text-4xl">No posts available</p>
    )
  } />
        <Route path='/login' element={<LoginForm/>}/>
        <Route path='/register' element={<SignUpForm/>}/>
        <Route path='/addPost' element={<AddPost/>}/>
        <Route path='/edit/:id' element={<EditePost/>}/>
        </Routes>
        {/*Footer component*/}
      <Footer />

    </>
  )
}

export default App
