import React, { Component} from 'react';
import { Switch, Route, Redirect  } from 'react-router-dom';
import { connect } from 'react-redux';


class PrivateRoute extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        var { MyComponent, rest } = this.props;
        return(
            <Route {...rest} render={props => (
                this.props.isAuthenticated ? 
                (<MyComponent {...props}/>) 
                : 
                (
                  <Redirect to={{
                        pathname: '/auth/login',
                        state: { from: props.location }
                    }}
                  />
                )
            )}
        />
        )
    }

}

// const PrivateRoute = ({ component: Component, ...rest }) => (
//     <Route {...rest} render={props => (
//             this.props.isAuthenticated ? 
//             (<Component {...props}/>) 
//             : 
//             (
//               <Redirect to={{
//                     pathname: '/auth/login',
//                     state: { from: props.location }
//                 }}
//               />
//             )
//         )}
//     />
// )

const mapStateToProps = function(state) {
    return {
        userDetails : state.userDetailReducer.userDetails,
        isAuthenticated : state.userDetailReducer.isAuthenticated
    }
  }
  const mapDispatchToProps = function(dispatch) {
    return {
        getUserDetail : user => dispatch({type: GET_USERDETAIL, action: user})
      }
  }

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);