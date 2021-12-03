import React, {Fragment, useState, useEffect} from 'react';
import Loader from 'react-loader-spinner';

// Custom image component which will display loading spinner

const Picture = (props) => {
    const [loading, setLoading] = useState(true); // Manage loading state for images

    const isImgLoaded = () => {
        setLoading(false);
    }

    return (
        <Fragment>
            <div className="picture" style={{display: loading ? "none" : "block"}}>
                <img src={props.src} alt={props.alt} onLoad={isImgLoaded} />
            </div>
            <div className="loading" style={{display: loading ? "block" : "none"}}>
                <Loader type="Circles" timeout={3000}/>
            </div>
        </Fragment>
    )
}

export default Picture;