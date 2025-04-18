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
        this.handleToggleSelection = this.handleToggleSelection.bind(this);
    }
    
    // private handleClick = (): void => {
    //     this.props.onPlatClick(this.props.plat.idPlat);
    // }

    private handleClick(): void {
        this.props.onPlatClick(this.props.plat.idPlat);
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


    private handleToggleSelection(event: React.MouseEvent<HTMLInputElement>): void {
        event.stopPropagation(); // Empêcher le clic de se propager à la carte
        if (this.props.onToggleSelection) {
            this.props.onToggleSelection(this.props.plat.idPlat);
        }
    }
    //ReactNode un tableau de balise qui est retournée
    private renderImage(): React.ReactNode {
        const { plat } = this.props;
        
        if (plat.imageBase64) {
            console.log(`Base64 reçu (longueur) : ${plat.imageBase64.length}`);
            console.log(`Début de l'image base64 : ${plat.imageBase64.substring(0, 50)}`);
            return <img src={`data:image/jpeg;base64,${plat.imageBase64}`} alt={plat.nom} className="plat-image" />;
            
        } else if (plat.image) {
            console.log(`image :${plat.image.length}`);
            return <img src={plat.image} alt={plat.nom} className="plat-image" />;
        } else {
            return <div className="plat-image-placeholder">Image non disponible</div>;
        }
    }

    render() {
        const { plat, isSelected } = this.props;
        
        return (
            <div className={`plat-card ${isSelected ? 'selected' : ''}`} onClick={this.handleClick}>
                <div className="plat-selection" onClick={(e) => e.stopPropagation()}>
                    <input 
                        type="checkbox" 
                        checked={isSelected || false}
                        onChange={(e) => this.handleToggleSelection(e as any)}
                        id={`select-plat-${plat.idPlat}`}
                    />
                    <label htmlFor={`select-plat-${plat.idPlat}`}>Sélectionner</label>
                </div>
                <h3 className="plat-name">{plat.nom}</h3>
                {this.renderImage()}
                
                <p className="plat-price">{plat.prix.toFixed(2)} €</p>
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