import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import {
  Carousel,
  CarouselCaption,
  CarouselControl,
  CarouselIndicators,
  CarouselItem,
} from 'reactstrap';
import Entertainers from 'components/common/entertainers/Entertainers';
import Events from 'components/common/events/Events';
import { SLIDESHOW_TYPE } from 'utils/constants';
import Testimonials from './Testimonials';

class Slideshow extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.items = props.items;
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === this.items.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? this.items.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    if (!this.items) {
      return <h3>Nothing to display</h3>;
    }

    const slides = this.items.map((item) => {
      return (
        <CarouselItem
          key={item.id}
          onExited={this.onExited}
          onExiting={this.onExiting}
        >
          {this.props.type === SLIDESHOW_TYPE.image && (
            <Slideshow.Image item={item} />
          )}
          {this.props.type === SLIDESHOW_TYPE.entertainers && (
            <Slideshow.Entertainers item={item} />
          )}
          {this.props.type === SLIDESHOW_TYPE.events && (
            <Slideshow.Events item={item} />
          )}
          {this.props.type === SLIDESHOW_TYPE.testimonials && (
            <Slideshow.Testimonials item={item} />
          )}
        </CarouselItem>
      );
    });

    return (
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
        slide={false}
      >
        <CarouselIndicators
          activeIndex={activeIndex}
          items={this.items}
          onClickHandler={this.goToIndex}
        />
        {slides}
        {this.props.caption && (
          <Fragment>
            <CarouselControl
              direction="prev"
              directionText="Previous"
              onClickHandler={this.previous}
            />
            <CarouselControl
              direction="next"
              directionText="Next"
              onClickHandler={this.next}
            />
          </Fragment>
        )}
      </Carousel>
    );
  }
}

Slideshow.propTypes = {
  caption: PropTypes.bool,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      caption: PropTypes.string,
      src: PropTypes.string,
    }).isRequired
  ),
  type: PropTypes.oneOf(Object.keys(SLIDESHOW_TYPE)),
};

Slideshow.defaultProps = {
  caption: false,
};

Slideshow.Image = ({ item }) => (
  <div className="card">
    <img alt={item.altText} className="img-fluid" src={item.src} />
    <div className="card-img-overlay overlay-dark text-white d-flex justify-content-center align-items-end">
      <CarouselCaption captionHeader={item.caption} captionText="" />
    </div>
  </div>
);

Slideshow.Image.propTypes = {
  item: PropTypes.shape({
    altText: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
  }),
};

Slideshow.Entertainers = ({ item }) => (
  <div className="row">
    <Entertainers.List lists={item.list} />
  </div>
);

Slideshow.Entertainers.propTypes = {
  item: PropTypes.shape({
    list: PropTypes.arrayOf(PropTypes.object).isRequired,
  }),
};

Slideshow.Events = ({ item }) => (
  <div className="row">
    <Events.List lists={item.list} />
  </div>
);

Slideshow.Events.propTypes = {
  item: PropTypes.shape({
    list: PropTypes.arrayOf(PropTypes.object).isRequired,
  }),
};

Slideshow.Testimonials = ({ item }) => <Testimonials {...item} />;

Slideshow.Testimonials.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    testimonial: PropTypes.string.isRequired,
  }),
};

export default Slideshow;
