import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';

const Loading = () => {
    return (
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100vw', height: '100vh', zIndex: 10 }} >
            <CircularProgress />
        </div>
    )
}

export default Loading