function deleteSongFromPlaylist(token, id, uri, position) {
    return new Promise((resolve, reject) => {
        const endpoint = `https://api.spotify.com/v1/playlists/${id}/tracks`
        fetch(endpoint, {
            method: 'DELETE',
            headers: new Headers({
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                tracks: [{ uri: uri, positions: [position] }]
            })
        })
            .then(res => res.json())
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                console.log(err)
                reject(err)
            })
    })
}

export default deleteSongFromPlaylist