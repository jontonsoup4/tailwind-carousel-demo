'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@headlessui/react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid';

const Carousel = (props) => {
  const { cards = [], wrap } = props;
  const [slide, setSlide] = useState(1);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);

  const carouselRef = useRef(null);

  useEffect(() => {
    carouselRef.current.addEventListener('scroll', handleScroll);
    carouselRef.current.addEventListener('mousedown', handleMouseDown);
    carouselRef.current.addEventListener('mouseleave', handleMouseLeave);
    carouselRef.current.addEventListener('mouseup', handleMouseUp);
    carouselRef.current.addEventListener('mousemove', handleMouseMove);

    return () => {
      carouselRef?.current?.removeEventListener('scroll', handleScroll);
      carouselRef?.current?.removeEventListener('mousedown', handleMouseDown);
      carouselRef?.current?.removeEventListener('mouseleave', handleMouseLeave);
      carouselRef?.current?.removeEventListener('mouseup', handleMouseUp);
      carouselRef?.current?.removeEventListener('mousemove', handleMouseMove);
    };
  }, [carouselRef, isMouseDown, startX, scrollStart, slide, wrap]);

  const handleScroll = () => {
    const currentSlide = Math.round(carouselRef.current.scrollLeft / carouselRef.current.offsetWidth) + 1;
    setSlide(currentSlide);
  };

  const handleMouseDown = (e) => {
    setIsMouseDown(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollStart(carouselRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e) => {
    if (!isMouseDown) return;
    const x = e.pageX - carouselRef.current.offsetLeft;
    let walk = (x - startX) * 3; // scroll-fast
    const maxScroll = carouselRef.current.offsetWidth;
    if (Math.abs(walk) > maxScroll) {
      walk = walk > 0 ? maxScroll : -maxScroll;
    }
    carouselRef.current.scrollLeft = scrollStart - walk;
  };

  const handleScrollTo = (nextSlide, scrollOffset) => {
    // Cancel ongoing scroll
    carouselRef.current.scrollTo({
      left: carouselRef.current.scrollLeft,
      behavior: 'auto',
    });

    // Start new scroll
    setSlide(nextSlide);
    carouselRef.current.scrollBy({
      left: scrollOffset,
      behavior: 'smooth',
    });
  };

  const handleNext = () => {
    const nextSlide = slide === cards.length ? 1 : slide + 1;
    const scrollOffset = nextSlide === 1 && wrap ? -carouselRef.current.scrollLeft : carouselRef.current.offsetWidth;
    handleScrollTo(nextSlide, scrollOffset);
  };

  const handlePrev = () => {
    const prevSlide = slide === 1 && wrap ? cards.length : slide - 1;
    const scrollOffset =
      prevSlide === cards.length
        ? carouselRef.current.scrollWidth - carouselRef.current.scrollLeft
        : -carouselRef.current.offsetWidth;
    handleScrollTo(prevSlide, scrollOffset);
  };

  return (
    <div className="relative w-48 h-48 sm:w-72 sm:h-72">
      <div className="absolute left-0 h-full">
        <Button
          disabled={slide === 1 && !wrap}
          onClick={handlePrev}
          className="h-full px-1 bg-gray-100 bg-opacity-0 data-[hover]:bg-opacity-20 data-[active]:bg-opacity-30 data-[disabled]:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
        >
          <ArrowLeftIcon className="h-12 w-12" />
        </Button>
      </div>
      <div className="absolute right-0 h-full">
        <Button
          disabled={slide === cards.length && !wrap}
          onClick={handleNext}
          className="h-full px-1 bg-gray-100 bg-opacity-0 data-[hover]:bg-opacity-20 data-[active]:bg-opacity-30 data-[disabled]:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
        >
          <ArrowRightIcon className="h-12 w-12" />
        </Button>
      </div>
      <div
        className="flex overflow-x-scroll scroll-smooth w-full h-full snap-mandatory snap-x carousel"
        ref={carouselRef}
      >
        {cards}
      </div>
    </div>
  );
};

export default Carousel;
