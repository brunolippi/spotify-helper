import { useState, useEffect } from "react"
import { Button, Card } from "react-bootstrap"
import { faCompactDisc } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getAlbums } from '../helpers/getAlbums'
import { Link } from "react-router-dom";
import BlankImage from "../img/blank.png"

function Albums({ token }) {
    const [albums, setAlbums] = useState();

    useEffect(() => {
        getAlbums(token).then(res => {
            setAlbums(res.items)
        })
    }, [])


    return (
        <>
            <h2><FontAwesomeIcon icon={faCompactDisc} /> Álbumes</h2>
            <hr />
            <div className="albumes">
                {albums && albums.map((album, i) =>
                    <Card className="m-2" style={{ width: '20rem', display: 'inline-flex' }}>
                        <Card.Img variant="top" width="318" height="318" src={album.album.images[0].url || BlankImage} />
                        <Card.Body>
                            <Card.Title>{album.album.name}</Card.Title>
                            <Card.Subtitle className="my-2 text-muted">Cantidad: {album.album.total_tracks}</Card.Subtitle>
                            <Button variant="success"><Link to={"/album/" + album.album.id}>Ver álbum</Link></Button>
                        </Card.Body>
                    </Card>
                )}
            </div>
        </>
    )
}

export default Albums;