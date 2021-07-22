import {faList, faSignOutAlt, faUser, faHeart, faCompactDisc, faSearch} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React , {useState} from 'react'
import {Nav} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../css/Sidebar.css'

function Sidebar(props) {
    const [active, setActive] = useState("/");

    function handleChange(selected){
        setActive(selected)
    }

    return(
        <>
        <Nav className="col-md-3 d-flex justify-content-start d-md-block bg-dark sidebar"
            activeKey={active}
            onSelect={handleChange}
            >
                <div className="sidebar-sticky"></div>
            <Nav.Item>
                <Nav.Link eventKey="/" to="/" as={Link}> Playlists <FontAwesomeIcon className="float-right" icon={faList} /></Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="/albums" to="/albums" as={Link}> Álbumes <FontAwesomeIcon className="float-right" icon={faCompactDisc} /></Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="/library" to="/library" as={Link}> Me gusta <FontAwesomeIcon className="float-right" icon={faHeart} /></Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="/search" to="/search" as={Link}> Buscar <FontAwesomeIcon className="float-right" icon={faSearch} /></Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="/profile" to="/profile" as={Link}> Mi perfil <FontAwesomeIcon className="float-right" icon={faUser} /></Nav.Link>
            </Nav.Item>
            <hr></hr>
            <Nav.Item>
                <Nav.Link onClick={() => props.logout()}>
                    Log out
                <FontAwesomeIcon className="float-right" icon={faSignOutAlt} />
                </Nav.Link>
            </Nav.Item>
            </Nav>
        </>
    )

}

export default Sidebar
