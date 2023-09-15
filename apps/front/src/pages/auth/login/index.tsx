import { useState } from "react";
import { useMutation } from "react-query";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/use-auth";

const Login = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const auth = useAuth();

  const { mutate, status } = useMutation(auth.signin, {
    onSuccess: () => navigate("/"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(values);
  };

  const handleChange = (e) => {
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  if (auth?.data?.user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex justify-center flex-col items-center pt-20 gap-5">
      <h1 className="text-2xl">Login</h1>
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <label className="relative block">
          <span className="text-sm text-bold">Email</span>
          <input
            className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2  pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="example@domain.com"
            type="email"
            name="email"
            onChange={handleChange}
          />
          {!values.email && status === "loading" && (
            <p className="text-red-800 text-xs">Field is required</p>
          )}
        </label>

        <label className="relative block">
          <span className="text-sm text-bold">Password</span>
          <span className="absolute inset-y-0 left-0 flex items-center pl-2"></span>
          <input
            className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2  pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Search for anything..."
            type="password"
            name="password"
            onChange={handleChange}
          />
          {!values.password && status === "loading" && (
            <p className="text-red-800 text-xs">Field is required</p>
          )}
        </label>
        <button
          className="btn bg-indigo-500 hover:bg-indigo-700 rounded text-white py-2"
          disabled={!values.email || !values.password}
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
