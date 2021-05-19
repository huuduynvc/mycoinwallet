import { UserContext } from 'contexts/UserProvider';
import React, { useContext } from 'react';

const Loading = () => {
    const [user] = useContext(UserContext);
    return user.isLoading ? (
        <div className="loader-wrapper">
            <div className="loader-bg"></div>
            <div className="loader"></div>
        </div>
    ) : <></>;
}

export default Loading;
