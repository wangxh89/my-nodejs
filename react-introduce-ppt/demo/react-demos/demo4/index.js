class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
        };
        this.changeShow = this.changeShow.bind(this);
    }

    changeShow() {
        this.setState({
            show: !this.state.show,
        });
    }

    render() {
        return (
            <div>
                <a
                    href="//www.taobao.com"
                    className={classNames({
                        'fn-show': this.state.show,
                        'fn-hide': !this.state.show,
                    })}
                >
                    跳转链接
                </a>
                <button onClick={this.changeShow}>改变现实状态</button>
            </div>
        );
    }

}

ReactDOM.render(
  <Demo  />,
  document.getElementById('person-list')
);
