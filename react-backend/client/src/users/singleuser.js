import React from 'react';

class SingleUser extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      editing: false,
      newName: props.user.username
    }
  }

  switchMode = () => {
    const lastMode = this.state.editing

    this.setState({
      editing: !lastMode
    })
  }

  handleChange = (e) => {
    this.setState({
      newName: e.target.value
    });
  }

  submitForm = (e) => {
    e.preventDefault;
    fetch(`/users/${this.props.user.username}/edit`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: this.props.user.username,
                             newName: this.state.newName })
    })
    .then(() => {
      this.props.history.push(`/users/${this.state.newName}/edit`);
    })
  }

  render() {
    let { editing, newName, forGoodName } = this.state;

    if (!editing) {
      return (
        <div>
          <h3> { this.props.user.username } </h3>
          <button onClick={ this.switchMode }> Edit </button>
        </div>
      );
    } else {
      return (
        <div>
          <form onSubmit={ this.submitForm }>
            <label>
              New Username:
              <input value={ newName } type="text" name="username" onChange={ this.handleChange } />
            </label>

            <input type="submit" value="Submit" />
          </form>

          <button onClick={ this.switchMode }> Cancel </button>
        </div>
      )
    }
  }
}

export default SingleUser;
