import "./App.css";
import Navigation from "./components/Navigation";
import Logo from "./components/Logo";
import Imagelink from "./components/Imagelink";
import Rank from "./components/Rank";
import Sign from "./components/Sign";
import Register from "./components/Register";
import FaceRecognition from "./components/FaceRecognition";
import React, { Component } from "react";

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imgurl: "",
      box: {},
      route: "signin",
      issign: false,
    };
  }
  responsible = (data) => {
    const myobject = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    return {
      top: height * myobject.top_row,
      left: width * myobject.left_col,
      right: width - width * myobject.right_col,
      bottom: height - height * myobject.bottom_row,
    };
  };
  setbot = (res) => {
    this.setState({ box: res });
  };

  oninputchange = (event) => {
    this.setState({ input: event.target.value });
  };
  onbuttonsubmit = () => {
    this.setState({ imgurl: this.state.input });

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // In this section, we set the user authentication, user and app ID, model details, and the URL
    // of the image we want as an input. Change these strings to run your own example.
    //////////////////////////////////////////////////////////////////////////////////////////////////

    // Your PAT (Personal Access Token) can be found in the Account's Security section
    // const PAT = "8c694cbc06244d128411b68082b403e3";
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = "clarifai";
    const APP_ID = "main";
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = "face-detection";
    const MODEL_VERSION_ID = "6dc7e46bc9124c5c8824be4822abe105";
    const IMAGE_URL = this.state.input;
    // To use image bytes, assign its variable
    // const IMAGE_BYTES_STRING = '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAoACgDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAYDBQcE/8QAMBAAAQMDAwMDAgQHAAAAAAAAAQIDBAAFEQYSIQcTMTJBURRhCBYikSNScXKhsdH/xAAZAQACAwEAAAAAAAAAAAAAAAAFBgIDBAf/xAAtEQABAwMBBgQHAQAAAAAAAAABAgMRAAQhMQUSE0FRYQaBocEUFiJCcrHR8P/aAAwDAQACEQMRAD8A3+RYY1unSYzCS0ttZUkAgktn0q5yT7jPyDUC4wdGwycH5U2Kt9ZQ7VI1qw5PkvQy3CSVPpf7aQjuKyFH25xzn3pHn3TVNy01Hl2hyy6YdkSpKsS9sl/6RlI3rRu3dxWd6spwnAGPIJTfl925fcLaoSDHXvyo6i9SlCQrU9wKln3OyWiaDN1RAbW3kKbSd7gPtwMkH/tTWy9afuy1iPfnXMAblITwkE4yf08cn3pSbYt1uts24XH6fUbiLAuY1MWyGkLEmUW0rcCRvUpQ5CtwKQCPgi4S1ZbDe4sd9NntDEe79m3uOBLTr0IR9jzodSMqUpTu9JJ8owD7UTT4ZCfv9PbP7860m+s+HBSrejWRuz2kAxoesGYxTW/Zlpkwo1vkuSly3UgKWQUhHJUvIHsAaKTemF8XE6sWmxyZkiaZrMh1jv8ArQNpUVqB8FW0njHqx4zRVVhsph1KlKk5xQ+7uHmikaSJrQerMByet2IwvtuTLa4xv2k7Rk84H9x/esHv92d01boenLXGcuiWrFIhLlpbcaQ2/JdK3VJCkAq2pAR7Zz7YxWudY9fxNIdQbNGkR5TyX4aisNNpUMFZAzkj4NK0jq9ZpbLr0PSlzkhrlZDaQlP3P8Q4/ap3F87bPucJEkx/hHv60b2TYXLrKN5sramYECSQRk9M6c6zmJ+eb5Hi22M7cnWGIQgFLbX0zSo4PDa1YBcTgDyMjJ/qbGPabH08SJt1Uzc9QqRliGg5QySPKvgc+TyfYDmmTUWpNYz7ctxoQdPQshCktupckDJUPUcJT6DwMq8YyaQ9VL0pCS8zapcq4SVOBZmPDO8/cnknlWcDBwn4NYnPjLkQ+qE9OtOVlYpeVHDCEkkkJyT+SuQzy5Y0ru6Ez511/Efa5s1fdkOtyVurIxgdlQAA9gOKKPwolU7remU5hCGYEgo38KUv9I/0TRTDYJCWQBSF4rIN/CRgAR0iTpVD1j1g/qDqJcJqlKcjB9bcda142MpOEJAzgeMnjyTSyze5KEuNRpDoDvC0oe4X9iAeaKKFK+oya6fbOqYbDTeEiAPKpHdS3gBLYc7RQkp3ApQog+cq8nwPJrljzxnPZbUfnugn/NFFRgEVch9xKsH0H8pg6e3x3T3UC1ajaZITGkJLoS4MKbOUrzz/ACKVRRRVzVwtoQmhG1NkWu0HuI+JI8u/Kv/Z';

    ///////////////////////////////////////////////////////////////////////////////////
    // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
    ///////////////////////////////////////////////////////////////////////////////////

    // const raw = JSON.stringify({
    //   user_app_id: {
    //     user_id: USER_ID,
    //     app_id: APP_ID,
    //   },
    //   inputs: [
    //     {
    //       data: {
    //         image: {
    //           url: IMAGE_URL,
    //           // "base64": IMAGE_BYTES_STRING
    //         },
    //       },
    //     },
    //   ],
    // });

    // const requestOptions = {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     Authorization: "Key " + PAT,
    //   },
    //   body: raw,
    // };

    fetch("https://smartfacebackend-4.onrender.com/api/analyze", {
      method: "POST",
      // mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        modelId: MODEL_ID,
        modelVersionId: MODEL_VERSION_ID,
        user_app_id: {
          user_id: USER_ID, // Replace with your actual user ID
          app_id: APP_ID, // Replace with your actual app ID
        },
        inputs: [
          {
            data: {
              image: {
                url: IMAGE_URL,
              },
            },
          },
        ],
      }),
    })
      .then((response) => {
        if (!response.ok) {
          console.error("Error in response:", response);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        console.log("API Response:", result); // Log the full response
        this.setbot(this.responsible(result)); // Handle the result here
      })
      .catch((error) => {
        console.error("Error:", error);
        // Additional handling if needed
      });
  };
  onRouteChange = (to) => {
    if (to === "signin" || to === "register") {
      this.setState({ issign: false });
    } else {
      this.setState({ issign: true });
    }
    this.setState({ route: to });
  };

  render() {
    return (
      <div className="App">
        <Navigation
          issign={this.state.issign}
          onRouteChange={this.onRouteChange}
        />
        {this.state.route === "home" ? (
          <div>
            <Logo />
            <Rank />
            <Imagelink
              oninputchange={this.oninputchange}
              onbuttonsubmit={this.onbuttonsubmit}
            />
            <FaceRecognition box={this.state.box} imgurl={this.state.imgurl} />
          </div>
        ) : this.state.route === "signin" ? (
          <Sign onRouteChange={this.onRouteChange} />
        ) : (
          <Register onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;