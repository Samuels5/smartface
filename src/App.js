import "./App.css";
import Navigation from "./components/Navigation";
import Logo from "./components/Logo";
import ParticlesBg from "particles-bg"
import Imagelink from "./components/Imagelink";
import Rank from "./components/Rank";
import Sign from "./components/Sign";
import Register from "./components/Register";
import FaceRecognition from "./components/FaceRecognition";
import React, { Component } from "react";
import Update from "./components/Update";

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imgurl: "",
      box: [],
      route: "signin",
      issign: false,
      user: {
        id: "",
        name: "",
        email: "",
        // password: "",
        entries: 0,
        joined: "",
      },
    };
  }
  // https://smartface.vercel.app/
  // https://news.mit.edu/sites/default/files/styles/news_article__image_gallery/public/images/201011/20101123135945-2.jpg?itok=WnYUK8RR
  // baseurl = "http://localhost:3000";
  baseurl = "https://smartfacebackend.onrender.com";
  loaduser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        // password: data.password,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  responsible = (data) => {
    const newarr = [];
    // const myobject = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    data.outputs[0].data.regions.forEach((val) => {
      newarr.push({
        top: height * val.region_info.bounding_box.top_row,
        left: width * val.region_info.bounding_box.left_col,
        right: width - width * val.region_info.bounding_box.right_col,
        bottom: height - height * val.region_info.bounding_box.bottom_row,
      });
    });
    return newarr;
  };
  setbot = (res) => {
    this.setState({ box: res });
  };

  oninputchange = (event) => {
    this.setState({ input: event.target.value });
  };
  deleting = () => {
    fetch(this.baseurl + "/delete", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.user.email,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return false;
        } else {
          return true;
        }
      })
      .finally(() => true)
      .catch((err) => console.log(err));
  };
  onbuttonsubmit = () => {
    this.setState({ imgurl: this.state.input });

    const IMAGE_URL = this.state.input;

    // http://localhost:5000https://smartfacebackend-4.onrender.com

    fetch(this.baseurl + "/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        IMAGE_URL: IMAGE_URL,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          console.error("Error in response:", response);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        fetch(this.baseurl + "/image", {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: this.state.user.id,
          }),
        })
          .catch(console.log("fetching problem"))
          .then((response) => response.json())
          .then((count) => {
            this.setState(Object.assign(this.state.user, { entries: count }));
          })
          .catch(console.log("connection issue"));
        return response.json();
      })
      .then((result) => {
        console.log("API Response:", result);
        this.setbot(this.responsible(result));
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
        <ParticlesBg type="ball" bg={true} />
        <Navigation
          issign={this.state.issign}
          route={this.state.route}
          deleting={this.deleting}
          onRouteChange={this.onRouteChange}
        />
        {this.state.route === "home" ? (
          <div>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <Imagelink
              oninputchange={this.oninputchange}
              onbuttonsubmit={this.onbuttonsubmit}
            />
            <FaceRecognition
              box={this.state.box ? this.state.box : []}
              imgurl={this.state.imgurl}
            />
          </div>
        ) : this.state.route === "signin" ? (
          <Sign loadUser={this.loaduser} onRouteChange={this.onRouteChange} />
        ) : this.state.route === "update" ? (
          <Update
            name={this.state.user.name}
            email={this.state.user.email}
            loaduser={this.loaduser}
            onRouteChange={this.onRouteChange}
          />
        ) : (
          <Register
            loaduser={this.loaduser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
