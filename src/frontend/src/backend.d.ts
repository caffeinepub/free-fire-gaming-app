import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Player {
    score: bigint;
    isAlive: boolean;
    health: bigint;
}
export interface backendInterface {
    getAllPlayers(): Promise<Array<Player>>;
    getOrCreatePlayer(): Promise<void>;
    getScore(player: Principal): Promise<bigint>;
    revive(): Promise<void>;
    shoot(target: Principal): Promise<boolean>;
}
