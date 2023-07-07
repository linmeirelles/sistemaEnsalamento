import { Outlet, NavLink } from "react-router-dom";
import { Nav, Navbar, Container } from 'react-bootstrap/';
import logo from '../logo.png'

const Layout = () => {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" data-bs-theme="" className="bg-layout">
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} alt="Logo" width="43"/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/professor" className="nav-link" activeClassName="active">Professores</NavLink>
              <NavLink to="/periodo" className="nav-link" activeClassName="active">Períodos</NavLink>
              <NavLink to="/curso" className="nav-link" activeClassName="active">Cursos</NavLink>
              <NavLink to="/sala" className="nav-link" activeClassName="active">Salas</NavLink>
              <NavLink to="/horario" className="nav-link" activeClassName="active">Horários</NavLink>
              <NavLink to="/desafio" className="nav-link" activeClassName="active">Desafios</NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
