import { NextPage } from "next";
import { AppPageDesign1 } from "./Components";
// import { SWRConfig } from "swr";
interface Props {}

const Page: NextPage<Props> = ({}) => {
  // 1. Full page with black background
  return <AppPageDesign1 />;
};

export default Page;
