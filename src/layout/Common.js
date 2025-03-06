import React from 'react'
import Header from '../components/common/Header'
import Sidebar from '../components/common/Sidebar'

function Common({ children }) {

    return (
        <div >
            <Header />
            <div className='d-flex'>
                <Sidebar />
                <div className='p-3'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Common;