import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

class Sidebar extends PureComponent {
    render() {
        return (
            <Router>
                <div className='sidebar'>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        <li>
                            <Link to='/'>Home</Link>
                        </li>
                        <li>
                            <button>Logout</button>
                        </li>
                    </ul>
                </div>
            </Router>
        );
    }
}

export default Sidebar;