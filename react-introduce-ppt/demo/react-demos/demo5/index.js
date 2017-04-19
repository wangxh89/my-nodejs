// 子组件
class ToggleButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.initialChecked
        };
    }

  onTextChange() {
    var newState = !this.state.checked;
    this.setState({
      checked: newState
    });
    // 这里要注意：setState 是一个异步方法，所以需要操作缓存的当前值
    this.props.callbackParent(newState);
  }

  render() {
    // 从【父组件】获取的值
    var text = this.props.text;
    // 组件自身的状态数据
    var checked = this.state.checked;

    return (
        <label>{text}: <input type="checkbox" checked={checked} onChange={this.onTextChange.bind(this)} /></label>
    );
  }
}

// 父组件
class MyContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false
        };
    }

  onChildChanged(newState) {
    this.setState({
      checked: newState
    });
  }


  render() {
    var isChecked = this.state.checked ? 'yes' : 'no';
    return (
      <div>
        <div>Are you checked: {isChecked}</div>
        <ToggleButton text="Toggle me"
          initialChecked={this.state.checked}
          callbackParent={this.onChildChanged.bind(this)}
          />
      </div>
    );
  }
}




ReactDOM.render(
  <MyContainer  />,
  document.getElementById('person-list')
);
