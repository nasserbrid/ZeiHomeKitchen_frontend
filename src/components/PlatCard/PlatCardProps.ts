import { Plat } from "../../Models/Plat";

export interface PlatCardProps {
  plat: Plat;
  onPlatClick: (idPlat: number) => void;
}
