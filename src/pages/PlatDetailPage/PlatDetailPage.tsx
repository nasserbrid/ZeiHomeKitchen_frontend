// pages/PlatDetailPage/PlatDetailPage.tsx
import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import { PlatDetailPageProps } from './PlatDetailPageProps';
import { PlatDetailPageState } from './PlatDetailPageState';
import PlatsService from '../../services/PlatsService/PlatsService';
import '../../styles/global.css';
import { Ingredient } from '../../Models/Ingredient';
import { Plat } from '../../Models/Plat';

// Composant wrapper pour obtenir le paramètre d'URL et le passer au composant principal
function PlatDetailPageWrapper()
{
    const { idPlat } = useParams<{ idPlat: string }>();
    return <PlatDetailPage id={idPlat || ''} />;
};

class PlatDetailPage extends Component<PlatDetailPageProps, PlatDetailPageState> {
    private platsService: PlatsService;
    
    constructor(props: PlatDetailPageProps) {
        super(props);
        this.state = {
            plat: null,
            loading: true,
            error: null
        };
        this.platsService = new PlatsService();

        //Je lie la méthode handleBackClick() au contexte de la classe
        this.handleBackClick = this.handleBackClick.bind(this);
    }

    componentDidMount() {
        this.fetchPlatDetail();
    }

    /**
     * Méthode qui me permet de récupérer la plat par son ID, puis ses ingrédients
     * et ensuite mettre à jour le state
     */
    private async fetchPlatDetail(): Promise<void> {
        try {
            //ici je converti l'id qui est une string dans l'url en number
            const idPlat = Number(this.props.id); 
            if (isNaN(idPlat)) throw new Error("ID de plat invalide");
    
            // Je récupère un plat depuis le service
            const platResponse:Plat = await this.platsService.GetPlatByID(idPlat);
            console.log(`platResponse:${platResponse}`);
            console.log(`idPlat:${idPlat}`);

            if (!platResponse) {
                console.error(`Aucun plat trouvé pour l'ID : ${idPlat}`);
                return;
            }

            // Je récupère les ingrédients associés à un plat depuis le service
            const ingredientsResponse = await this.platsService.GetIngredientsByPlatId(idPlat);
            const testTableauIngredientData: Ingredient[] = ingredientsResponse.map((item: Ingredient) => item);
            console.log(`testTableauIngredientData:${testTableauIngredientData}`);
    
            //Mise à jour du state avec le plat et les ingrédients
            this.setState({
                plat: { ...platResponse, ingredients: testTableauIngredientData }, 
                loading: false,
                error: null,
            });
        } catch (error) {
            this.setState({ error: "Erreur lors du chargement du plat", loading: false });
            console.log(error);
        }
    }
    

    private renderImage(): React.ReactNode 
    {
        const { plat, loading, error } = this.state;

        if (loading) return <div>Chargement...</div>;
        if (error) return <div>{error}</div>;
        if (!plat) return <div>Aucun plat trouvé</div>;
        

        
        if (plat.imageBase64) {
            return <img src={`data:image/jpeg;base64,${plat.imageBase64}`} alt={plat.nom} className="plat-detail-image" />;
        } else if (plat.image) {
            return <img src={plat.image} alt={plat.nom} className="plat-detail-image" />;
        } else {
            return <div className="plat-image-placeholder">Image non disponible</div>;
        }
    }

    private handleBackClick(): void 
    {
        window.history.back();
    }

    private handleReservationClick(): void
    {
        window.location.href = '/reservation';
    }

    render() {
        const { plat, loading, error } = this.state;

        if (loading) return <div className="loading">Chargement des détails...</div>;
        if (error) return <div className="error">{error}</div>;
        if (!plat) return <div className="error">Plat non trouvé</div>;

        return (
            <div className="home-container">
                <div className="plat-detail">
                    <h1 className="main-title">{plat.nom}</h1>
                    
                    <div className="plat-image-container">
                        {this.renderImage()}
                    </div>
                    
                    <div className="plat-info">
                        <p className="plat-price-detail">{plat.prix.toFixed(2)} €</p>
                        
                        <div className="description">
                            <h2>Description</h2>
                            <p>{plat.description || "Aucune description disponible"}</p>
                        </div>
                        
                        <div className="ingredients">
                            <h2>Ingrédients</h2>
                            <ul className="ingredients-list">
                                {plat.ingredients && plat.ingredients.length > 0 ? (
                                    plat.ingredients.map(ingredient => (
                                        <li key={ingredient.idIngredient}>{ingredient.nom}</li>
                                    ))
                                ) : (
                                    <p>Aucun ingrédient disponible</p>
                                )}
                            </ul>
                        </div>
                    </div>
                    
                    <div className="action-buttons">
                        <button className="reserve-button" onClick={this.handleReservationClick}>
                            Réserver
                        </button>
                        
                        <button className="back-button" onClick={this.handleBackClick}>
                            Retour au catalogue
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default PlatDetailPageWrapper;
// import React, { Component } from 'react';
// import { PlatDetailPageProps } from './PlatDetailPageProps';
// import { PlatDetailPageState } from './PlatDetailPageState';
// import PlatsService from '../../services/PlatsService';
// import '../../styles/global.css';

// class PlatDetailPage extends Component<PlatDetailPageProps, PlatDetailPageState> {
//     private platsService: PlatsService;
    
//     constructor(props: PlatDetailPageProps) {
//         super(props);
//         this.state = {
//             plat: null,
//             loading: true,
//             error: null
//         };
//         this.platsService = new PlatsService();
//     }

//     componentDidMount() {
//         this.fetchPlatDetail();
//     }

//     private fetchPlatDetail = async (): Promise<void> => {
//         const { id } = this.props;
        
//         if (!id) return;
        
//         try {
//             this.setState({ loading: true });
//             const response = await this.platsService.GetPlatIdWithIngredients(parseInt(id));
//             this.setState({
//                 plat: response.plat,
//                 error: null
//             });
//         } catch (err) {
//             this.setState({
//                 error: "Erreur lors du chargement des détails du plat"
//             });
//             console.error(err);
//         } finally {
//             this.setState({ loading: false });
//         }
//     }

//     private renderImage(): React.ReactNode {
//         const { plat } = this.state;
        
//         if (!plat) return null;
        
//         if (plat.imageBase64) {
//             return <img src={`data:image/jpeg;base64,${plat.imageBase64}`} alt={plat.nom} className="plat-detail-image" />;
//         } else if (plat.image) {
//             return <img src={plat.image} alt={plat.nom} className="plat-detail-image" />;
//         } else {
//             return <div className="plat-image-placeholder">Image non disponible</div>;
//         }
//     }

//     private handleBackClick = (): void => {
//         window.history.back();
//     }

//     private handleReservationClick = (): void => {
//         window.location.href = '/reservation';
//     }

//     render() {
//         const { plat, loading, error } = this.state;

//         if (loading) return <div className="loading">Chargement des détails...</div>;
//         if (error) return <div className="error">{error}</div>;
//         if (!plat) return <div className="error">Plat non trouvé</div>;

//         return (
//             <div className="home-container">
//                 <div className="plat-detail">
//                     <h1 className="main-title">{plat.nom}</h1>
                    
//                     <div className="plat-image-container">
//                         {this.renderImage()}
//                     </div>
                    
//                     <div className="plat-info">
//                         <p className="plat-price-detail">{plat.prix.toFixed(2)} €</p>
                        
//                         <div className="description">
//                             <h2>Description</h2>
//                             <p>{plat.description || "Aucune description disponible"}</p>
//                         </div>
                        
//                         <div className="ingredients">
//                             <h2>Ingrédients</h2>
//                             <ul className="ingredients-list">
//                                 {plat.ingredients && plat.ingredients.length > 0 ? (
//                                     plat.ingredients.map(ingredient => (
//                                         <li key={ingredient.idIngredient}>{ingredient.nom}</li>
//                                     ))
//                                 ) : (
//                                     <p>Aucun ingrédient disponible</p>
//                                 )}
//                             </ul>
//                         </div>
//                     </div>
                    
//                     <div className="action-buttons">
//                         <button className="reserve-button" onClick={this.handleReservationClick}>
//                             Réserver
//                         </button>
                        
//                         <button className="back-button" onClick={this.handleBackClick}>
//                             Retour au catalogue
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

// export default PlatDetailPage;