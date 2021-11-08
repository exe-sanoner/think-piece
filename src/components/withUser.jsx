import React from 'react';
import { UserContext } from '../providers/UserProvider';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

const withUser = Component => {

  const WrappedComponent = props => (
    <UserContext.Consumer>
      {user => <Component user={user} {...props} />}
    </UserContext.Consumer>
  );
  // for a Debugging purposes:
  WrappedComponent.displayName = `WithUser(${getDisplayName(WrappedComponent)})`;
  return WrappedComponent;
};
export default withUser;