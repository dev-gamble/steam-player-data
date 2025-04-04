export interface PlayerSummary {
    steamid: string | undefined;
    personaname: string;
    profileurl: string;
    avatar: string;
    avatarmedium: string;
    avatarfull: string;
    loccountrycode?: string;
    locstatecode?: string;
    loccityid?: number;
}