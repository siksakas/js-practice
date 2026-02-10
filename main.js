const character1 = [
  "character 1:",
  "          .---.",
  "         / __ /\\",
  "        | /  `\\ |",
  "        \\| . . |/",
  "        (   _\\  )",
  "         |  -  |",
  "         \\  .  /",
  "         |'---'|",
  "        /'. _ .'\\",
  "     .-`-._|_|_.-`-.",
  "    /`    \\   /     `\\"
].join("\n")

window.onload = () => {
  document.getElementById("character").innerHTML = character1;
}