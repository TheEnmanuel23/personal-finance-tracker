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
    <div className="container mx-auto py-10">
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
  );
};

export default Root;
