import React from 'react';
import {Transition} from 'react-spring/renderprops';
import {useSelector} from 'react-redux';
import './warning.css';

export default function Warning () {
  const state = useSelector(state => state);

  const { warningNotification, warningNotificationText } = state.warning;
  return (
    <Transition
        items={warningNotification}
        from={{opacity: 0, transform: 'translateY(-250px)'}}
        enter={{opacity: 1, transform: 'translateY(0)'}}
        leave={{opacity: 0, transform: 'translateY(250px)'}}
      >
        {item =>
          item && (props => (
            <div
              className="warning-notification"
              style={props}
            >
              {warningNotificationText}
            </div>
          ))}
      </Transition>
  )
};