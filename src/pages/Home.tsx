import React, { Component } from 'react';
import { HomeProps } from './HomeProps';
import '../styles/global.css';
// import '../styles/home.css';


class Home extends Component<HomeProps> {
  render() {
    const { username } = this.props;
    
    return (
      <div className="home-container">
        <div className="welcome-header">
          {username && (
            <p className="personal-welcome">Bonjour, {username} !</p>
          )}
          <h1 className="main-title">Bienvenue chez Zei Home Kitchen</h1>
          
        </div>
        
        <div className="content-section">
          <p className="description-text">
            Bienvenue chez Zei Home Kitchen, votre solution idéale pour gagner du temps tout en savourant des repas faits maison.
            Notre entreprise se spécialise dans la préparation de plats délicieux, soigneusement élaborés selon une carte variée. Nous
            comprenons que chaque famille a des besoins uniques, c'est pourquoi nous nous adaptons à vos exigences culinaires, en tenant
            compte des allergies alimentaires et des préférences spécifiques.
          </p>
          
          <p className="description-text">
            Tous nos ingrédients sont bio, garantissant des repas sains et savoureux. Ce qui rend notre service encore plus spécial, c'est
            que chaque plat est cuisiné directement dans votre maison, apportant une touche personnelle à votre expérience culinaire.
          </p>
          
          <p className="description-text">
            Pour profiter de nos prestations, il est important de réserver à l'avance. Rejoignez-nous pour découvrir le plaisir d'un repas
            fait maison, sans le stress de la préparation !
          </p>
        </div>
        
        <div className="action-section">
          <button className="reserve-button">Réserver</button>
        </div>
      </div>
    );
  }
}

export default Home;