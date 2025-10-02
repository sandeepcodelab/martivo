import Container from "../Container/Container";

function Header() {
  return (
    <header className="bg-red-600">
      <Container>
        <nav className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl">LOGO</h1>
          </div>
          <div>
            <ul className="flex">
              <li>Home</li>
              <li>Shop</li>
              <li>Cart</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <p>Login</p>
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
