import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/";
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/10 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link to="/">
          <h1 className="text-3xl font-bold text-white">
            Blogify
          </h1>
        </Link>

        <div className="flex items-center gap-5">

          <Link
            to="/"
            className="text-white hover:text-cyan-300"
          >
            Home
          </Link>

          <Link
            to="/create"
            className="bg-cyan-500 px-4 py-2 rounded-xl text-white hover:bg-cyan-600"
          >
            Create Blog
          </Link>

          {!token ? (
            <>
              <Link
                to="/register"
                className="text-white hover:text-cyan-300"
              >
                Register
              </Link>

              <Link
                to="/login"
                className="text-white hover:text-cyan-300"
              >
                Login
              </Link>
            </>
          ) : (
            <>
              <span className="text-white font-semibold">
                👤 {user?.name}
              </span>

              <button
                onClick={logout}
                className="bg-red-500 px-4 py-2 rounded-xl text-white hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;