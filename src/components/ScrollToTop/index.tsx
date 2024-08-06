'use client';

const ScrollToTop = () => {
  return (
    <div className="fixed bottom-2 md:bottom-4 right-4 md:right-8 z-50">
      <span
        className="icon-circle-up text-3xl md:text-4xl  hover:scale-110 cursor-pointer transition-all ease-in-out duration-300"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />
    </div>
  );
};

export default ScrollToTop;
