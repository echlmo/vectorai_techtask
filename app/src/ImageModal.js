import React, {useEffect} from 'react';

// Custom modal/lightbox pop up for images

function ImageModal(props) {

    const handleKeyDown = (e) => {
        if (e.keyCode === 27){
            props.onClose();
        }
    }

    useEffect( () => {
        document.addEventListener("keydown", handleKeyDown, false);
    })

    return (
        <div className="modal-image">
            <img src={props.src} alt=""/>
        </div>
    )
}

export default ImageModal;