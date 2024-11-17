import React from "react";
//onRouteChange
class Update extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    //   email: "",
      password: "",
      name: "",
    };
  }
//   baseurl = "http://localhost:3000"
  baseurl = "https://smartfacebackend.onrender.com";
  onnamechange = (event) => {
    this.setState({ name: event.target.value });
  };
//   onemailchange = (event) => {
//     this.setState({ emal: event.target.value });
//   };
  onpasswordchange = (event) => {
    this.setState({ password: event.target.value });
  };

  onsubmitsignin = () => {
    // console.log(this.state);
    fetch(this.baseurl + "/update", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.props.email,
        password: this.state.password,
        name: this.state.name,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        // console.log(user);
        if (user) {
          this.props.loaduser(user);
          this.props.onRouteChange("home");
        }
      })
      .catch((err)=>console.log("Fetching"))
      .finally(()=>{alert('updated successfully')});
  };

  render() {
    const { name, onRouteChange } = this.props;
    return (
      <article className="br3  b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure ">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Update</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">
                  Name
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  placeholder={name}
                  id="name"
                  onChange={this.onnamechange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onpasswordchange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onsubmitsignin}
                className="ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Update"
              />
            </div>
            <div className="lh-copy mt3">
              <p
                onClick={() => onRouteChange("home")}
                href="#0"
                className="f6 link dim black db pointer"
              >
                Home
              </p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Update;
