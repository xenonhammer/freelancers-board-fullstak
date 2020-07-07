import React from 'react';
import { Transition } from 'react-spring/renderprops';
import { connect } from 'react-redux';
import './warning.css';


class Warning extends React.Component{
    render(){
        return(
            <Transition      
                items={this.props.warningNotification}
                from={{opacity:0, transform: 'translateY(-250px)'}}
                enter={{opacity: 1, transform: 'translateY(0)'}}
                leave={{opacity: 0, transform: 'translateY(250px)'}}
                >
                    {item =>
                        item && (props => (
                            <div
                                className="warning-notification"
                                style={props}
                            >
                                {this.props.warningNotificationText}
                            </div>
                ))}
            </Transition>
        )
    }
}export default connect(
    state => ({
        warningNotification:         state.warning.warningNotification,
        warningNotificationText:     state.warning.warningNotificationText,
    })
) (Warning)