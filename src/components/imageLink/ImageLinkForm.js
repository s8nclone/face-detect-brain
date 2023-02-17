import React from  'react';

const ImageLinkForm = () => {
    return (
        <div>
            <p className='f3'>
                {'This magic brain will detect faces in your photos. Try it now!'}
            </p>
            <div>
                <imput className='f4 pa2 w-70 center' type='text'/>
                <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-orange'>Detect</button>
            </div>
        </div>
    )
}
export default ImageLinkForm;