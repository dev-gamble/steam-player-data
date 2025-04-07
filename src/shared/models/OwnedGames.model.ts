import { Game } from './Game.model';

export interface OwnedGames {
    game_count: number;
    games: Game[];
}