import './App.css';
import './App.scss';
import './fonts/style.css';
import './slideTransition.scss';

import { Fragment } from 'react';
import Landing from './components/Landing';
import Template from './components/Template';
import { Routes, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

function App() {
  // const currentKey = location.pathname.split('/')[1];
  // const timeout = { enter: 1000, exit: 1000 };

  return (
    <Landing />
    // <Fragment>
    //   <TransitionGroup component='div' className='App'>
    //     <CSSTransition
    //       key={currentKey}
    //       timeout={timeout}
    //       classNames='pageSlider'
    //       mountOnEnter={true}
    //       unmountOnExit={true}
    //     >
    //       <div className='left'>
    //         <Routes location={location}>
    //           <Route
    //             path='/1'
    //             exact
    //             component={() => <Template number='1' color='green' />}
    //           />
    //           <Route
    //             path='/2'
    //             exact
    //             component={() => <Template number='1' color='green' />}
    //           />
    //           <Route
    //             path='/3'
    //             exact
    //             component={() => <Template number='1' color='green' />}
    //           />
    //         </Routes>
    //       </div>
    //     </CSSTransition>
    //   </TransitionGroup>
    // </Fragment>
  );
}

export default App;
