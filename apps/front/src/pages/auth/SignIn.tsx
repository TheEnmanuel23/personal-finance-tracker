import { useState } from "react";
import { useMutation } from "react-query";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";
import { Button, Field } from "ui";

const SignIn = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const auth = useAuth();

  const { mutate, status, isError } = useMutation(auth.signin, {
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
      <form className="flex flex-col gap-8 w-[300px]" onSubmit={handleSubmit}>
        <Field
          label="Email"
          type="email"
          name="email"
          placeholder="example@domain.com"
          onChange={handleChange}
          error={!values.email && status === "loading" && "Field is required"}
        />
        <Field
          label="Password"
          placeholder="my secret"
          type="password"
          name="password"
          onChange={handleChange}
          error={
            !values.password && status === "loading" && "Field is required"
          }
        />

        <Button variant="indigo" disabled={!values.email || !values.password}>
          Sign In
        </Button>
      </form>

      {isError && (
        <p className="text-red-800 text-xs text-bold">Invalid user</p>
      )}

      <Link to="/signup" className="text-xs text-blue-800 underline">
        Create account
      </Link>
    </div>
  );
};

export default SignIn;
