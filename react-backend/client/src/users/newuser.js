import React from 'react';

class NewUser extends React.Component {
  state = { username: "" };

  handleChange = (e) => {
    this.setState({
      username: e.target.value
    });
  }

  submitForm = (e) => {
    e.preventDefault();
    fetch('/users/new', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: this.state.username })
    })
  }

  render() {
    return(
      <div>
        <form onSubmit={this.submitForm}>
          <label>
            Username:
            <input type="text" name="username" onChange={this.handleChange} />
          </label>

          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default NewUser;
