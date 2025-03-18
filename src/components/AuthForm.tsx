import React, { Component, ChangeEvent, FormEvent } from 'react';
import { AuthFormProps} from './AuthFormProps';
import { AuthFormState } from './AuthFormStates';
// import { AuthService} from '../services/authService';
import '../styles/global.css';

class AuthForm extends Component<AuthFormProps, AuthFormState> {
  constructor(props: AuthFormProps) {
    super(props);
    this.state = {
      isLogin: true,
      username: '',
      email: '',
      nom:'',
      prenom:'',
      password: '',
      error: null,
      loading: false
    };
  }

  /**
   * 
   */
  private handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value
    });
  }

  private toggleForm = (): void => {
    this.setState({
      isLogin: !this.state.isLogin,
      error: null
    });
  }

  private handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    this.setState({ loading: true, error: null });

    const {authService} = this.props;

    try {
      if (this.state.isLogin) {
        const response = await authService.GetLogin({
          username: this.state.username,
          password: this.state.password
        });
        this.props.onSuccess(response.token, this.state.username);
      } else {
        const response = await authService.GetRegister({
          username: this.state.username,
          email: this.state.email,
          nom: this.state.nom,
          prenom: this.state.prenom,
          password: this.state.password
        });
        this.props.onSuccess(response.token, this.state.username);
      }
    } catch (error) {
      this.setState({
        error: error instanceof Error ? error.message : 'An unknown error occurred'
      });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { isLogin, username, email, password, nom, prenom, error, loading } = this.state;

    return (
      <div className="auth-container">
        <div className="auth-form-wrapper">
          <h2>{isLogin ? 'Connexion' : "S'Enregister"}</h2>
          
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="username"
                value={username}
                onChange={this.handleInputChange}
                placeholder="Nom d'utilisateur"
                required
              />
            </div>
            
            {!isLogin && (
              <>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={this.handleInputChange}
                  placeholder="Email"
                  required
                />
              </div>

              <div className="form-group">
              <input
                type="nom"
                name="nom"
                value={nom}
                onChange={this.handleInputChange}
                placeholder="Nom"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="prenom"
                name="prenom"
                value={prenom}
                onChange={this.handleInputChange}
                placeholder="Prénom"
                required
              />
            </div>
            
              </>
            )}
            
            <div className="form-group">
              <input
                type="password"
                name="password"
                value={password}
                onChange={this.handleInputChange}
                placeholder="Mots de passe"
                required
              />
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <div className="form-actions">
              <button type="submit" disabled={loading}>
                {loading ? 'Chargement...' : isLogin ? 'Se connecter' : 'S\'inscrire'}
              </button>
              
              <button type="button" onClick={this.toggleForm} disabled={loading}>
                {isLogin ? 'Créer un compte' : 'Déjà inscrit ?'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AuthForm;