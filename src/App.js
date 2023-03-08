import React, { Component } from 'react';
import ParticlesBg from 'particles-bg';
import Clarifai from 'clarifai';
import Signin from './components/signin/Signin';
import Register from './components/register/Register';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imageLink/ImageLinkForm';
import FaceDetection from './components/faceDetect/FaceDetection';
import Rank from './components/rank/Rank';
import './App.css';

const PAT = '99bab2ce426e4eada886246f4b8bfe0d';
// // Specify the correct user_id/app_id pairings
// // Since you're making inferences outside your app's scope
// const USER_ID = 'clarifai';       
// const APP_ID = 'main';
// // Change these to whatever model and image URL you want to use
// const MODEL_ID = 'face-detection';
// const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';    
// const IMAGE_URL = 'https://samples.clarifai.com/metro-north.jpg';

const app = new Clarifai.App({
  apiKey: `${PAT}`
});


class App extends Component {
  constructor () {
    super();
    this.state = {
      input: '',
      image_url: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        email: '',
        name: '',
        username: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUserData = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      username: data.username,
      entries: data.entries,
      joined: data.joined
    }})
  }

  // componentDidMount () {
  //   fetch('http://localhost:3001')
  //       .then(response => response.json())
  //       .then(console.log)
  // }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height)
    return {
      leftCol : clarifaiFace.left_col * width,
      topRow : clarifaiFace.top_row * height,
      rightCol : width - (clarifaiFace.right_col * width),
      bottomRow : height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceDetectBox = (box) => {
    this.setState({box: box})
  }

  onInputChange = (e) => {
    this.setState({input: e.target.value})
  }

  onButtonSubmit = () => {
    this.setState({image_url: this.state.input})
    // In this section, we set the user authentication, user and app ID, model details, and the URL
    // of the image we want as an input.

    //  fetch('http://localhost:3000/image_url', {
    //   method: 'post',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     input: this.state.input
    //    })
    //  })
    //   .then(response => response.json())
    //   .then(response => {
    //     if (response) {
    //       fetch('http://localhost:3001/image', {
    //         method: 'put',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({
    //           id: this.state.user.id
    //         })
    //       })
    //         .then(response => response.json())
    //         .then(count => {
    //           this.setState(Object.assign(this.state.user, { entries: count }))
    //         })
    //         .catch(console.log)
    //     }
    //     this.displayFaceBox(this.calculateFaceLocation(response))
    //   })
    //   .catch(err => console.log(err));
  
    
    // const raw = JSON.stringify({
    //     "user_app_id": {
    //         "user_id": USER_ID,
    //         "app_id": APP_ID
    //     },
    //     "inputs": [
    //         {
    //             "data": {
    //                 "image": {
    //                     "url": `${IMAGE_URL}`
    //                 }
    //             }
    //         }
    //     ]
    // });

    // const requestOptions = {
    //     method: 'POST',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Authorization': 'Key' + PAT
    //     },
    //     body: raw
    // };
    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id

    // app.models.predict(`https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`, requestOptions)
    //     .then(response => response.text())
    //     .then(result => {
    //       if (result) {
    //         fetch('http://localhost:3001/image', {
    //           method: 'put',
    //           headers: {'Content-Type': 'application/json'},
    //           body: JSON.stringify({
    //               id: this.state.user.id
    //         })
    //       })
    //         .then(response => response.json())
    //         .then(count => {
    //           this.setState(Object.assign(this.state.user, {entries: count}))
    //         })

    //       const parsed = JSON.parse(result);
    //       this.displayFaceDetectBox(this.calculateFaceLocation(parsed))
    //     }
    //   })
    //     .catch(error => console.log('error', error));

    app.models
      .predict(
        {
          id: 'face-detection',
          name: 'face-detection',
          version: '6dc7e46bc9124c5c8824be4822abe105',
          type: 'visual-detector',
        }, this.state.input)
      .then(response => {
        console.log('hi', response)
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })

        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
    
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
    this.setState({isSignedIn: true})
    } 
    this.setState({route: route});
  }

  render () {
    const { isSignedIn, image_url, route, box } = this.state;

    return (
      <div className="App">
        <ParticlesBg type="cobweb" bg={true} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
          ? <div>
              <Logo />
              <Rank username={this.state.user.name} entries={this.state.user.entries} />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
              <FaceDetection IMAGE_URL={image_url} box={box}  />
            </div>
            
          : (
            this.state.route === 'signin'
            ? <Signin loadUserData={this.loadUserData} onRouteChange={this.onRouteChange} />
            : <Register loadUserData={this.loadUserData} onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
  }
  
}

export default App;
