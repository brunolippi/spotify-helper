import {Button} from "react-bootstrap"
 
function TableTd(props, {song, key}){
    return(
                             <tr id={"tr-" + key}>
                                    <td>{key + 1}</td>
                                    <td>{song.track.name}</td>
                                    <td style={{ fontWeight: "bolder" }}>{song.track.artists[0].name}</td>
                                    <td>{props.millisToMinutesAndSeconds(song.track.duration_ms)}</td>
                                    <td id={"song-preview-" + key}><Button variant="success" disabled={song.track.preview_url === null} onClick={() => props.preview(song.track.preview_url, key)}>Play</Button></td>
                                    <td><Button variant="primary" onClick={() => props.handeModalAdd(key)}>Agregar</Button>
                                    <Button className="mx-1" variant="warning" onClick={() => props.preview(song.track.preview_url, key)}>Cambiar</Button>
                                    <Button variant="danger" onClick={() => props.handeModal(key)}>Eliminar</Button></td>
                                </tr>
    )
}

export default TableTd