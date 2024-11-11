import React from "react";
import './FaceRecognition.css';

const FaceRecognition = ({imgurl, box}) => {
    
    return(
        <div className="center ma">
            <div className="absolute mt2">
            <img id='inputimage' alt = '' src={imgurl} width='500px' height='auto'/>
            {box.map((val,idx)=><div className="b" key={idx} style={{position: 'absolute', top: val.top, left: val.left, right: val.right, bottom: val.bottom}}></div> )}
            </div>
        </div>
    );
}

export default FaceRecognition;