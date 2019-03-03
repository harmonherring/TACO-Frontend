import React, {Component} from 'react';
import gif from './assets/loading.gif';
import './css/loading.css';

class Loading extends Component {
  constructor(props) {
    super(props);

    this.state = {
      didMount:false,
    }
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({didMount:true})
    }, 200);
  }

  render() {
    return(
      <div className="overlay">
        <img src={gif} className={this.state.didMount ? "fade-in visible" : "fade-in"} />
      </div>
    );
  }
}

export default Loading;
