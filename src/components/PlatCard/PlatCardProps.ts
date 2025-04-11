import { Plat } from "../../Models/Plat";

export interface PlatCardProps {
  plat: Plat;
  onPlatClick: (IdPlat: number) => void;
  onReserverClick: () => void;
  onBackClick:()=>void;

}
