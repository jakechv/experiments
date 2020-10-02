{ pkgs ? import <nixpkgs> { } }:
with pkgs;
let
  inherit (lib) optional optionals;
  nodejs = nodejs-13_x;

in pkgs.mkShell {
  buildInputs =
    [ nodejs (with nodePackages; [ nodejs bash-language-server ]) python ];
}
