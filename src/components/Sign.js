import React from 'react';

class Sign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signinemal: "",
      signinpassword: "",
    };
  }
  // baseurl = "http://localhost:3000";
  // baseurl = "https://smartface-server-with-mangodb.onrender.com";
  baseurl = "https://smartfacebackend.onrender.com";
  onemailchange = (event) => {
    this.setState({ signinemal: event.target.value });
  };
  onpasswordchange = (event) => {
    this.setState({ signinpassword: event.target.value });
  };
  onsubmitsignin = () => {
    // console.log(this.state);
    fetch(this.baseurl + "/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.signinemal,
        password: this.state.signinpassword,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert(
            "Wrong email or password please try again or register as a new user"
          );
          return false;
        }
      })
      .then((user) => {
        // console.log(user)
        if (user) {
          this.props.loadUser(user);
          this.props.onRouteChange("home");
        }
      })
      .catch(console.log("fetching problem"));
  };

  render() {
    const { onRouteChange } = this.props;
    return (
      <article className="br3  b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure ">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
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
                value="Signin"
              />
            </div>
            <div className="lh-copy mt3">
              <p
                onClick={() => onRouteChange("register")}
                href="#0"
                className="f6 link dim black db pointer"
              >
                Register
              </p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Sign;