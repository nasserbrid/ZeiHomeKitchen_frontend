import { Constants } from "../../Constants/constant";
import { User } from "../../Models/User";
import IUserService from "./IUserService";

export default class UserService implements IUserService {
  // Récupère l'utilisateur courant
  public async getCurrentUser(): Promise<User | null> {
    const token = localStorage.getItem("token");
    console.log("Token actuel:", localStorage.getItem("token"));

    if (!token) {
      console.error("Token non trouvé");
      return null;
    }

    try {
      const response = await fetch(`${Constants.API_URL_USER}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        mode: "cors",
      });

      if (!response.ok) {
        const errorData = await response.text(); // Récupérer le corps de la réponse en texte
    console.error(`Erreur lors de la récupération de l'utilisateur. Statut: ${response.status}. Réponse: ${errorData}`);
        throw new Error("Erreur lors de la récupération de l'utilisateur");
      }

      // Récupération des données de l'utilisateur et conversion au type User
      const user: User = await response.json();
      console.log(`User: ${user}`);
      return user;
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur:", error);
      return null;
    }
  }
}
