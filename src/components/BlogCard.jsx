import { Link } from "react-router-dom";

function BlogCard({ blog }) {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl hover:scale-105 transition duration-300">

      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-60 object-cover"
      />

      <div className="p-5">

        <h2 className="text-white text-2xl font-bold">
          {blog.title}
        </h2>

        <p className="text-gray-300 mt-3">
          {blog.content.slice(0, 100)}...
        </p>

        <Link
          to={`/blog/${blog._id}`}
          className="inline-block mt-5 bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2 rounded-xl text-white"
        >
          Read More
        </Link>

      </div>

    </div>
  );
}

export default BlogCard;