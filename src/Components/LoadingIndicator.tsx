import React, {useState} from 'react';
import {Spinner} from 'react-bootstrap';

type LoadingIndicatorProps = {
    show: boolean;
};


export default function LoadingIndicator({show}: LoadingIndicatorProps) {
    const LoadingNotification = () => {
        if (!show) return null;

        return (
            <div style={{backgroundColor: 'rgba(0, 0, 0, 0.5)', color: '#fff', padding: '1rem'}}>
                <Spinner animation="border" variant="light" size="sm" style={{marginRight: '0.5rem'}}/>
                Loading...
            </div>
        );
    };
    return <LoadingNotification/>;
}


