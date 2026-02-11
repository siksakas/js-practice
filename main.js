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
const dialogueTree = {
  start: {
    "id": "start",
    "text": "Hello, how are you today?",
    "options": [
      { "response": "I'm good, thanks!", "next": "node2" },
      { "response": "A little busy, actually.", "next": "node3" }
    ]
  },
  node2: {
    "id": "node2",
    "text": "That's wonderful to hear!",
    "options": [
      { "response": "Goodbye.", "next": "end" }
    ]
  },
  node3: {
    "id": "node3",
    "text": "Oh, I see. Well, have a good day!",
    "options": [
      { "response": "You too.", "next": "end" }
    ]
  },
  end: {
    "id": "end",
    "text": "Conversation finished.",
    "options": []
  }
}

function startTalk() {
  document.getElementById("character").innerHTML = character1;
  nextOption("start");
}

function textAppear(str){
  dialogue = document.getElementById('dialogue-box');
  i = 1;

  const interval = setInterval(()=>{
    dialogue.innerHTML = str.substring(0,i);
    i++;
    if(i>str.length){
      clearInterval(interval)
    }
  },50)
}

function renderOptions(boxId){
  dialogueTree[boxId].options.forEach(option => {
    newBox = document.createElement('button');
    newBox.innerHTML = option.response;
    newBox.id = "btn";
    newBox.onclick = () => nextOption(option.next);
    document.body.appendChild(newBox);
  });
  // newBox = document.createElement('button');
  // newBox.innerHTML = dialogueTree[boxId].options[0].response;
  // document.body.appendChild(newBox);
}

window.onload = () => {
  document.getElementById("character").innerHTML = character2;
  
}

function nextOption(boxId){
  document.getElementById("btn").remove();
  textAppear(dialogueTree[boxId].text);
  console.log('went thru')
  renderOptions(boxId);
}