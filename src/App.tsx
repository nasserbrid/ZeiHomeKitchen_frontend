import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom'; // Importer Route et Routes pour la navigation
import AuthForm from './components/AuthForm';
import Navbar from './components/Navbar';
import { AppState } from './types/AppState';
import './styles/global.css';
import IAuthService from './services/IAuthService';
import AuthService from './services/AuthService';
import Home from './pages/Home';
import PlatsPage from './pages/PlatsPage/PlatsPage';
import PlatDetailPage from './pages/PlatDetailPage/PlatDetailPage';


// interface AppState {
//   token: string | null;
//   username: string | null;
// }

class App extends Component<{}, AppState> {

  // Toujours passer le service en privé pour pouvoir l'utiliser dans le render en dessous (c'est une classe qui est instanciée)
  private authService: IAuthService = new AuthService();

  constructor(props: {}) {
    super(props);
    this.state = {
      token: localStorage.getItem('token'),
      username: localStorage.getItem('username'),
      searchQuery: ""
    };

    // Je lie les méthodes au contexte de la classe
    this.handleAuthSucess = this.handleAuthSucess.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    
  }

  public handleAuthSucess(token: string, username: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    this.setState({ token, username });
  }
  
  public handleLogout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.setState({ token: null, username: null });
  }

   public handleSearch(searchQuery: string): void {
    console.log("handleSearch appelée avec :", searchQuery);
    this.setState({ searchQuery });
  }

  render() {
    
    const { token, username, searchQuery } = this.state;
    console.log("searchQuery dans le state :", this.state.searchQuery);
    const isLoggedIn = !!token; // Vérifie si l'utilisateur est connecté

    return (
      <div className="app">
        <Navbar isLoggedIn={isLoggedIn} onLogout={this.handleLogout} onSearch={this.handleSearch}  /> 
        
        {/* Utilisation de Routes pour gérer la navigation */}
        <main className="app-content">
          <Routes>
            {isLoggedIn ? (
              <>
                {/* Route pour la page des plats */}
                <Route path="/plats" element={<PlatsPage searchQuery={searchQuery} />} />
                {/* Route pour les détails d'un plat */}
                <Route path="/plats/:idPlat" element={<PlatDetailPage/>} />
                {/* Route pour la page d'accueil */}
                <Route path="/" element={<Home username={username} />} />
              </>
            ) : (
              // <div className="auth-page">
              //   {/* Route pour le formulaire d'authentification */}
              //   <Route path="/" element={<AuthForm onSuccess={this.handleAuthSucess} authService={this.authService} />} />
              // </div>

              <Route path="/" element={<AuthForm onSuccess={this.handleAuthSucess} authService={this.authService} />} />
              
            )}
          </Routes>
        </main>
      </div>
    );
  }
}

export default App;
