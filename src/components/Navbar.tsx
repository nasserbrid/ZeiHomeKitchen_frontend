import React, { Component } from "react";
import { Link } from "react-router-dom";
import { NavbarProps} from "./NavbarProps";


class Navbar extends Component<NavbarProps> {
  constructor(props: NavbarProps) {
    super(props);
    

    //Je lie la méthode handleLogout() au contexte de la classe
    this.handleLogout = this.handleLogout.bind(this);
  }


  public handleLogout(){
    if (this.props.onLogout) {
      this.props.onLogout();
     
    }
  }

  // handleLogout = () => {
  //   if (this.props.onLogout) {
  //     this.props.onLogout();
  //     this.setState({ isLoggedIn: false });
  //   }
  // };

  render() {
    
    return (
      <nav className="navbar">
        {/* Logo et Nom */}
        <div className="navbar-brand">
          <div className="logo-container">
            <img src="/src/assets/Group 5.png" alt="Logo" className="logo-icon" />
            <h1 className="logo-text">Zei'Home Kitchen</h1>
          </div>
        </div>

        {/* Liens de navigation */}
        <div className="navbar-links">
          <Link to="/" className="nav-link">Accueil</Link>
          <Link to="/catalogue" className="nav-link">Catalogue</Link>
          <Link to="/reservation" className="nav-link">Réservation</Link>
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
        </div>

        
        <div className="search-container">
          <input type="text" className="search-input" placeholder="Rechercher..." />
        </div>


        {/* Icônes à droite */}
        <div className="navbar-actions">
          {/* Icône Panier */}
          <button className="icon-button cart-button">
            <svg className="cart-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke="#4EB0B5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Icône Utilisateur */}
          {this.props.isLoggedIn? (
            <button className="icon-button user-button" onClick={this.handleLogout}>
              <svg className="user-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#4EB0B5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          ) : (
            <button className="icon-button user-button">
              <svg className="user-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#4EB0B5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </div>
      </nav>
    );
  }
}

export default Navbar;




// import React, { Component } from 'react';
// import { NavbarProps } from './NavbarProps';

// class Navbar extends Component<NavbarProps> {
//   render() {
//     const { isLoggedIn, onLogout } = this.props;

//     return (
//       <nav className="navbar">
//         <div className="navbar-brand">
//           <div className="logo-container">
//             <img src="/src/assets/Group 5.png" alt="Logo" className="logo-icon" />
//             <h1 className="logo-text">Zei'HomeKitchen</h1>
//           </div>
//         </div>
        
//         <div className="navbar-actions">
//           <button className="icon-button cart-button">
//             <svg className="cart-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke="#4EB0B5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//               <path d="M3 6H21" stroke="#4EB0B5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//               <path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="#4EB0B5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//             </svg>
//           </button>
          
//           {isLoggedIn ? (
//             <button className="icon-button user-button" onClick={onLogout}>
//               <svg className="user-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#4EB0B5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                 <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#4EB0B5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg>
//             </button>
//           ) : (
//             <button className="icon-button user-button">
//               <svg className="user-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#4EB0B5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                 <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#4EB0B5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg>
//             </button>
//           )}
//         </div>
//       </nav>
//     );
//   }
// }

// export default Navbar;