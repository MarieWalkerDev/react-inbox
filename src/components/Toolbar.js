import React, { Component } from 'react';

class Toolbar extends Component {

  checkThem = () => {
    console.log('checkit from toolbar: ', this.value);
  }

  readMe = (e, checkit) => {
    this.props.markRead(checkit);
  }

  render () {

    let checkit = 'square-o';
    let disableMe = 'disabled';

    let isSelected = this.props.messages.filter(message => message.selected);

    if (isSelected.length === this.props.messages.length) {
      checkit = 'check-square-o';
      disableMe = '';
    } else if (isSelected[0]) {
      checkit = 'minus-square-o';
      disableMe = '';
    };

    const unreadTotal = this.props.messages.reduce( (acc, message) => {
      return !message.read ? acc += 1 : acc;
    }, 0);

    let unreadText = 'all messages read';

    if (unreadTotal > 1) {
      unreadText = 'unread messages';
    } else if (unreadTotal === 1) {
      unreadText = 'unread message';
    }

    return (
      <div className='container'>
        <div className="row toolbar">
          <div className="col-md-12">
            <p className="pull-right">
              <span className="badge badge">{unreadTotal}</span>
              {unreadText}
            </p>

            <button className="btn btn-default" onClick={this.props.checkThemAll}>
              <i className={`fa fa-${checkit}`}></i>
            </button>

            <button className="btn btn-default" disabled={`${disableMe}`} onClick={this.props.markRead}>
              Mark As Read
            </button>

            <button className="btn btn-default" disabled={`${disableMe}`} onClick={this.props.markUnread}>
              Mark As Unread
            </button>

            <select className="form-control label-select" disabled={`${disableMe}`} onChange={e => {this.props.labelMe(e)}}>
              <option>Apply label</option>
              <option value="dev">dev</option>
                <option value="personal">personal</option>
              <option value="gschool">gschool</option>
            </select>

            <select className="form-control label-select" disabled={`${disableMe}`} onChange={e => this.props.unlabelMe(e)}>
              <option>Remove label</option>
              <option value="dev">dev</option>
              <option value="personal">personal</option>
              <option value="gschool">gschool</option>
            </select>

            <button className="btn btn-default" disabled={`${disableMe}`} onClick={this.props.deleteMe}>
              <i className="fa fa-trash-o"></i>
            </button>
          </div>
        </div>
      </div>
    );
  };
};

export default Toolbar;
