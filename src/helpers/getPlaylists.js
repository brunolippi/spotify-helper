function getPlaylists(token){
    return new Promise((resolve, reject) => {
        const endpoint = "https://api.spotify.com/v1/me/playlists"
        fetch(endpoint, { 
            method: 'GET', 
            headers: new Headers({
              'Authorization': 'Bearer ' + token, 
              'Content-Type': 'application/x-www-form-urlencoded'
            })
          })
            .then(res => res.json())
            .then(res => {
              resolve(res)
            });
    })
}

function getPlaylist(token, id){
    return new Promise((resolve, reject) => {
        const endpoint = "https://api.spotify.com/v1/playlists/" + id
        fetch(endpoint, { 
            method: 'GET', 
            headers: new Headers({
              'Authorization': 'Bearer ' + token, 
              'Content-Type': 'application/x-www-form-urlencoded'
            })
          })
            .then(res => res.json())
            .then(res => {
              resolve(res)
            });
    })
}

export {getPlaylists, getPlaylist}