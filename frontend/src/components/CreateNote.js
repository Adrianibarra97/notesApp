import React, { Component } from 'react';
import axios from 'axios';
import { DatePicker } from '@material-ui/pickers';

 
export default class CreateNote extends Component {

  state = {
    users: [],
    userSelected: '',
    title: '',
    content: '',
    date: new Date()
  }

  async componentDidMount() {
    const res = await axios.get('http://127.0.0.1:4000/api/users');
    this.setState({
      users: res.data.map(user => user.username),
      userSelected: res.data[0].username
    });
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const newNote = {
      title: this.state.title,
      content: this.state.content,
      author: this.state.userSelected, 
      date: this.state.date 
    }
    await axios.post('http://127.0.0.1:4000/api/notes', newNote);
    window.location.href = '/';
  }

  onInputChange = e => {
    this.setState({[e.target.name]: e.target.value});
  }

  onChangeDate = date => {
    this.setState({date});
  }

  render() {
    return (
      <div className="col-md-6 offset-md-3">
        <div className="card card-body">

          <h4>Create a Note</h4>

          {/* SELECT USER */}
          <div className="form-group mb-2">
            <select
              className="form-control"
              name="userSelected"
              onChange={this.onInputChange}
              value={this.state.userSelected}
              > 
              {
                this.state.users.map(user => 
                  <option key={user} value={user}>
                    {user}
                  </option>
                )
              }
            </select>
          </div>
          
          <div className="form-group mb-2">
            <input 
              type="text"
              className="form-control"
              placeholder="title"
              name="title"
              onChange={this.onInputChange}
              value={this.state.title}
              required
              />
          </div>

          <div className="form-group mb-2">
            <textarea 
              name="content"
              className="form-control"
              placeholder="content"
              onChange={this.onInputChange}
              value={this.state.content}
              required
              >
              </textarea>
          </div>

          <div className="forn-group mb-2">
              <label>Realizar el dia:</label>
              <DatePicker
                className="form-control"
                value={this.state.date}
                onChange={this.onChangeDate}
                required
              />
          </div>

          <form onSubmit={this.onSubmit}>
            <button type="submit" className="btn btn-dark">
              Save a Note
            </button>
          </form>

        </div>
      </div>
    );
  }
}