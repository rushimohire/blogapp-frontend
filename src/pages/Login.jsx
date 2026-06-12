import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { Link } from "react-router-dom";
function Login() {
    const navigate = useNavigate();

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await API.post(
                "/auth/login",
                {
                    email,
                    password,
                }
            );

            localStorage.setItem(
                "token",
                res.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
            );

            alert("Login Success");

            navigate("/");

        } catch (error) {
            alert(
                error.response?.data?.message
            );
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20">

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">

                <h1 className="text-4xl font-bold text-white mb-6">
                    Login
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }
                        className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white"
                    />

                    <button
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                    >
                        Login
                    </button>

                    <p className="text-gray-300 text-center mt-4">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="text-cyan-400"
                        >
                            Register
                        </Link>
                    </p>

                </form>

            </div>

        </div>
    );
}

export default Login;