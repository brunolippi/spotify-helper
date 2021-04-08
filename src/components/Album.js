import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react"
import { getAlbum } from "../helpers/getAlbums"
import { Card, Button, Table, Modal, Breadcrumb, OverlayTrigger, Tooltip } from "react-bootstrap"
import { faFileAudio } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import deleteSongFromPlaylist from "../helpers/deleteSongFromPlaylist"
import ModalAddToPlaylist from "./ModalAddToPlaylist";

function Album({ token }) {

    let { id } = useParams();

    const [playlist, setAlbum] = useState();

    const [play, setPlay] = useState(true);
    const [playNum, setPlayNum] = useState();

    useEffect(() => {
        getAlbum(token, id).then(res => {
            setAlbum(res)
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
            setModal(!showModal)
        }).catch(err => console.log(err.message)), 2000)
    }

    const [showModal, setModal] = useState(false);

    function handeModal(id) {
        setDeleteID(id)
        setModal(!showModal)
    }

    const [showModalAdd, setModalAdd] = useState(false);
    const [addID, setAddID] = useState(0);
    const [modalType, setModalType] = useState();

    function handeModalAdd(id, type) {
        setAddID(id)
        setModalType(type)
        setModalAdd(!showModalAdd)
    }

    function success() {
        if(modalType === "change"){
            document.getElementById("tr-" + addID).remove()
        }
    }

    return (
        <>
            {playlist &&
                <>
                    <Breadcrumb>
                        <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                        <Breadcrumb.Item>
                        <Link to="/albums">Álbumes</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>{playlist.name}</Breadcrumb.Item>
                    </Breadcrumb>
                    <Card className="m-2 float-right" style={{ width: '15rem', display: 'absolute' }}>
                        {playlist.images[0] && <Card.Img variant="top" src={playlist.images[0].url} />}
                    </Card>
                    <h2><FontAwesomeIcon icon={faFileAudio} /> Álbum: <h2 style={{ fontWeight: "bolder", display: "inline" }}>{playlist.name}</h2></h2>
                    <hr></hr>
                    {playlist.description &&
                        <>
                            <b>Descripción: </b>
                            <p>{playlist.description}</p>
                        </>
                    }
                    <b>Cantidad: </b>
                    <p>{playlist.tracks.total} {playlist.tracks.total !== 1 ? "canciones" : "canción"}</p>
                    <b>Artista: </b>
                    <p><a target="_blank" rel="noreferrer" className="no-underline" href={playlist.artists[0].external_urls.spotify}>{playlist.artists[0].name}</a></p>
                    <b>URL:</b>
                    <p><a target="_blank" rel="noreferrer" href={playlist.external_urls.spotify}>{playlist.external_urls.spotify}</a></p>
                    <Button className="btn btn-success"><a href={playlist.uri}>Abrir en Spotify</a></Button>
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
                            {playlist.tracks && playlist.tracks.items.map((song, key) =>
                                <tr id={"tr-" + key}>
                                    <td>{key + 1}</td>
                                    <td>{song.name}</td>
                                    <td style={{ fontWeight: "bolder" }}>{song.artists[0].name}</td>
                                    <td>{millisToMinutesAndSeconds(song.duration_ms)}</td>
                                    <td id={"song-preview-" + key}>{!play && playNum === key ? <OverlayTrigger placement="bottom" overlay={<Tooltip>Pausar preview</Tooltip>}><Button variant="danger" onClick={() => preview(song.preview_url, key)}>Pausar</Button></OverlayTrigger> : <OverlayTrigger placement="bottom" overlay={<Tooltip>Reproducir preview</Tooltip>}><Button variant="success" disabled={!song.preview_url} title={!song.preview_url ? "No tiene preview" : ""} onClick={() => preview(song.preview_url, key)}>Play</Button></OverlayTrigger>}</td>
                                    <td><OverlayTrigger placement="bottom" overlay={<Tooltip>Agregar a otra playlist</Tooltip>}><Button variant="primary" title="Agregar a una playlist" onClick={() => handeModalAdd(key, "add")}>Agregar</Button></OverlayTrigger></td>
                                </tr>
                            )}
                            {playlist.tracks.items.length === 0 && <td colSpan="6">Aún no has agregado ninguna canción.</td>}
                        </tbody>
                    </Table>
                    {showModalAdd && <ModalAddToPlaylist show={showModalAdd} playlist={playlist} success={success} type={modalType} token={token} id={addID} handleModal={handeModalAdd} />}
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

export default Album