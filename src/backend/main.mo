import Map "mo:core/Map";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Principal "mo:core/Principal";

actor {
  type Player = {
    score : Nat;
    health : Nat;
    isAlive : Bool;
  };

  let players = Map.empty<Principal, Player>();

  public shared ({ caller }) func getOrCreatePlayer() : async () {
    if (not players.containsKey(caller)) {
      let player : Player = {
        score = 0;
        health = 100;
        isAlive = true;
      };
      players.add(caller, player);
    };
  };

  public shared ({ caller }) func shoot(target : Principal) : async Bool {
    switch (players.get(target)) {
      case (null) {};
      case (?targetPlayer) {
        let newHealth = targetPlayer.health - 25;
        let isAlive = newHealth > 0;
        let updatedTarget : Player = {
          targetPlayer with
          health = newHealth;
          isAlive;
        };
        players.add(target, updatedTarget);

        switch (players.get(caller)) {
          case (null) {};
          case (?callerPlayer) {
            if (updatedTarget.isAlive) {
              return false;
            } else {
              let updatedCaller : Player = {
                callerPlayer with
                score = callerPlayer.score + 100;
              };
              players.add(caller, updatedCaller);
              return true;
            };
          };
        };
      };
    };
    false;
  };

  public shared ({ caller }) func revive() : async () {
    switch (players.get(caller)) {
      case (null) { Runtime.trap("Your actor is not initialized.") };
      case (?player) {
        let updatedPlayer : Player = {
          player with
          health = 100;
          isAlive = true;
        };
        players.add(caller, updatedPlayer);
      };
    };
  };

  public query ({ caller }) func getScore(player : Principal) : async Nat {
    switch (players.get(player)) {
      case (null) { Runtime.trap("Player does not exist") };
      case (?player) { player.score };
    };
  };

  public query ({ caller }) func getAllPlayers() : async [Player] {
    players.values().toArray();
  };
};
