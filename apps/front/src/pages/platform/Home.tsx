import { useAuth } from "../../hooks/use-auth";

const Home = () => {
  const auth = useAuth();
  return <h1>home page {auth?.data?.user.firstName}</h1>;
};

export default Home;
