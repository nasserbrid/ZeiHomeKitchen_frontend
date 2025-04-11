// components/PlatCard/PlatCard.tsx
import React, { Component } from 'react';
import { PlatCardProps } from './PlatCardProps';
import '../../styles/global.css';

class PlatCard extends Component<PlatCardProps> {

    constructor(props: PlatCardProps) {
        super(props);
        // Je lie la méthode handleClick() au contexte de la classe
        this.handleClick = this.handleClick.bind(this);
        this.handleBackClick = this.handleBackClick.bind(this);
        this.handleReservationClick = this.handleReservationClick.bind(this);
    }
    
    // private handleClick = (): void => {
    //     this.props.onPlatClick(this.props.plat.idPlat);
    // }

    private handleClick(): void {
        this.props.onPlatClick(this.props.plat.IdPlat);
    }

    private handleReservationClick(event: React.MouseEvent<HTMLButtonElement>): void {
        //J'empêche le clic se se propager à la carte
        event.stopPropagation();
        console.log("Réserver");
        this.props.onReserverClick();
    }

    private handleBackClick(event: React.MouseEvent<HTMLButtonElement>): void {
        event.stopPropagation();
        console.log('Retour au catalogue');
        this.props.onBackClick();
    }
    //ReactNode un tableau de balise qui est retournée
    private renderImage(): React.ReactNode {
        const { plat } = this.props;
        
        if (plat.ImageBase64) {
            console.log(`Base64 reçu (longueur) : ${plat.ImageBase64.length}`);
            console.log(`Début de l'image base64 : ${plat.ImageBase64.substring(0, 50)}`);
            return <img src={`data:image/jpeg;base64,${plat.ImageBase64}`} alt={plat.Nom} className="plat-image" />;
            
        } else if (plat.Image) {
            console.log(`image :${plat.Image.length}`);
            return <img src={plat.Image} alt={plat.Nom} className="plat-image" />;
        } else {
            return <div className="plat-image-placeholder">Image non disponible</div>;
        }
    }

    render() {
        const { plat } = this.props;
        
        return (
            <div className="plat-card" onClick={this.handleClick}>
                <h3 className="plat-name">{plat.Nom}</h3>
                {this.renderImage()}
                
                <p className="plat-price">{plat.Prix.toFixed(2)} €</p>
                <div className="action-buttons">
                    <button className="reserve-button" onClick={this.handleReservationClick}>
                        Réserver
                    </button>

                    <button className="back-button" onClick={this.handleBackClick}>
                        Retour au catalogue
                    </button>
                </div>

            </div>
            
            
        );
    }
}

export default PlatCard;