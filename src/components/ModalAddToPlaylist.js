import { Modal, Button, Form } from "react-bootstrap"
import {useState, useEffect} from "react"
import {getPlaylists} from "../helpers/getPlaylists"
import addSongToPlaylist from "../helpers/addSongToPlaylist"
import changeSongFromPlaylist from "../helpers/changeSongFromPlaylist"

function ModalAddToPlaylist(props) {

    const [playlists, setPlaylists] = useState([]);
    const [playlistID, setPlaylistID] = useState();


    useEffect(() => {
        getPlaylists(props.token).then(playlists => {
            playlists.items.forEach(playlist => {
                setPlaylists(playlists => [...playlists, {name: playlist.name, id: playlist.id}])
            })
    
        })
    }, [])

    function addSong(){
        var select = document.getElementById("inlineFormCustomSelect");
        const id = select.value
        addSongToPlaylist(props.token, playlists[id].id, props.playlist.tracks.items[props.id].track.uri)
        props.handleModal()
    }

    function getSongName(){
        var select = document.getElementById("inlineFormCustomSelect");
        const id = select.value
        setPlaylistID(playlists[id].name)
        return JSON.stringify(playlists[id].name)
    }

    function changeSong(){
        var select = document.getElementById("inlineFormCustomSelect");
        const id = select.value
        changeSongFromPlaylist(props.token, props.playlist.id, playlists[id].id, props.playlist.tracks.items[props.id].track.uri, props.id)
        props.handleModal()
    }

    return (
        <Modal show={props.show} onHide={props.handleModal}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar {props.playlist.tracks.items[props.id].track.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body><p>Selecciona a qué playlist {props.type === "add" ? "agregar" : "cambiar"} <a style={{ fontWeight: "bolder" }}>{props.playlist.tracks.items[props.id].track.name}</a> de {props.playlist.tracks.items[props.id].track.artists[0].name}.</p>
                <Form.Control
                    as="select"
                    className="mr-sm-2"
                    id="inlineFormCustomSelect"
                    custom
                    onChange={getSongName}
                    >
                    {playlists && playlists.map((playlist, key) =><option value={key}>{playlist.name}</option>)}
                </Form.Control>
                {playlistID && props.type === "change" ? <><hr /><p><a style={{ fontWeight: "bolder" }}>Atención:</a> esta canción se eliminará de la playlist <a style={{ fontWeight: "bolder" }}>{props.playlist.name}</a> y se agregará a <a style={{ fontWeight: "bolder" }}>{playlistID}</a>.</p></> : ""}
            </Modal.Body>
            <Modal.Footer>
                <Button style={{ fontWeight: "bolder" }} disabled={!playlistID ? true : false} variant={props.type === "add" ? "success" : "warning" } onClick={addSong} >
                {props.type === "add" ? "Agregar" : "Cambiar" }
                            </Button>
                <Button variant="secondary" onClick={props.handleModal}>
                    Cancelar
                            </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalAddToPlaylist