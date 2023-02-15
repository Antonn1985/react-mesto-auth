import logo from '../images/logo.svg';

function Header() {
  return (
    <header className="header page__header">
      <img
        className="logo page__logo"
        src={logo}
        alt="Место"
      />
    </header>
  );
}

export default Header;
