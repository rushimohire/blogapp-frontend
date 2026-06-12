import { useEffect, useState } from "react";
import API from "../services/api";
import BlogCard from "../components/BlogCard";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await API.get("/blogs");
      setBlogs(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||
      blog.content
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-5xl font-bold text-white text-center mb-4">
        Latest Blogs
      </h1>

      <p className="text-center text-gray-300 mb-8">
        {filteredBlogs.length} Blog Found
      </p>

      <div className="max-w-2xl mx-auto mb-10">

        <input
          type="text"
          placeholder="🔍 Search blogs..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 backdrop-blur-xl outline-none"
        />

      </div>

      {filteredBlogs.length === 0 ? (
        <div className="text-center mt-20">

          <h2 className="text-3xl text-white">
            No Blogs Found 😔
          </h2>

        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {filteredBlogs.map(
            (blog) => (
              <BlogCard
                key={blog._id}
                blog={blog}
              />
            )
          )}

        </div>
      )}

    </div>
  );
}

export default Home;