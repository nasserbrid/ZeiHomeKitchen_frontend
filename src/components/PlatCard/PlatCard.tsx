// components/PlatCard/PlatCard.tsx
import React, { Component } from 'react';
import { PlatCardProps } from './PlatCardProps';
import '../../styles/global.css';

class PlatCard extends Component<PlatCardProps> {

    constructor(props: PlatCardProps) {
        super(props);
        // Je lie la méthode handleClick() au contexte de la classe
        this.handleClick = this.handleClick.bind(this);
    }
    
    // private handleClick = (): void => {
    //     this.props.onPlatClick(this.props.plat.idPlat);
    // }

    private handleClick(): void {
        this.props.onPlatClick(this.props.plat.idPlat);
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
        const { plat } = this.props;
        
        return (
            <div className="plat-card" onClick={this.handleClick}>
                <h3 className="plat-name">{plat.nom}</h3>
                {this.renderImage()}
                
                <p className="plat-price">{plat.prix.toFixed(2)} €</p>
            </div>
        );
    }
}

export default PlatCard;