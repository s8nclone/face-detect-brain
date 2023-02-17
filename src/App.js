import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imageLink/ImageLinkForm';
import Rank from './components/rank/Rank';
import './App.css';
import bgimage from './bgimage.png';
class App extends Component {
  render () {
    const myStyle={
      backgroundImage: `url(${bgimage})`,
      height:'100vh',
      marginTop:'0px',
      fontSize:'50px',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    };

    return (
      <div className="App" style={myStyle}>
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
        {/* {
        
        <FaceDetection />} */}
      </div>
    );
  }
  
}

export default App;
