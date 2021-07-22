function getSearch(token, query){
    return new Promise((resolve, reject) => {
        if (!query) return resolve([])
        const rQuery = query.replace(' ', '+')
        const endpoint = "https://api.spotify.com/v1/search/?query=" + rQuery + "&type=album,track,artist&limit=10"
        fetch(endpoint, {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        })
            .then(res => res.json())
            .then(res => {
                console.log("searchRes", res)
                resolve(res)
            });
    })
}

export default getSearch
