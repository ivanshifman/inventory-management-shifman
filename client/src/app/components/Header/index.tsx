import { useTranslation } from "react-i18next";

type HeaderProps = {
  name: string;
};

const Header = ({ name }: HeaderProps) => {
  const { t } = useTranslation();
  return <h2 className="text-2xl font-semibold text-gray-700">{t(name)}</h2>;
};

export default Header;
