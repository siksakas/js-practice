let x = 0;
let remainingSeconds = 60 * 60;

const formatCountdown = (seconds) => {
  const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  return `${hours}:${minutes}:${secs}`;
};

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
const merchant = [
  "            ,-----.",
  "           #,-. ,-.#",
  "          () a   e ()",
  "          (   (_)   )",
  "          #\\_  -  _/#",
  "        ,'   `\"\"\"`    `.",
  "      ,'      \\X/      `.",
  "     /         X     ____\\",
  "    /          v   ,`  v  `,",
  "   /    /         ( <==+==> )"
].join("\n");

//dialogue tree
const dialogueTree = {
  start: {
    "id": "start",
    "text": "What's up?",
    "options": [
      { "response": "I'm running out of time.", "next": "node2" },
      { "response": "Nevermind", "next": "end" }
    ]
  },
  node2: {
    "id": "node2",
    "text": "How much do you need?",
    "options": [
      { "response": "A couple hours.", "next": "node4" },
      { "response": "Nevermind.", "next": "end" }
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
    "text": "Give me ten minutes now and I'll see what I can do.",
    "options": [
      { "response": "Here you go.", "next": "node5", "time": -10*60 },
      { "response": "I'm not paying you!.", "next": "end" }
    ]
  },
  node5: {
    "id": "node5",
    "text": "Yeah I'll get back to you on that.",
    "options": [
      { "response": "What?", "next": "end" },
      { "response": "Hey!", "next": "end" }
    ]
  },
  end: {
    "id": "end",
    "text": "Ok bye.",
    "options": [
      { "response": "(leave)", "next": "node6", "sprite": character2 }
    ]
  },
  node6: {
    "id": "node6",
    "text": "Where should I go?",
    "options": [
      { "response": "Shop.", "next": "store1", "sprite": merchant },
      { "response": "Work.", "next": "end" }
    ]
  },
  store1: {
    "id": "store1",
    "text": "How can I help you?",
    "options": [
      { "response": "I need to borrow some time.", "next": "end" },
      { "response": "What do you have for sale?", "next": "end" },
      { "response": "Nevermind", "next": "node6","sprite": character2 }
    ]
  }
}

//code to run the dialogue
function startTalk() {
  document.getElementById("character").innerHTML = character1;
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
      if (option.time) {
        remainingSeconds += option.time;
        document.getElementById("clock").innerHTML = formatCountdown(remainingSeconds);
      }
      if (option.sprite) {
        document.getElementById("character").innerHTML = option.sprite;
      }
      nextOption(option.next);
    };
    document.body.appendChild(newBox);
  });

  // newBox = document.createElement('button');
  // newBox.innerHTML = dialogueTree[boxId].options[0].response;
  // document.body.appendChild(newBox);
}

window.onload = () => {
  document.getElementById("clock").innerHTML = formatCountdown(remainingSeconds);

  clock = setInterval(() => {
    x++;
    console.log(x);

    if (remainingSeconds > 0) {
      remainingSeconds--;
    }
    document.getElementById("clock").innerHTML = formatCountdown(remainingSeconds);

    if (x == 6) {
      textAppear("I've only got an hour left... I need to borrow some time.");
    }
    if (x == 9) {
      console.log("triggered at x = " + x);
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
  textAppear(dialogueTree[boxId].text);
  renderOptions(boxId);
}