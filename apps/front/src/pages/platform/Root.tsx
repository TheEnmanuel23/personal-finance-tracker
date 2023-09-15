import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";

const Root = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    auth.signout();
    navigate("/signin");
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between">
        <h1>Welcome {auth?.data?.user.firstName}!</h1>

        <button
          className="btn bg-indigo-500 hover:bg-indigo-700 rounded text-white p-2"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
      <Outlet />
    </div>
  );
};

export default Root;
