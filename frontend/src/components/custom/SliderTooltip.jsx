import React, { Fragment } from 'react';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

const sliderHandle = props => {
  const { value, dragging, index, offset, ...restProps } = props;
  const positionStyle = {
    position: 'absolute !important',
    left: `${offset}%`,
    top: '1rem'
  };
  return (
    <Fragment key={index}>
      <div className="rc-slider-tooltip" style={positionStyle}>
        {'N ' + value}
      </div>
      <Slider.Handle offset={offset} value={value} {...restProps} />
    </Fragment>
  );
};

export class SliderTooltip extends React.Component {
  render() {
    return (
      <Slider handle={this.props.handle || sliderHandle} {...this.props} />
    );
  }
}

export class RangeTooltip extends React.Component {
  render() {
    return <Range handle={this.props.handle || sliderHandle} {...this.props} />;
  }
}
