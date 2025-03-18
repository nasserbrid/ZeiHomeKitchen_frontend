import React, { Component } from 'react';
import AuthForm from './components/AuthForm';
import Navbar from './components/Navbar';
import { AppState } from './types/AppState';
import './styles/global.css';
import IAuthService from './services/IAuthService';
import AuthService from './services/AuthService';
import Home from './pages/Home';



// interface AppState {
//   token: string | null;
//   username: string | null;
// }


class App extends Component<{}, AppState> {

  //Toujours passer le service en privé pour pouvoir l'utiliser dans le render en dessous (c'est une classe qui est instanciée)
  private authService:IAuthService = new AuthService();


  constructor(props: {}) {
    super(props);
    this.state = {
      token: localStorage.getItem('token'),
      username: localStorage.getItem('username')
    };

    // Je lie les méthodes au contexte de la classe
    this.handleAuthSucess = this.handleAuthSucess.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  
  public handleAuthSucess(token: string, username: string): void
  {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    this.setState({ token, username });
  }
  // handleAuthSuccess = (token: string, username: string): void => {
  //   localStorage.setItem('token', token);
  //   localStorage.setItem('username', username);
  //   this.setState({ token, username });
  // }
 
  public handleLogout(): void{
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.setState({ token: null, username: null });
  }

  // handleLogout = (): void => {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('username');
  //   this.setState({ token: null, username: null });
  // }

  render() {
    const { token, username } = this.state;
    const isLoggedIn = !!token;

    return (
      <div className="app">
        <Navbar isLoggedIn={isLoggedIn} onLogout={this.handleLogout} /> 
        
        
        {isLoggedIn ? (
          <main className="app-content">
            <Home username={username}/>
          </main>
        ) : (
          <div className="auth-page">
            <AuthForm onSuccess={this.handleAuthSucess} authService={this.authService}/>
          </div>
        )}
      </div>
    );
  }
}

export default App;