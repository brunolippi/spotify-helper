function addSongToPlaylist(token, playlist_id, uri) {
    return new Promise((resolve, reject) => {
        const endpoint = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`
        fetch(endpoint, {
            method: 'POST',
            headers: new Headers({
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                uris: [uri]
            })
        })
            .then(res => res.json())
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
                console.log(err)
            })
    })
}

export default addSongToPlaylist