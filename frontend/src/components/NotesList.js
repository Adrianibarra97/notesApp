import React, { Component } from 'react';
import axios from 'axios';
import {format} from 'timeago.js';
import { DatePicker } from '@material-ui/pickers';
import '../css/EditNote.css';

export default class NotesList extends Component {
  state = {
    notes: [],
    users: [],
    userSelected: '',
    title: '',
    content: '',
    date: new Date(),
    idEditNote: '',
    showStore: ''
  }

  async getNotes() {
    const res = await axios.get('http://127.0.0.1:4000/api/notes');
    this.setState({notes: res.data});
  }

  async componentDidMount() {
    this.getNotes();
  }

  deleteNote = async (id) => {
    await axios.delete('http://127.0.0.1:4000/api/notes/' + id);
    this.getNotes();
  }

  editNote = async (id) => {
    const res = await axios.get('http://127.0.0.1:4000/api/notes/' + id);
    const res2 = await axios.get('http://127.0.0.1:4000/api/users');
    this.setState({
      users: res2.data.map(user => user.username),
      title: res.data.title,
      content: res.data.content,
      userSelected: res.data.author,
      date: res.data.date,
      idEditNote: res.data._id,
      showStore: 'block'
    });
  }

  // Edit Notes:
  onSubmit = async (e) => {
    e.preventDefault();
    const editNote = {
      title: this.state.title,
      content: this.state.content,
      author: this.state.userSelected, 
      date: this.state.date
    }
    await axios.put('http://127.0.0.1:4000/api/notes/' + this.state.idEditNote, editNote);
    this.setState({showStore: 'none'});
    this.getNotes();
  }

  onInputChange = e => {
    this.setState({[e.target.name]: e.target.value});
  }

  onChangeDate = date => {
    this.setState({date});
  }
  
  render() {
    return (
      <div className="row">
        { 
          this.state.notes.map(note => 
            <div className="col-md-4 p-2" key={note._id}>
              <div className="card">
                
                <div className="card-header d-flex justify-content-between">
                  <h5>{note.title}</h5>
                  <button className="btn btn-secondary" onClick={() => this.editNote(note._id)}>
                    Edit
                  </button>
                </div>
                
                <div className="card-body">
                  <label>User:</label>
                  <p>{note.author}</p>
                  
                  <label>Content:</label>
                  <p>{note.content}</p>

                  <label>Realizar en fecha:</label>
                  <p>{format(note.date)}</p>
                </div>

                <div className="card-footer">
                  <button className="btn btn-danger" onClick={() => this.deleteNote(note._id)}>
                    Delete
                  </button>
                </div>   
              </div>
            </div>
          )
        }

        <div  className="edit-note-container"
              style={{
                display: this.state.showStore }
              }>

          <div className="col-md-6 offset-md-3 edit-note-form">
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
                  onChange={this.onChangeDate}
                  value={this.state.date}
                  required
                  />
              </div>

              <form onSubmit={this.onSubmit}>
                <button type="submit" className="btn btn-dark">
                  Save Change
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>
    );
  }
}