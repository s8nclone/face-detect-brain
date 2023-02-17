import React from  'react';

const FaceDetection = ({ IMAGE_URL }) => {
    return (
        <div className='center mt3'>
            <img alt='img' src={IMAGE_URL} />
        </div>
    )
}

export default FaceDetection;