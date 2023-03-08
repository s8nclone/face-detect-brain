import React from  'react';
import './facedetect.css'

const FaceDetection = ({ image_url, box }) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputimage' alt='' src={image_url} width='500px' height='auto' />
                <div className='bounding-box'
                style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}>
                </div>
            </div>
            
        </div>
        
    )
}

export default FaceDetection;