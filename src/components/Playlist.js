import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react"
import { getPlaylist } from "../helpers/getPlaylists"
import { Card, Button, Table, Modal, Breadcrumb, OverlayTrigger, Tooltip } from "react-bootstrap"
import { faFileAudio } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import deleteSongFromPlaylist from "../helpers/deleteSongFromPlaylist"
import ModalAddToPlaylist from "./ModalAddToPlaylist";


function Playlist({ token }) {

    let { id } = useParams();

    const [playlist, setPlaylist] = useState();

    const [play, setPlay] = useState(true);
    const [playNum, setPlayNum] = useState();
    let change = 0;

    useEffect(() => {
        getPlaylist(token, id).then(res => {
            setPlaylist(res)
        })
    }, [])

    function preview(url, id) {
        if (play) {
            playPreview(url, id)
            setPlayNum(id)
            setPlay(!play)
        } else {
            pausePreview(playNum)
            setPlayNum(id)
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
            change++
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
                        <Link to="/">Playlists</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>{playlist.name}</Breadcrumb.Item>
                    </Breadcrumb>
                    <Card className="m-2 float-right" style={{ width: '15rem', display: 'absolute' }}>
                        {playlist.images[0] && <Card.Img variant="top" src={playlist.images[0].url} />}
                    </Card>
                    <h2><FontAwesomeIcon icon={faFileAudio} /> Playlist: <h2 style={{ fontWeight: "bolder", display: "inline" }}>{playlist.name}</h2></h2>
                    {playlist.public ? <span class="badge badge-primary">Publica</span> : <span class="badge badge-warning">Privada</span>}
                    {playlist.collaborative ? <span class="badge badge-success mx-1">Colaborativa</span> : <span class="badge badge-warning mx-1">No colaborativa</span>}
                    <hr></hr>
                    {playlist.description &&
                        <>
                            <b>Descripci??n: </b>
                            <p>{playlist.description}</p>
                        </>
                    }
                    <b>Cantidad: </b>
                    <p>{playlist.tracks.total} {playlist.tracks.total !== 1 ? "canciones" : "canci??n"}</p>
                    <b>Propietario: </b>
                    <p><a target="_blank" rel="noreferrer" className="no-underline" href={playlist.owner.external_urls.spotify}>{playlist.owner.display_name}</a></p>
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
                                <th>Duraci??n</th>
                                <th>Preview</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {playlist.tracks && playlist.tracks.items.map((song, key) =>
                                <tr id={"tr-" + key}>
                                    <td>{key + 1}</td>
                                    <td>{song.track.name}</td>
                                    <td style={{ fontWeight: "bolder" }}>{song.track.artists[0].name}</td>
                                    <td>{millisToMinutesAndSeconds(song.track.duration_ms)}</td>
                                    <td id={"song-preview-" + key}>{!play && playNum === key ? <OverlayTrigger placement="bottom" overlay={<Tooltip>Pausar preview</Tooltip>}><Button variant="danger" onClick={() => preview(song.track.preview_url, key)}>Pausar</Button></OverlayTrigger> : <OverlayTrigger placement="bottom" overlay={<Tooltip>Reproducir preview</Tooltip>}><Button variant="success" disabled={!song.track.preview_url} title={!song.track.preview_url ? "No tiene preview" : ""} onClick={() => preview(song.track.preview_url, key)}>Play</Button></OverlayTrigger>}</td>
                                    <td><OverlayTrigger placement="bottom" overlay={<Tooltip>Agregar a otra playlist</Tooltip>}><Button variant="primary" title="Agregar a otra playlist" onClick={() => handeModalAdd(key, "add")}>Agregar</Button></OverlayTrigger>
                                    <OverlayTrigger placement="bottom" overlay={<Tooltip>Cambiar a otra playlist</Tooltip>}><Button className="mx-1" variant="warning" onClick={() => handeModalAdd(key, "change")}>Cambiar</Button></OverlayTrigger>
                                    <OverlayTrigger placement="bottom" overlay={<Tooltip>Eliminar de la playlist</Tooltip>}><Button variant="danger" onClick={() => handeModal(key)}>Eliminar</Button></OverlayTrigger></td>
                                </tr>
                            )}
                            {playlist.tracks.items.length === 0 && <td colSpan="6">A??n no has agregado ninguna canci??n.</td>}
                        </tbody>
                    </Table>
                    {showModalAdd && <ModalAddToPlaylist show={showModalAdd} playlist={playlist} success={success} type={modalType} token={token} id={addID} handleModal={handeModalAdd} />}
                    {showModal && <Modal show={showModal} onHide={handeModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Eliminar {playlist.tracks.items[deleteID].track.name}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body><p>Woohoo, est??s por eliminar <a style={{ fontWeight: "bolder" }}>{playlist.tracks.items[deleteID].track.name}</a>!
                        ??Est??s de acuerdo?</p></Modal.Body>
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

export default Playlist