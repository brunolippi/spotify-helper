import { Button } from "react-bootstrap"
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Info() {

    return (
                <>
                    <h2><FontAwesomeIcon icon={faInfoCircle} /> Información</h2>
                    <hr></hr>
                    <b>Proyecto: </b>
                    <p>Spotify Helper</p>
                    <b>Desarrollador: </b>
                    <p>Bruno Lippi</p>
                    <b>Versión: </b>
                    <p>v1.0 - 2021</p>
                    <b>Tecnologías: </b>
                    <ul>
                        <li>React.js</li>
                        <li>Bootstrap</li>
                        <li>Spotify APIs</li>
                        <li>REST</li>
                    </ul>
                    <Button className="btn btn-secondary"><a href="https://github.com/brunolippi/spotify-helper" target="_blank" rel="noreferrer">Abrir GitHub</a></Button>
                </>
    )
}

export default Info