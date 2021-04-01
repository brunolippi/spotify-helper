
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../logo.svg'
import './NavBar.css'

const NavBar = (props) => {
    return (
    
        <Navbar sticky="top" bg="dark" variant="dark">
            <Navbar.Brand href="#home">
                <img
                    alt=""
                    src={Logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
      Spotify Helper
    </Navbar.Brand>
    {props.logged && props.profile && <Nav className="ml-auto">
            <img
                    alt=""
                    src={props.profile.images[0].url}
                    width="30"
                    height="30"
                    className="profile mt-1"
                />
            <NavDropdown menuAlign="right" title="Cuenta" id="basic-nav-dropdown">
                <NavDropdown.Item disabled>{props.profile.display_name}</NavDropdown.Item>
                <hr />
                <NavDropdown.Item to="/profile" as={Link}>Perfil</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Configuración</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => props.logout()}>Log out</NavDropdown.Item>
            </NavDropdown>
            </Nav>}
        </Navbar>
    )
}

export default NavBar