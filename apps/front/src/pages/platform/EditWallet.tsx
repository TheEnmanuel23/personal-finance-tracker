import { Typography } from "ui";
import { useParams } from "react-router-dom";
import WalletForm from "./components/WalletForm";
import { useWallet } from "../../queries/useWallet";

const EditWallet = () => {
  const params = useParams();
  const { data, isLoading } = useWallet(params.id);

  if (isLoading) return <Typography>...Loading</Typography>;

  return <WalletForm title={`Edit ${data.name}`} wallet={data} />;
};

export default EditWallet;
