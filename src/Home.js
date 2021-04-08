import { useState, useEffect } from "react"
import "./App.css"
import { Button, Card } from "react-bootstrap"
import { faPlus, faList, faFileAudio } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getPlaylists } from './helpers/getPlaylists'
import { Link } from "react-router-dom";
import BlankImage from "./img/blank.png"

function Home({ token }) {
    const [lists, setLists] = useState();

    useEffect(() => {
        getPlaylists(token).then(res => {
            setLists(res.items)
        })
        let uri = window.location.toString();
        if (uri.indexOf("?") > 1) {
            let clean_uri = uri.substring(0, uri.indexOf("?c"));
            window.history.replaceState({}, document.title, clean_uri);
        }
    }, [])


    return (
        <>
            { /*<Button variant="success" className="float-right"><Link><FontAwesomeIcon icon={faPlus} /> Crear playlist</Link></Button>*/}
            <h2><FontAwesomeIcon icon={faList} /> Playlists</h2>
            <hr />
            <div className="playlists">
                {lists && lists.map((playlist, i) =>
                    <Card className="m-2" style={{ width: '20rem', display: 'inline-flex' }}>
                        <Card.Img variant="top" width="318" height="318" src={playlist.images[0] && playlist.images[0].url || BlankImage} />
                        <Card.Body>
                            <Card.Title>{playlist.name}</Card.Title>
                            <Card.Subtitle className="my-2 text-muted">Cantidad: {playlist.tracks.total}</Card.Subtitle>
                            <Button variant="success"><Link to={"/playlist/" + playlist.id}>Ver playlist</Link></Button>
                        </Card.Body>
                    </Card>
                )}
            </div>
        </>
    )
}

export default Home;