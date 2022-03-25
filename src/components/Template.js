import { CSSTransition } from 'react-transition-group';

const Template = ({
  number,
  active,
  direction,
  color,
  handleKeyDown,
  children,
}) => {
  return (
    <CSSTransition
      in={active}
      classNames={`${direction} pageSlider`}
      timeout={500}
    >
      <section
        style={{ backgroundColor: color }}
        className={`container ${
          direction === null && active ? '' : 'no-opacity'
        }`}
        onKeyDown={handleKeyDown}
      >
        <div className='center'>{children}</div>
      </section>
    </CSSTransition>
  );
};

export default Template;
