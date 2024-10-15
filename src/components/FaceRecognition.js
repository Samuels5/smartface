import React from "react";
import './FaceRecognition.css';

const FaceRecognition = ({imgurl, box}) => {
    return(
        <div className="center ma">
            <div className="absolute mt2">
            <img id='inputimage' alt = '' src={imgurl} width='500px' height='auto'/>
            <div className="b" style={{position: 'absolute', top: box.top, left: box.left, right: box.right, bottom: box.bottom}}></div> 
            </div>
        </div>
    );
}

export default FaceRecognition;