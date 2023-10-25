import { type FC } from "react";

interface Props {
  children: React.ReactNode;
}

const ContentLayout: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default ContentLayout;
