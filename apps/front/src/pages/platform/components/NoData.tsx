import { Typography } from "ui";

const NoData = ({ message = "No Data" }: { message?: string }) => {
  return (
    <div className="flex flex-col py-20 gap-20 items-center">
      <Typography className="text-[100px]">:-(</Typography>
      <Typography as="h2">{message}</Typography>
    </div>
  );
};

export default NoData;
