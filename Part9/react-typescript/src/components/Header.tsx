//const Header: React.FC<{ name: string }> = ({ name }) => <h1>{name}</h1>;
/*
const Header = ({ courseName: string }) => {
  return <h1>{courseName}</h1>;
};
*/
interface HeaderProps {
  courseName: string;
}
const Header = (props: HeaderProps): JSX.Element => {
  return <h1>{props.courseName}</h1>;
};

export default Header;
