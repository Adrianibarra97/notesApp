import React, { Component } from 'react';
// API que nos permite hacer peticiones al backend.
import axios from 'axios';

export default class CreateUser extends Component {
  state = {
    users: [],
    username: ''
  }

  //Nos permite ejecutar codigo una vez que el componente fue montado.
  async componentDidMount() {
    this.getUsers();
    console.log(this.state.users);
  }

  getUsers = async () => {
    const res = await axios.get('http://127.0.0.1:4000/api/users');
    this.setState({ users: res.data });
  }

  onChangeUserName = (e) => {
    this.setState({
      username: e.target.value
    });
  }

  onSubmit = async e => {
    e.preventDefault();
    await axios.post('http://127.0.0.1:4000/api/users', {
      username: this.state.username
    });
    this.setState({username: ''});
    this.getUsers();
  }

  deleteUser = async (id) => {
    await axios.delete('http://127.0.0.1:4000/api/users/' + id);
    this.getUsers();
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <div className="card card-body">
            <h3>Create New User</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input  type="text"
                        className="form-control"
                        value={this.state.username}
                        onChange={this.onChangeUserName} />
              </div>
              <button type="submit" className="btn btn-secondary mt-2">
                Save
              </button>
            </form>
          </div>
        </div>

        <div className="col-md-8">
          <ul className="list-group">
            {
              this.state.users.map(user =>
                <li 
                  className="list-group-item list-group-item-action"
                  key={user._id}
                  onDoubleClick={() => this.deleteUser(user._id)}
                  >
                  {user.username}
                </li>)
            }
          </ul>
        </div>
      </div>
    );
  }
}
