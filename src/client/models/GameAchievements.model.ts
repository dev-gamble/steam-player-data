import { Achievement } from "./Achievement.model";

export interface GameAchievements {
    gameName: string;
    achievements: Achievement[];
}