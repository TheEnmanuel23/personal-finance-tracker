import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";
import { Button, Typography } from "ui";

const Root = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    auth.signout();
    navigate("/signin");
  };

  return (
    <div className="flex justify-center pt-10">
      <div className="px-10 w-[700px] py-10 bg-white rounded-lg">
        <div className="flex justify-between items-center">
          <Typography as="h2">Welcome! {auth?.data?.user.firstName}</Typography>
          <Button variant="indigo" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
        <div className="pt-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Root;
