import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom'; // Importer Route et Routes pour la navigation
import AuthForm from './pages/Authentication/AuthForm';
import Navbar from './components/Navbar/Navbar';
import { AppState } from './types/AppState';
import './styles/global.css';
import IAuthService from './services/AuthService/IAuthService';
import AuthService from './services/AuthService/AuthService';
import IReservationsService from './services/ReservationsService/IReservationsService';
import ReservationsService from './services/ReservationsService/ReservationsService';
import IUserService from './services/User/IUserService';
import UserService from './services/User/UserService';
import Home from './pages/Home/Home';
import PlatsPage from './pages/PlatsPage/PlatsPage';
import PlatDetailPage from './pages/PlatDetailPage/PlatDetailPage';
import ReservationPageForm from './pages/ReservationPage/ReservationPageForm'; // Assurez-vous que ce chemin est correct

class App extends Component<{}, AppState> {
  private authService: IAuthService = new AuthService();
  private reservationService: IReservationsService = new ReservationsService(); // Initialisation ici
  private userService: IUserService = new UserService(); // Initialisation ici
  
  

  constructor(props: {}) {
    super(props);
    this.state = {
      token: localStorage.getItem('token'),
      username: localStorage.getItem('username'),
      searchQuery: ""
    };

    

    // Lier les méthodes au contexte de la classe
    this.handleAuthSucess = this.handleAuthSucess.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  public handleAuthSucess(token: string, username: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    this.setState({ token, username }, () => {
      window.location.href = '/';
    });
  }
  
  public handleLogout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.setState({ token: null, username: null });
  }

  public handleSearch(searchQuery: string): void {
    this.setState({ searchQuery });
  }

  render() {
    const { token, username, searchQuery } = this.state;
    const isLoggedIn = !!token; // Vérifie si l'utilisateur est connecté

    return (
      <div className="app">
        <Navbar isLoggedIn={isLoggedIn} onLogout={this.handleLogout} onSearch={this.handleSearch} /> 
        
        {/* Utilisation de Routes pour gérer la navigation */}
        <main className="app-content">
          <Routes>
            {isLoggedIn ? (
              <>
                <Route path="/reservation" element={<ReservationPageForm reservationService={this.reservationService} userService={this.userService} />} />
                <Route path="/plats" element={<PlatsPage searchQuery={searchQuery} />} />
                <Route path="/plats/:idPlat" element={<PlatDetailPage />} />
                <Route path="/" element={<Home username={username} />} />
              </>
            ) : (
              <Route path="/" element={<AuthForm onSuccess={this.handleAuthSucess} authService={this.authService} />} />
            )}
          </Routes>
        </main>
      </div>
    );
  }
}

export default App;
