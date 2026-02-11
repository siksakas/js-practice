const character1 = [
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
].join("\n")

const character2 = [
  "           .---.",
  "         /` ___|`\\",
  "         |_/    \\|",
  "         (  -/-  )",
  "          \\_ - _/",
  "         .-'|_|'-.",
  "        /         \\",
  "       /     O     \\",
  "      / _____!_____ \\",
  "     /.-------------.\\"
].join("\n")

window.onload = () => {
  document.getElementById("character").innerHTML = character2;
}

function talk() {
  document.getElementById("character").innerHTML = character1;
  textAppear("blah blah");
}

function textAppear(str){
  dialogue = document.getElementById('dialogue-box');
  i = 1;

  const interval = setInterval(()=>{
    dialogue.innerHTML = str.substring(0,i)
    i++;
    if(i>str.length){
      clearInterval(interval)
    }
  },50)
}