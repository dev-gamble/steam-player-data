export interface PlayerSummary {
    steamid: string;
    personaname: string;
    profileurl: string;
    avatar: string;
    avatarmedium: string;
    avatarfull: string;
    personastate: number;
    communityvisibilitystate: number;
    profilestate: number;
    lastlogoff: number;
    realname?: string;
    timecreated?: string;
    gameid?: string;
    loccountrycode?: string;
    locstatecode?: string;
    loccityid?: number;
}