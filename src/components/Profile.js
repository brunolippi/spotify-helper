import { useEffect, useState } from "react"
import getProfile from "../helpers/getProfile"
import { Card, Button } from "react-bootstrap"
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function Profile({ token }) {

    const [profile, setProfile] = useState();

    useEffect(() => {
        getProfile(token).then(res => {
            setProfile(res)
        })
    }, [])


    return (
        <>
            {profile &&
                <>
                    <Card className="m-2 float-right" style={{ width: '15rem', display: 'absolute' }}>
                        <Card.Img id="profile-photo" variant="top" src={profile.images[0].url} />
                    </Card>
                    <h2><FontAwesomeIcon icon={faUser} /> Perfil</h2>
                    <hr></hr>
                    <b>Nombre: </b>
                    <p>{profile.display_name}</p>
                    <b>Email: </b>
                    <p>{profile.email}</p>
                    <b>Username:</b>
                    <p><a target="_blank" rel="noreferrer" href={profile.external_urls.spotify}>{profile.id}</a></p>
                    <b>Seguidores: </b>
                    <p>{profile.followers.total}</p>
                    <Button className="btn btn-success"><a href={profile.uri}>Abrir en Spotify</a></Button>
                </>
            }
        </>
    )
}

export default Profile
