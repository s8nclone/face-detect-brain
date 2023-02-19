import React from  'react';
import './facedetect.css'

const FaceDetection = ({ IMAGE_URL, box }) => {
    return (
        <div className='center mt3'>
            <div className='polaroid'>
                <img id='inputimage' alt='' src={IMAGE_URL} />
                <div className='bounding-box'
                style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}>
                </div>
            </div>
            
        </div>
        
    )
}

export default FaceDetection;