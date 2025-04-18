import { Plat } from "../../Models/Plat";

export interface PlatCardProps {
  plat: Plat;
  isSelected?: boolean;
  onPlatClick: (idPlat: number) => void;
  onReserverClick: () => void;
  onBackClick:()=>void;
  onToggleSelection?: (idPlat: number) => void;

}
