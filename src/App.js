import React, { Component } from 'react';
import Toolbar from './components/Toolbar';
import Messages from './components/Messages';

class App extends Component {
  state = {
    messages: [],
    allbox: 'square-o',
  };

  componentDidMount = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}`);
    const messagesFromJson = await res.json();
    this.setState({
      messages: messagesFromJson.map( message => {
        if (message.selected) {
          return {
            ...message,
          }
        } else {
          return {
            ...message,
            selected: false,
          }
        }
      })
    });
  };

  checkThemAll = () => {
    if (this.state.allbox === 'square-o') {
      this.setState({ allbox: 'check-square-o' });
    } else if (this.state.allbox === 'check-square-o') {
      this.setState({ allbox: 'square-o' });
    };

    this.setState( prevState => {
      return {
        messages: prevState.messages.map( message => {
          if (this.state.allbox === 'square-o') {
            return {
              ...message,
              selected: true,
            }
          } else {
            return {
              ...message,
              selected: false,
            }
          }
        })
      }
    })
  }

  handleIndividualboxchange = () => {
    // console.log('im in handleIndividualboxchange');

    // let selectedCount = 0;
    //
    // for (let i = 0; i < this.state.messages.length; i++) {
    //   if (this.state.messages[i].selected === true) {
    //     selectedCount++;
    //   }
    // }
    //
    // console.log('selectedCount: ', selectedCount);
    //
    //
    // if (selectedCount === this.state.messages.length) {
    //   console.log('this should be SQUARE-O');
    // } else if (selectedCount > 0) {
    //   console.log('this should be MINUS-SQUARE-O');
    // } else {
    //   console.log('this should be CHECK-SQUARE-O');
    // }
  }

  handleCheckBox = (e) => {
    const id = Number(e.target.value);

    this.setState( prevState => {
      return {
        messages: prevState.messages.map( message => {
          let selection = !message.selected;
          if(message.id === id) {
            return {
              ...message,
              selected: selection,
            }
          } else {
            return {...message}
          }
        })

      }
    })
  }

  handleStarred = (e, messageId) => {
    this.setState( prevState => {
      return {
        messages: prevState.messages.map( message => {
          let starMe = !message.starred;

          if (message.id === messageId) {
            return {
              ...message,
              starred: starMe,
            }
          } else {
            return {...message}
          }
        })
      }
    })
  }

  markRead = () => {
    this.setState( prevState => {
      return {
        messages: prevState.messages.map( message => {

          if (message.selected === true) {
            return {
              ...message,
              read: true,
            }
          } else {
            return {...message}
          }
        })
      }
    })
  }

  markUnread = () => {
    this.setState( prevState => {
      return {
        messages: prevState.messages.map( message => {

          if (message.selected === true) {
            return {
              ...message,
              read: false,
            }
          } else {
            return {...message}
          }
        })
      }
    })
  }

  labelMe = (e) => {
    let addLabel = e.target.value;

    this.setState( prevState => {
      return {
        messages: prevState.messages.map( message => {

          if(message.selected === true) {
            if (message.labels.includes(addLabel)) {
              return {...message}
            } else {
              return {
                ...message,
                labels: message.labels.concat(addLabel),
              }
            }
          } else {
            return {...message}
          }

        })
      }
    })
  }

  unlabelMe = (e) => {
    let removeLabel = e.target.value;
    this.setState( prevState => {
      return {
        messages: prevState.messages.map( message => {
          if(message.selected === true) {
            let removed = message.labels.filter( item => {
              return item !== removeLabel;
            })

            return {
              ...message,
              labels: removed,
            }
          } else {
            return {...message}
          }

        })
      }
    })
  }

  deleteMe = () => {
    this.setState( prevState => {
      return {
        messages: prevState.messages.filter( message => message.selected !== true),
      }
    })
  };


  render () {
    return (
      <div>
        <Toolbar
          messages={ this.state.messages }
          checkBox={ this.state.checkBox }
          markRead={this.markRead}
          markUnread={this.markUnread}
          labelMe={this.labelMe}
          unlabelMe={this.unlabelMe}
          deleteMe={this.deleteMe}
          checkThemAll={this.checkThemAll}
          allbox={this.state.allbox}
        />

      <Messages
        messages={ this.state.messages }
        handleCheckBox={this.handleCheckBox}
        handleStarred={this.handleStarred}
        allbox={this.state.allbox}
        handleIndividualboxchange={this.handleIndividualboxchange}
      />
      </div>
    );
  };
};

export default App;
