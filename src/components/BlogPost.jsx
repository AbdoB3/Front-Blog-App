
function BlogPost({ userName, title, role,content }) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 my-10">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-gray-600 mb-2">By {userName} <span className="font-bold underline">{role}</span></p>
        <p className="text-gray-800">{content}</p>
      </div>
    );
  }

  export default BlogPost
  