import { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
  Link,
} from "react-router-dom";

import API from "../services/api";

function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      const res = await API.get(`/blogs/${id}`);

      setBlog(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/blogs/${id}`);

      alert("Blog Deleted Successfully");

      navigate("/");

    } catch (error) {
      console.log(error);
    }
  };

  if (!blog) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-white text-3xl">
          Loading...
        </h2>
      </div>
    );
  }

  const isOwner =
    user &&
    blog.author &&
    user.id === blog.author._id;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">

      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl">

        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-[500px] object-cover"
          />
        )}

        <div className="p-8">

          <div className="mb-4">

            <span className="text-cyan-300 text-sm">
              👤 {blog.author?.name || "Unknown Author"}
            </span>

            <p className="text-gray-400 text-sm mt-1">
              {new Date(
                blog.createdAt
              ).toLocaleDateString()}
            </p>

          </div>

          <h1 className="text-5xl font-bold text-white mb-6">
            {blog.title}
          </h1>

          <p className="text-gray-300 text-lg leading-8 whitespace-pre-line">
            {blog.content}
          </p>

          {isOwner && (
            <div className="flex gap-4 mt-8">

              <Link
                to={`/edit/${blog._id}`}
              >
                <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:scale-105 transition">
                  Edit Blog
                </button>
              </Link>

              <button
                onClick={handleDelete}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold hover:scale-105 transition"
              >
                Delete Blog
              </button>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default BlogDetails;