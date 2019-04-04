import React from 'react';

class Jdenticon extends React.Component {
  el = null;
  componentDidUpdate() {
    window.jdenticon.update(this.el);
  }

  componentDidMount() {
    window.jdenticon.update(this.el);
  }

  render () {
    const { hash, size } = this.props;
    return (
      <svg
        {...this.props}
        style={{ verticalAlign: 'middle' }}
        ref={el => this.handleRef(el)}
        width={size}
        height={size}
        data-jdenticon-value={hash}
      />
    );
  }

  handleRef (el: any) {
    this.el = el;
  }
}

export default Jdenticon;
