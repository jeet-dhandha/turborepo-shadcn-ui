import { NextPage } from "next";

import { AppLogo, AppPageBodyCard } from "../Components";
import LoginForm from "./LoginForm";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <AppPageBodyCard className="flex items-center justify-center flex-col">
      <div className="mb-8">
        <AppLogo />
      </div>
      <LoginForm />
    </AppPageBodyCard>
  );
};

export default Page;
