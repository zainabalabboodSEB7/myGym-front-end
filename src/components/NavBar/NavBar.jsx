import { Link } from 'react-router-dom'
import logo from '../../assets/images/logoname.png';

const NavBar = (props) => {
  return (
    <nav id="navbar">
      <div id="imageHome">
         <img 
         src={logo} 
         alt="My Gym Logo" 
         style={{ height: '50px', width: 'auto' }} 
        />
      </div>
      {props.user ? (
        <ul id='navbar-links'>
          <li>Welcome, {props.user.username}</li>
          <li><Link to="/"> Home </Link></li>
          <li><Link to="/categories">Categories</Link></li>

           {props.user.is_admin && (
            <li><Link to="/categories/new">Add Category</Link></li>
        )}

          <li><Link to='/' onClick={props.handleSignOut}>Sign Out</Link></li>
        </ul>
      ) : (
        <ul>
          <li><Link to="/"> Home </Link></li>
          <li><Link to="/categories">Categories</Link></li>
          <li><Link to="/sign-up">Sign Up</Link></li>
          <li><Link to="/sign-in">Sign In</Link></li>
        </ul>
      )}
    </nav>
    
  )
}

export default NavBar 