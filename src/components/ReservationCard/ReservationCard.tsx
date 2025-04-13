// // components/PlatCard/PlatCard.tsx
// import React, { Component } from 'react';
// import { ReservationCardProps } from './ReservationCardProps';
// import '../../styles/global.css';

// class ReservationCard extends Component<ReservationCardProps> {

//     constructor(props: ReservationCardProps) {
//         super(props);
//         // Je lie la méthode handleClick() au contexte de la classe
//         this.handleClick = this.handleClick.bind(this);
//     }
    
//     // private handleClick = (): void => {
//     //     this.props.onPlatClick(this.props.plat.idPlat);
//     // }

//     private handleClick(): void {
//         this.props.onReservationClick(this.props.reservation.PlatIds);
//     }
//     //ReactNode un tableau de balise qui est retournée
//     private renderImage(): React.ReactNode {
//         const { reservation } = this.props;
        
//         if (reservation.PlatIds) {
//             console.log(`reservation pour le plat qui pour id : ${reservation.PlatIds}`);
            
//         //     return <img src={`data:image/jpeg;base64,${plat.ImageBase64}`} alt={plat.Nom} className="plat-image" />;
            
//         // } else if (plat.Image) {
//         //     console.log(`image :${plat.Image.length}`);
//         //     return <img src={plat.Image} alt={plat.Nom} className="plat-image" />;
//         // } else {
//         //     return <div className="plat-image-placeholder">Image non disponible</div>;
//         // }
//     }

//     render() {
//         //const { reservation } = this.props;
        
//         return (
//             <div className="reservation-button" onClick={this.handleClick}>
//                   <button className="reserve-button">Réserver</button>
//             </div>
//         );
//     }
// }
// }

// export default ReservationCard;