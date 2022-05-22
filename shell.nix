{ pkgs ? import <nixpkgs> { } }:

let
  mkShell = pkgs.mkShell;
in
mkShell {
  buildInputs = with pkgs; [
    deno

    # Cute prompt
    starship
  ];

  shellHook = ''
    eval "$(starship init bash)"
  '';
}
