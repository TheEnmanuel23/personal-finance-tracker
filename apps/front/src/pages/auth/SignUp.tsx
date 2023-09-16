import { useState } from "react";
import { useMutation } from "react-query";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";
import { Button, Field } from "ui";

const SignUp = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const navigate = useNavigate();
  const auth = useAuth();

  const { mutate, status, isError } = useMutation(auth.signup, {
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
      <h1 className="text-2xl">Create Account</h1>
      <form className="flex flex-col gap-8 w-[300px]" onSubmit={handleSubmit}>
        <Field
          placeholder="example@domain.com"
          label="Email"
          type="email"
          name="email"
          onChange={handleChange}
          error={!values.email && status === "loading" && "Field is required"}
        />
        <Field
          placeholder="My secret"
          type="password"
          name="password"
          label="Password"
          onChange={handleChange}
          error={
            !values.password && status === "loading" && "Field is required"
          }
        />

        <Field
          label="First Name"
          placeholder="first name"
          type="text"
          name="firstName"
          onChange={handleChange}
          error={
            !values.firstName && status === "loading" && "Field is required"
          }
        />
        <Field
          label="Last Name"
          placeholder="last name"
          type="text"
          name="lastName"
          onChange={handleChange}
          error={
            !values.lastName && status === "loading" && "Field is required"
          }
        />
        <Button variant="indigo" disabled={!values.email || !values.password}>
          Sign Up
        </Button>
      </form>

      {isError && (
        <p className="text-red-800 text-xs text-bold">User already exists</p>
      )}

      <Link to="/signin" className="text-xs text-blue-800 underline">
        I already have an account
      </Link>
    </div>
  );
};

export default SignUp;
