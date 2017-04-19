
class PersonList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      error: null,
      persons: null,
      person: {name: ""}
    };
  }

  componentDidMount() {
    this.props.promise.then(
      value => this.setState({loading: false, persons: value}),
      error => this.setState({loading: false, error: error}));
  }

  render() {
    if (this.state.loading) {
      return <span>Loading...</span>;
    }
    else if (this.state.error !== null) {
      return <span>Error: {this.state.error.message}</span>;
    }
    else {
        var liList = this.state.persons.map((person, id)=> {
           return <li key={id}> 你好，<b>{person.name}</b>，欢迎来到火星！</li>
        });
        return (
          <div>
            <input ref="userName" type="text" value={this.state.person.name} onChange={this.handleChange.bind(this)}/>
            <button onClick={this.checkIn.bind(this)}>报到</button>
            <ul> {liList} </ul>
          </div>
          );
    }
  }

  handleChange(event) {
    this.setState({person:{name:event.target.value}})
  }

  checkIn() {
    this.state.persons.push(this.state.person);
    this.setState({persons:this.state.persons});
  }
}

ReactDOM.render(
  <PersonList promise={$.getJSON('person.json')} />,
  document.getElementById('person-list')
);
