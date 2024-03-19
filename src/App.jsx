import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import BlogPost from './components/BlogPost.jsx'
import { useState, useEffect } from 'react';

function App() {

  const [blogPosts, setBlogPosts] = useState([]);

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
        isLoggedIn={true}
      />

      {/*Post component checks if the blogPosts arry empty or not*/}
      {blogPosts.length > 0 ? (
        <div className="container mx-auto px-4 py-8 my-9">
          <h1 className="text-3xl font-bold mb-8">My Blog</h1>
          {blogPosts.map(post => (
            <BlogPost
              userName={post.username}
              title={post.title}
              role={post.role}
              content={post.content}
            />

          ))}
        </div>) : (
        <p className="text-gray-600 m-40 text-center text-4xl">No posts available</p>
      )}

      {/*Footer component*/}
      <Footer />
    </>
  )
}

export default App
