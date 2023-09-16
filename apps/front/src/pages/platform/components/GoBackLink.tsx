import Link from "./Link";
import { ArrowUturnLeftIcon } from "@heroicons/react/20/solid";

const GoBackLink = ({ to }: { to: string }) => (
  <Link to={to} className="flex gap-2 hover:underline text-sm">
    <ArrowUturnLeftIcon className="h-4 w-4 inline" /> <span>Go back</span>
  </Link>
);

export default GoBackLink;
