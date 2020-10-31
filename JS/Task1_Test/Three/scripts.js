const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');
story.style.visibility = "hidden";

const arrayOfDataSets =[
  ["Willy the Goblin","Big Daddy","Father Christmas"],
  ["the soup kitchen","Disneyland","the White House"],
  ["spontaneously combusted","melted into a puddle on the sidewalk","turned into a slug and crawled away"]
];

const templateText = "It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day."

function randomValueFromArray(array){
  const numberReturn = Math.ceil(Math.random() * 10) % 2;
  return array[numberReturn];
}

function result() {
  let dataSet = randomValueFromArray(arrayOfDataSets);
  let content =
  templateText.replace(":insertx:", dataSet[0])
    .replace(":inserty:", dataSet[1])
      .replace(":insertz:", dataSet[2]);
  
  if(customName.value !== '') {
    let name = customName.value;
    content = content.replace("Bob", name);
  }

  if(document.getElementById("uk").checked) {
    let temperature =  Math.round((94-32) / 1.8);
    let weight = Math.round(300 / 2.2046);
    
    content = content.replace("94 fahrenheit", temperature.toString() + " centigrade");
    content = content.replace("300 pounds", weight.toString() + " kilograms");
  }

  story.textContent = content;
  story.style.visibility = 'visible';
}

randomize.addEventListener('click', result);
