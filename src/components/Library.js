import { useEffect, useState } from "react"
import deleteSongFromPlaylist from "../helpers/deleteSongFromPlaylist"
import { Card, Button, Table, Modal } from "react-bootstrap"
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {getLibrary} from "../helpers/getLibrary"
import ModalAddToPlaylist from "./ModalAddToPlaylist";

function Library({ token }) {

    const [playlist, setPlaylist] = useState();

    const [play, setPlay] = useState(true);
    const [playNum, setPlayNum] = useState();

    useEffect(() => {
        getLibrary(token).then(res => {
            console.log(res);
            setPlaylist(res);
            })
    }, [])

    function preview(url, id) {
        if (play) {
            playPreview(url, id)
            setPlayNum(id)
            setPlay(!play)
        } else {
            pausePreview(playNum)
            setPlay(!play)
        }
    }

    function playPreview(url, id) {
        let sound = document.createElement('audio');
        sound.id = 'audio-player-' + id;
        sound.src = url;
        document.getElementById('song-preview-' + id).appendChild(sound);
        sound.play()
    }

    function pausePreview(id) {
        let sound = document.getElementById('audio-player-' + id)
        sound.pause()
        sound.remove()
    }

    function millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    var itemID;
    const [deleteID, setDeleteID] = useState(0);

    async function deleteSong(itemID) {
        setTimeout(() => deleteSongFromPlaylist(token, playlist.id, playlist.tracks.items[deleteID].track.uri, deleteID).then((res) => {
            document.getElementById("tr-" + deleteID).remove()
            console.log(res)
            setModal(!showModal)
        }).catch(err => console.log(err.message)),2000)
    }
    
    const [showModal, setModal] = useState(false);

    function handeModal(id) {
        setDeleteID(id)
        setModal(!showModal)
    }

    const [showModalAdd, setModalAdd] = useState(false);
    const [addID, setAddID] = useState(0);

    function handeModalAdd(id) {
        setAddID(id)
        setModalAdd(!showModalAdd)
    }

    return (
        <>
            {playlist &&
                <>
                    <h2><FontAwesomeIcon icon={faHeart} /> Me gusta</h2>
                    <hr></hr>
                    <b>Descripción: </b>
                    <p>Canciones que te gustan en Spotify.</p>
                    <b>Cantidad: </b>
                    <p>{playlist.total} {playlist.total !== 1 ? "canciones" : "canción"}</p>
                    <Button className="btn btn-success"><a target="_blank" rel="noreferrer" href="https://open.spotify.com/collection/tracks">Abrir en Spotify</a></Button>
                    <hr />
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th style={{ width: "5%" }}>#</th>
                                <th style={{ width: "30%" }}>Nombre</th>
                                <th style={{ width: "20%" }}>Artista</th>
                                <th>Duración</th>
                                <th>Preview</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {playlist.items && playlist.items.map((song, key) =>
                                <tr id={"tr-" + key}>
                                    <td>{key + 1}</td>
                                    <td>{song.track.name}</td>
                                    <td style={{ fontWeight: "bolder" }}>{song.track.artists[0].name}</td>
                                    <td>{millisToMinutesAndSeconds(song.track.duration_ms)}</td>
                                    <td id={"song-preview-" + key}><Button variant="success" disabled={song.track.preview_url === null} onClick={() => preview(song.track.preview_url, key)}>Play</Button></td>
                                    <td><Button variant="primary" onClick={() => handeModalAdd(key)}>Agregar</Button>
                                    <Button className="mx-1" variant="warning" onClick={() => preview(song.track.preview_url, key)}>Cambiar</Button>
                                    <Button variant="danger" onClick={() => handeModal(key)}>Eliminar</Button></td>
                                </tr>
            )}
                            {playlist.items.length === 0 && <td  colSpan="6">Aún no has agregado ninguna canción.</td>}
                        </tbody>
                    </Table>
                    {showModalAdd && <ModalAddToPlaylist show={showModalAdd} playlist={playlist} type="change" token={token} id={addID} handleModal={handeModalAdd} />}
                    {showModal && <Modal show={showModal} onHide={handeModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Eliminar {playlist.tracks.items[deleteID].track.name}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body><p>Woohoo, estás por eliminar <a style={{ fontWeight: "bolder" }}>{playlist.tracks.items[deleteID].track.name}</a>! 
                        ¿Estás de acuerdo?</p></Modal.Body>
                        <Modal.Footer>
                            <Button style={{ fontWeight: "bolder" }} variant="danger" onClick={() => deleteSong(itemID)}>
                                Eliminar
                            </Button>
                            <Button variant="secondary" onClick={() => handeModal()}>
                                Cancelar
                            </Button>
                        </Modal.Footer>
                    </Modal>}
                </>
            }
        </>
    )
}

export default Library