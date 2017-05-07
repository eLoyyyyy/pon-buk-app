import React, { Component } from 'react';

class ContactSearch extends Component {
  constructor(props) {
    super(props);

    this.route = this.props.route;
    this.params = this.props.params;
    // ${this.route.name}: ${this.params.id}
  }

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
          <a className="field-group-back" href="/contact">
            <i className="fa fa-arrow-left fa-fw"></i>
          </a>
          <input type="text" className="field-control" ref={(input) => { _input = input; }} onChange={() => onChange(_input.value)} />
          <span className="field-group-erase" href="/">
              <i className="fa fa-times" aria-hidden="true" onClick={this.clearInput}></i>
          </span>
        </div>
        { (fetching) ? (
            <div className="loading text-center">
              <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
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

export default ContactSearch;
