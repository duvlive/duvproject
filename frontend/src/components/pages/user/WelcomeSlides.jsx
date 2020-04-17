import React from 'react';
import PropTypes from 'prop-types';
import { Carousel, CarouselIndicators, CarouselItem } from 'reactstrap';
import Card from 'components/custom/Card';

const WelcomeSlides = ({ items }) => {
  const [animating, setAnimating] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const onExiting = () => setAnimating(true);
  const onExited = () => setAnimating(false);
  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => !animating && setActiveIndex(newIndex);

  const welcomeSlides = items.map(({ color, name, text }, index) => {
    return (
      <CarouselItem key={index} onExited={onExited} onExiting={onExiting}>
        <div className="text-right small--2 mb-3">Skip Intro</div>
        <h3>{name}</h3>
        <p>{text}</p>
      </CarouselItem>
    );
  });

  return (
    <Card
      className="onboarding__slides w-100 rounded-0"
      color={items[activeIndex].color}
    >
      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
        slide={false}
      >
        <CarouselIndicators
          activeIndex={activeIndex}
          items={items}
          onClickHandler={goToIndex}
        />
        {welcomeSlides}
      </Carousel>
    </Card>
  );
};

WelcomeSlides.propTypes = {
  caption: PropTypes.bool,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      name: PropTypes.string,
      title: PropTypes.string,
    }).isRequired
  ),
};

WelcomeSlides.defaultProps = {
  caption: false,
};

export default WelcomeSlides;
