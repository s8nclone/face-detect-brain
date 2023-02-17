import React from 'react';
import Tilt from  'react-tilt';
import brain from './brains.png';
import './logo.css';

const Logo = () => (
    <div className="ma4 mt0">
        <Tilt className="Tilt" options={{ max: 25 }} style={{ height: 200, width: 200 }} >
            <div className="Tilt-inner pa3">
                <img style={{paddingTop: '5px'}} src={brain} alt="brain logo" />
            </div>
        </Tilt>
    </div>
);

export default Logo;