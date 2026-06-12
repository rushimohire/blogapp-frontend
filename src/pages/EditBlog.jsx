import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      const res = await API.get(`/blogs/${id}`);

      setTitle(res.data.title);
      setContent(res.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("content", content);

      if (image) {
        formData.append("image", image);
      }

      await API.put(`/blogs/${id}`, formData);

      alert("Blog Updated Successfully");

      navigate(`/blog/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">

      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">

        <h1 className="text-4xl font-bold text-white mb-8">
          Edit Blog
        </h1>

        <form
          onSubmit={handleUpdate}
          className="space-y-5"
        >

          <input
            type="text"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            placeholder="Blog Title"
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white outline-none"
          />

          <textarea
            value={content}
            onChange={(e) =>
              setContent(e.target.value)
            }
            placeholder="Blog Content"
            rows="8"
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white outline-none"
          />

          <input
            type="file"
            onChange={(e) =>
              setImage(e.target.files[0])
            }
            className="text-white"
          />

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:scale-105 transition"
          >
            Update Blog
          </button>

        </form>

      </div>

    </div>
  );
}

export default EditBlog;