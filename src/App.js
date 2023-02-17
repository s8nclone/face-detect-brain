import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imageLink/ImageLinkForm';
import FaceDetection from './components/faceDetect/FaceDetection';
import Rank from './components/rank/Rank';
import './App.css';
import bgimage from './bgimage.png';


class App extends Component {
  constructor () {
    super();
    this.state = {
      input: '',
      IMAGE_URL: ''
    }
  }

  onInputChange = (e) => {
    this.setState({input: e.target.value})
  }

  onButtonSubmit = () => {
    console.log('click')
    
  const raw = JSON.stringify({
    "user_app_id": {
      "user_id": "s8nclone",
      "app_id": "my-first-application"
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": {IMAGE_URL: this.state.input}
                }
            }
        }
    ]
  });

  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key 8b63a591a71747b2b066b521e8d5bcfd'
      },
      body: raw
  };

  // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
  // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
  // this will default to the latest version_id

  fetch(`https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    
  }

  render () {
    const myStyle={
      backgroundImage: `url(${bgimage})`,
      height:'70vh',
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
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        <FaceDetection IMAGE_URL={this.state.IMAGE_URL}/>
      </div>
    );
  }
  
}

export default App;
