import deleteSongFromPlaylist from "./deleteSongFromPlaylist"
import addSongToPlaylist from "./addSongToPlaylist"

function changeSongFromPlaylist(token, oldPlaylist, newPlaylist, uri, position) {
    addSongToPlaylist(token, newPlaylist, uri).catch(err => new Error(err.message))
    deleteSongFromPlaylist(token, oldPlaylist, uri, position).catch(err => new Error(err.message))
    return console.log("DONE.")
}

export default changeSongFromPlaylist