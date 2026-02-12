//ascii art
const character1 = [
  "friend:",
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
  "you:",
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
const door = [
  "______________",
  "|\\ ___________ /|",
  "| |  _ _ _ _  | |",
  "| | | | | | | | |",
  "| | |-+-+-+-| | |",
  "| | |-+-+=+%| | |",
  "| | |_|_|_|_| | |",
  "| |    ___    | |",
  "| |   [___] ()| |",
  "| |         ||| |",
  "| |         ()| |",
  "| |           | |",
  "| |           | |",
  "| |           | |",
  "|_|___________|_| ejm"
].join("\n");

//dialogue tree
const dialogueTree = {
  start: {
    "id": "start",
    "text": "What's up?",
    "options": [
      { "response": "What time is it?", "next": "node2" },
      { "response": "Nevermind.", "next": "end" }
    ]
  },
  node2: {
    "id": "node2",
    "text": "Why should I tell you?",
    "options": [
      { "response": "I just wanna know the time.", "next": "node4" },
      { "response": "You're no help... (leave)", "next": "end" }
    ]
  },
  node3: {
    "id": "node3",
    "text": "Oh, I see. Well, have a good day!",
    "options": [
      { "response": "You too.", "next": "end" }
    ]
  },
  node4: {
    "id": "node4",
    "text": "I'll tell you for $20.",
    "options": [
      { "response": "I can only give ten.", "next": "node5", "cost": 10 },
      { "response": "I don't have any money.", "next": "end" }
    ]
  },
  node5: {
    "id": "node5",
    "text": "I'll tell you the current minute.",
    "options": [
      { "response": "What?", "next": "end" },
      { "response": "Give me back the money!", "next": "end" }
    ]
  },
  end: {
    "id": "end",
    "text": "Ok bye.",
    "options": [
      { "response": "I have another question", "next": "start" }
    ]
  }
}

//variables
let money = 10;


//code to run the dialogue
function startTalk() {
  document.getElementById("character").innerHTML = character1;
  showMoney();
  nextOption("start");
}

function textAppear(str) {
  dialogue = document.getElementById('dialogue-box');
  i = 1;

  const interval = setInterval(() => {
    dialogue.innerHTML = str.substring(0, i);
    i++;
    if (i > str.length) {
      clearInterval(interval)
    }
  }, 30)
}

function renderOptions(boxId) {
  dialogueTree[boxId].options.forEach(option => {
    newBox = document.createElement('button');
    newBox.innerHTML = option.response;
    newBox.className = "option-btn";
    newBox.onclick = () => {
      //if theres a "cost" property on the option subtracts that
      if (option.cost) {
        updateMoney(-option.cost);
      }
      nextOption(option.next);
    };
    document.body.appendChild(newBox);
  });

  // newBox = document.createElement('button');
  // newBox.innerHTML = dialogueTree[boxId].options[0].response;
  // document.body.appendChild(newBox);
  showMoney();
}

window.onload = () => {
  let x = 0;
  clock = setInterval(() => {
  x++;
  console.log(x);

  if (x < 5) {
    let date = new Date()
    document.getElementById("clock").innerHTML = date.toLocaleTimeString();
  }
  if (x == 6) {
    textAppear('Why did the clock stop working? Better ask my friend.')
  }
  if (x==9){
    console.log("triggered at x = " + x);
    clearInterval(clock);
    document.getElementById("character").innerHTML = door;
    enterButton = document.createElement("button");
    enterButton.innerHTML = "Enter";
    enterButton.className = "option-btn";
    enterButton.onclick = startTalk;
    document.body.appendChild(enterButton);
  }
}, 1000)
  
}

function nextOption(boxId) {
  Array.from(document.getElementsByClassName("option-btn")).forEach(btn => btn.remove());
  document.getElementById("money-display").remove();
  textAppear(dialogueTree[boxId].text);
  renderOptions(boxId);
}

function showMoney() {
  moneyDisplay = document.createElement("p");
  moneyDisplay.innerHTML = "Money: $" + money;
  moneyDisplay.id = "money-display";
  document.body.appendChild(moneyDisplay);
}

updateMoney = (amount) => {
  money += amount;
  document.getElementById("money-display").remove();
  showMoney();
}
