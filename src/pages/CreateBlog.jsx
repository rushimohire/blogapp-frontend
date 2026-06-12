import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function CreateBlog() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("content", content);

      if (image) {
        formData.append("image", image);
      }

      await API.post(
        "/blogs",
        formData
      );

      alert(
        "Blog Created Successfully"
      );

      navigate("/");

    } catch (error) {

      console.log(error);

      alert(
        error?.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">

      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8"
      >

        <h1 className="text-4xl font-bold text-white mb-8">
          Create Blog
        </h1>

        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white mb-4"
          required
        />

        <textarea
          placeholder="Write your content..."
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
          className="w-full h-48 p-4 rounded-xl bg-white/10 border border-white/20 text-white mb-4"
          required
        />

        <input
          type="file"
          onChange={(e) =>
            setImage(
              e.target.files[0]
            )
          }
          className="text-white mb-6"
        />

        <button
          type="submit"
          className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-xl text-white font-semibold hover:scale-105 transition"
        >
          Publish Blog
        </button>

      </form>

    </div>
  );
}

export default CreateBlog;