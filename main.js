import { character1, character2 } from "./asciiArt.js";


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
    "text": "Ok bye.",
    "options": [
      { "response": "I have another question", "next": "start" }
    ]
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
    newBox.className = "option-btn";
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
  Array.from(document.getElementsByClassName("option-btn")).forEach(btn => btn.remove());
  textAppear(dialogueTree[boxId].text);
  renderOptions(boxId);
}