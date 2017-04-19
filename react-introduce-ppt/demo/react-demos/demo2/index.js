class Demo extends React.Component {
    constructor(props){
      super(props);
        this.state = {
            list: [1, 2, 3],
        }
        this.addItemFromBottom = this.addItemFromBottom.bind(this);
        this.addItemFromTop = this.addItemFromTop.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    addItemFromBottom() {
        this.setState({
            list: this.state.list.concat([4]),
        });
    }

    addItemFromTop() {
        this.setState({
            list: [0].concat(this.state.list),
        });
    }

    deleteItem() {
        const newList = [...this.state.list];
        newList.pop();
        this.setState({
            list: newList,
        });
    }

    render() {
        return (
            <div>
                {this.state.list.map((item) => <div>{item}</div>)}
                <button onClick={this.addItemFromBottom}>尾部插入 Dom 元素</button>
                <button onClick={this.addItemFromTop}>头部插入 Dom 元素</button>
                <button onClick={this.deleteItem}>删除 Dom 元素</button>
            </div>
        );
    }
}

ReactDOM.render(
  <Demo  />,
  document.getElementById('person-list')
);
