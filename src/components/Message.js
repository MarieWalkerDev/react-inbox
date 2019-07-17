import React, { Component } from 'react';

class Message extends Component {

  handleStarredLocal = (e, messageId) => {
    this.props.handleStarred(e, messageId);
  }


  render () {
    const oneMessage = this.props.message;

    let isRead = oneMessage.read ? 'read' : 'unread';

    let isSelected = oneMessage.selected ? 'selected' : '';

    let isStarred = oneMessage.starred ? 'star' : 'star-o';

    let labelKey = 0;

    let theLabels = oneMessage.labels.map( label => {
      labelKey++;
      return label ? <span key={labelKey} className="label label-warning">{label}</span> : null;
    });

    let one = (
      <div className={`row message ${isRead} ${isSelected}`}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">

              <input
                type='checkbox'
                checked={this.props.message.selected}
                name='checkbox'
                value={oneMessage.id}
                onClick={e => {this.props.handleCheckBox(e)}}
                onChange={this.props.handleIndividualboxchange}
              />

            </div>
            <div className="col-xs-2">

              <i
                className={`star fa fa-${isStarred}`}
                onClick={e => {this.handleStarredLocal(e, oneMessage.id)}}
              ></i>

            </div>
          </div>
        </div>
        <div className="col-xs-11">

          {theLabels}


          <a href="/">
            {oneMessage.subject}
          </a>

        </div>
      </div>
    );

    return (
      <div className='container'>
        {one}
      </div>

    );
  };
};

export default Message;
