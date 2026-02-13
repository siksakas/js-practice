let x = 0;
let remainingSeconds = 60 * 60;
//TODO: Create a log of time transactions and display it in the UI
//TODO: Inventory system for items that can be traded for time
//TODO: Certain dialogue options only appear if you have certain items in your inventory or have made certain choices in the past
let inventory = ["Watch"];
// bug: clicking the option before it fully runs appeartext with bug it out.
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
const officer = [
  "officer:",
  "                ,",
  "       __  _.-\"` `\'-.",
  "      /||\\'._ __{}_(",
  "      ||||  |'--.__\\",
  "      |  L.(   ^_\\^",
  "      \\ .-' |   _ |",
  "      | |   )\\___/",
  "      |  \\-'`:._]",
  "  jgs \\__/;      '-.",
].join("\n");
const worker = [
  "                  _A",
  "                .'`\"'`,",
  "               /   , , \\",
  "              |   <\\^/> |",
  "              |  < (_) >|",
  "              /====\\",
  "             (.--._ _.--.)",
  "              |\\  -`\\- /|",
  "              |(_.- >-.)|",
  "              \\__.-'^'._/",
  "               |\\   .  /",
  "            _.'\\ '----'|'-.",
  "        _.-'  O ;-.__.' \\O `o.",
  "       /o \\      \\/-.-\\/|     \\",
  "   jgs|    ;,     '.|\\| /"
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
      { "response": "Here you go.", "next": "node5", "time": -10 * 60 },
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
      { "response": "Work.", "next": "work1", "sprite": officer },
      { "response": "City.", "next": "CITY" }
    ]
  },
  work1: {
    "id": "work1",
    "text": "You're running late. Do you have a good excuse?",
    "options": [
      { "response": "Missed the bus this morning.", "next": "work2" },
      { "response": "Can I get an advance on my pay?", "next": "work3", "time": 2 * 60 }
    ]
  },
  work2: {
    "id": "work2",
    "text": "I don't believe you. You're fired!",
    "options": [
      { "response": "But I have a good excuse!", "next": "end" },
      { "response": "I'll be more careful next time.", "next": "end" }
    ]
  },
  work3: {
    "id": "work3",
    "text": "Just don't let it happen again.",
    "options": [
      { "response": "Can I have a little more?", "next": "end" },
      { "response": "I'll be more careful next time.", "next": "end" }
    ]
  },
  store1: {
    "id": "store1",
    "text": "What are you looking for?",
    "options": [
      { "response": "I need to borrow some time.", "next": "storeLoan1" },
      { "response": "What do you have for sale?", "next": "storeGoods1" },
      { "response": "Why is everyone paying with time?", "next": "storeLore1" },
      { "response": "Nevermind", "next": "node6", "sprite": character2 }
    ]
  },
  storeLore1: {
    "id": "storeLore1",
    "text": "No idea!",
    "options": [
      { "response": "So the poor literally die younger?", "next": "storeLore2" },
      { "response": "I'm running out of time.", "next": "storeLoan1" }
    ]
  },
  storeLore2: {
    "id": "storeLore2",
    "text": "Yeah not me though!",
    "options": [
      { "response": "I just need enough time to survive today.", "next": "storeLoan1" },
      { "response": "What can I buy instead?", "next": "storeGoods1" }
    ]
  },
  storeLoan1: {
    "id": "storeLoan1",
    "text": "I can give you 30 minutes now. Interest is 45 minutes.",
    "options": [
      { "response": "Deal.", "next": "storeLoanDeal", "time": 30 * 60 },
      { "response": "Any safer option?", "next": "storeLoan2" },
      { "response": "No thanks.", "next": "store1" }
    ]
  },
  storeLoan2: {
    "id": "storeLoan2",
    "text": "If you've got something valuable to trade, I can give you time for it.",
    "options": [
      { "response": "Take my watch.", "next": "storeMemoryDeal", "time": 20 * 60, "removeItem": "Watch", "requiresItem": "Watch" },
      { "response": "I like the previous deal better.", "next": "storeLoan1" },
      { "response": "Let me see what's for sale.", "next": "storeGoods1" }
    ]
  },
  storeLoanDeal: {
    "id": "storeLoanDeal",
    "text": "Don't be late repaying me.",
    "options": [
      { "response": "I'll try.", "next": "node6", "sprite": character2 },
      { "response": "What else can I do here?", "next": "store1" }
    ]
  },
  storeMemoryDeal: {
    "id": "storeMemoryDeal",
    "text": "Done.",
    "options": [
      { "response": "I can live with that.", "next": "node6", "sprite": character2 },
      { "response": "Tell me what else you sell.", "next": "storeGoods1" }
    ]
  },
  storeGoods1: {
    "id": "storeGoods1",
    "text": "Here's what I have for sale.",
    "options": [
      { "response": "Train ticket.", "next": "storeGoodsTransit", "time": -5 * 60,"addItem":"Ticket" },
      { "response": "Tea.", "next": "storeGoodsTea", "time": -1 * 60 },
      { "response": "Frozen food.", "next": "storeGoodsFood", "time": -5 * 60 },
      { "response": "Back.", "next": "store1" }
    ]
  },
  storeGoodsTransit: {
    "id": "storeGoodsTransit",
    "text": "You can take this train ticket to leave the city.",
    "options": [
      { "response": "Perfect.", "next": "storeGoods1" },
      { "response": "I'm heading out.", "next": "node6", "sprite": character2 }
    ]
  },
  storeGoodsTea: {
    "id": "storeGoodsTea",
    "text": "Green tea is pretty good",
    "options": [
      { "response": "Let me see what else you have.", "next": "storeGoods1" },
      { "response": "Thanks, I'm leaving.", "next": "node6", "sprite": character2 }
    ]
  },
  storeGoodsFood: {
    "id": "storeGoodsFood",
    "text": "This ones my favorite.",
    "options": [
      { "response": "Thanks!", "next": "node6", "sprite": character2 },
      { "response": "Maybe I should buy something else.", "next": "storeGoods1" }
    ]
  },
  CITY: {
    "id": "CITY",
    "text": "Where should I go now?",
    "options": [
      { "response": "Train station", "next": "train", "sprite": worker },
      { "response": "Maybe I should buy something else.", "next": "storeGoods1" }
    ]
  },
  train: {
    "id": "CITY",
    "text": "You need a ticket to board.",
    "options": [
      { "response": "Train station", "next": "node6","requiresItem":"Ticket"},
      { "response": "Maybe I should buy something else.", "next": "storeGoods1" }
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
    if (!option.requiresItem || hasItem(option.requiresItem)) {
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
        if (option.removeItem) {
          removeInventory(option.removeItem);
          createInventoryUI();
        }
        if (option.addItem){
          addInventory(option.addItem);
          createInventoryUI();
        }
        nextOption(option.next);
      };
      document.body.appendChild(newBox);
    }
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
      createInventoryUI();
    }
  }, 1000)

}

function nextOption(boxId) {
  Array.from(document.getElementsByClassName("option-btn")).forEach(btn => btn.remove());
  textAppear(dialogueTree[boxId].text);
  renderOptions(boxId);
}

function addInventory(item) {
  inventory.push(item);
}

function hasItem(item) {
  return inventory.includes(item);
}

function removeInventory(item) {
  inventory = inventory.filter(i => i !== item);
}

function createInventoryUI() {
  const inventoryDiv = document.getElementById("inventory");
  inventoryDiv.innerHTML = "Inventory: " + inventory.join(", ");
}