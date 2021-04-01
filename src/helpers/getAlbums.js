function getAlbums(token){
    return new Promise((resolve, reject) => {
        const endpoint = "https://api.spotify.com/v1/me/albums"

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

function getAlbum(token, id){
    return new Promise((resolve, reject) => {
        const endpoint = "https://api.spotify.com/v1/albums/" + id
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

export {getAlbums, getAlbum}