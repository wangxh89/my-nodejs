class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            link: 'https://www.taobao.com',
        };
        this.getLink = this.getLink.bind(this);
        this.editLink = this.editLink.bind(this);
    }

    getLink() {
        alert(this.state.link);
    }

    editLink() {
        this.setState({
            link: 'https://www.tmall.com',
        });
    }

    render() {
        return (
            <div>
                <a href={this.state.link}>跳转链接</a>
                <button onClick={this.getLink}>获取链接</button>
                <button onClick={this.editLink}>修改链接</button>
            </div>
        );
    }

}

ReactDOM.render(
  <Demo  />,
  document.getElementById('person-list')
);
