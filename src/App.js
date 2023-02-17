import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imageLink/ImageLinkForm';
import './App.css';

class App extends Component {
  render () {
    return (
      <div className="App">
        <Navigation />
        <Logo />
        <ImageLinkForm />
        {/* {
        
        <FaceDetection />} */}
      </div>
    );
  }
  
}

export default App;
