import React from 'react';
import { useHistory } from 'react-router-dom';

const withNavigation = (Component) => {
    return (props) => {
        const history = useHistory();

        return <Component navigate={history.push} {...props} />
    }
}

export default withNavigation;