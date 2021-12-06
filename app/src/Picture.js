import React, {useState} from 'react';
import Loader from 'react-loader-spinner';

// Custom image component which will display loading spinner

const Picture = (props) => {
    const [loading, setLoading] = useState(true); // Manage loading state for images

    const isImgLoaded = () => {
        setLoading(false);
    }

    return (
        <div className="picture">
            {loading && <Loader type="Circles" timeout={3000}/>}
            <img id= {props.id} src={props.src} alt={props.alt} onLoad={isImgLoaded} />
        </div>
    )
}

export default Picture;