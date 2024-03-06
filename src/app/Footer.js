import React from 'react';

const Footer = () => {

    const today = new Date();
    
    return (
        <footer className='black row footer'>
            <div className='col s12'>
                <h5 className='white-text'>Harlen Kinsey © {today.getFullYear()}</h5>
            </div>

        </footer>
    )
}

export default Footer;