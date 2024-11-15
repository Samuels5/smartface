import React from "react";
//onRouteChange
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emal: "",
      password: "",
      name: "",
    };
  }
  // baseurl = "http://localhost:3000"
  baseurl = "https://smartfacebackend.onrender.com";
  onnamechange = (event) => {
    this.setState({ name: event.target.value });
  };
  onemailchange = (event) => {
    this.setState({ emal: event.target.value });
  };
  onpasswordchange = (event) => {
    this.setState({ password: event.target.value });
  };

  onsubmitsignin = () => {
    // console.log(this.state);
    fetch(this.baseurl + "/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.emal,
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
      .catch(console.log("fetching problem"));
  };

  render() {
    // const { onRouteChange } = this.props;
    return (
      <article className="br3  b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure ">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">
                  Name
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="email-address"
                  id="name"
                  onChange={this.onnamechange}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onemailchange}
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
                value="Register"
              />
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Register;
