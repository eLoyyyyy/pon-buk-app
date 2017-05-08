import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

class ContactSearch extends Component {

  componentDidMount() {
    this.forceUpdate();
  }

  render() {
    let _input;
    const { suggestions = [], fetching = false, onChange = f => f } = this.props;

    console.log( fetching );
    return (
      <div>
        <div className="field-group">
          <a className="field-group-back" onClick={browserHistory.push('/contact')}>
            <i className="fa fa-arrow-left fa-fw">&nbsp;</i>
          </a>
          <input type="text" className="field-control" ref={(input) => { _input = input; }} onChange={() => onChange(_input.value)} />
          <span className="field-group-erase" href="/">
            <i className="fa fa-times" aria-hidden="true" onClick={this.clearInput}>&nbsp;</i>
          </span>
        </div>
        { (fetching) ? (
          <div className="loading text-center">
            <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw">&nbsp;</i>
          </div>
          ) : (
            <ul className="list-group">
              { suggestions.map((item, i) =>
                <li className="list-group-item" key={i}><a href={`/contact/${item.cn_id}`}>{item.name}</a></li>
              )}
            </ul>
          )
        }
      </div>

    );
  }
}

ContactSearch.PropTypes = {
  suggestions: PropTypes.arrayOf(PropTypes.shape({
    cn_id: PropTypes.string,
    name: PropTypes.string,
    contact_number: PropTypes.string
  })),
  fetching: PropTypes.bool,
  onChange: PropTypes.func
};

export default ContactSearch;
