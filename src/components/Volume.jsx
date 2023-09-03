import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
export const MuteVolumeRender = ({setVolume}) => {
    return(
        <button className="dropdown-item fw-bold text-danger" onClick={() => setVolume(true)}>
            Mute &nbsp;<FontAwesomeIcon icon="fa-solid fa-volume-xmark"/>
        </button>
    )
}


export const VolumeRender = ({setVolume}) => {
    return (
        <button className="dropdown-item fw-bold text-success" onClick={() => setVolume(false)}>
            Sound on &nbsp;<FontAwesomeIcon icon="fa-solid fa-volume-high"/>
        </button>
    )
}