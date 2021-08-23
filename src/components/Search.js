import { useEffect, useState } from "react"
import getSearch from "../helpers/getSearch"
import { Card, Button } from "react-bootstrap"
import {faSearch, faUser} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {default as blank} from '../img/blank.png'
import '../css/Search.css'
import {Link} from "react-router-dom";


function Search({ token }) {

    const [search, setSearch] = useState("");
    const [searchOptions, setSearchOptions] = useState({
        artists: true,
        albums: true,
        tracks: true
    });
    const [searchResults, setSearchResults] = useState([]);
    const image = (images) => {
        if(images.length) return images[0].url;
        return blank;
    }

    useEffect(() => {
        getSearch(token, search).then(res => {
            if(res.error) setSearchResults([])
            setSearchResults(res)
        })
    }, [search])

    const handleInput = (e) => {
        setSearch(e.target.value)
    }

    const handleCheckbox = (e) => {
        setSearchOptions({
            ...searchOptions, [e.target.name]: e.target.checked
        })
        console.log(searchOptions)
    }

    const artistsMap = (artist) => {
        if (artist.length > 0) return <p> - {artist[0].name}</p>
        return <p> - {artist[0].name}{artist.map(artist, index => {
                if (artist[0]) return "";
                return `, ${artist.name}`
            })}</p>
    }

    return (
            <>
                <FontAwesomeIcon className="search-icon" icon={faSearch} /><input value={search} onChange={handleInput} className="search-input" placeholder="Buscar..."/>
                <hr></hr>
                    <h4 className="search-options">Opciones</h4>
                <div className="search-checkbox">
                    <input type="checkbox" checked={searchOptions.artists} name="artists" onChange={handleCheckbox} /> <label htmlFor="artists"> <b>Artistas</b></label>
                    <input type="checkbox" checked={searchOptions.tracks} name="tracks" onChange={handleCheckbox} /> <label htmlFor="tracks"> <b>Canciones</b></label>
                    <input type="checkbox" checked={searchOptions.albums} name="albums" onChange={handleCheckbox} /> <label htmlFor="albums"> <b>Albumes</b></label>
                </div>
                <hr></hr>
                <br/>
                <div className="search-container">
                {searchOptions.artists && search && searchResults.artists &&
                <>
                <h2>Artistas</h2>
                    <br/>
                    {searchResults.artists && searchResults.artists.items.map((res) => {
                            return <div className="search-result">
                                <img className="search-image" src={image(res.images)} height="64" width="64" />
                                <a href={res.external_urls.spotify}>  {res.name}</a>
                                <hr/>
                            </div>
                    })}
                </>}
                {searchOptions.tracks && search && searchResults.tracks &&
                <>
                    <h2>Canciones</h2>
                    <br/>
                    {searchResults.tracks && searchResults.tracks.items.map((res) => {
                        return <div className="search-result">
                            <div className="search 1">
                            <img className="search-image" src={image(res.album.images)} height="64" width="64" />
                            </div>
                            <div className="search 2">
                            <a href={res.external_urls.spotify}> {res.name} </a>
                            </div>
                            <div className="search 3">
                            <a href={res.artists[0].external_urls.spotify}> {res.artists[0].name} </a>
                            </div>
                            <div className="search 4">
                            <a href={res.artists[0].external_urls.spotify}> {res.artists[0].name} </a>
                            </div>
                        </div>
                    })}
                </>}
                {searchOptions.albums && search && searchResults.albums &&
                <>
                    <h2>Albumes</h2>
                    <br/>
                    {searchResults.albums && searchResults.albums.items.map((res) => {
                        return <div className="search-result">
                            <img className="search-image" src={image(res.images)} height="64" width="64" />
                            <a href={res.external_urls.spotify}> {res.name} </a>
                            <p>{artistsMap(res.artists)}</p>
                            <hr/>
                        </div>
                    })}
                </>}
            </div>
                </>
    )
}

export default Search
