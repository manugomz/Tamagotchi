//------DOM manipulation----------

const buttonSleep = document.getElementById("button-sleep");
const buttonPlay = document.getElementById("button-play");
const buttonEat = document.getElementById("button-eat");
const petImage = document.getElementById('image');
const petMessage = document.getElementById('text');
const petEnergy = document.getElementById('energy-lvl');



//-------Pet declaration & functions----

function initPet(pet) {
  const petName = pet;
  let energy = 100;
  let age = 0;
  let status = "";
  petEnergy.textContent=`Energy:${energy}`;

  return {
    sleep: function () {
      if (energy <= 80) {
        petImage.src='assests/dog_sleep.png';
        petMessage.textContent= `${petName} is sleeping`;
        status = "sleeping";
        age++;
        energy += 20;
        petEnergy.textContent=`Energy:${energy}`;

        return {
          energy,
          age,
          status,
        };
      } else if(status==='sleeping'){
        petImage.src='assests/dog_start.png';
        petMessage.textContent= "I just slept";
        petEnergy.textContent=`Energy:${energy}`
        return energy;
      } else {
        petImage.src='assests/dog_start.png';
        petMessage.textContent= "I don't need to sleep";
        petEnergy.textContent=`Energy:${energy}`
        return energy;
      }
    },
    play: function () {
      if (energy>30){
      petImage.src='assests/dog_play.png';
      petMessage.textContent= `${petName} is running`;
      status = "running";
      age++;
      energy = energy - 30;
      petEnergy.textContent=`Energy:${energy}`;
        return {
          energy,
          age,
          status,
        }
      } else{
        petImage.src='assests/dog_start.png';
        petMessage.textContent= "I'm tired";
      }
      ;
    },
    eat: function () {
      if(status!== 'eating' && energy<=90){
        petImage.src='assests/dog_eat.png';
        petMessage.textContent= `${petName} is eating`;
        status = "eating";
        age++;
        energy = energy + 10;
        petEnergy.textContent=`Energy:${energy}`;
        return {
          energy,
          age,
          status,
        };
      }else if(energy<=90){
        petImage.src='assests/dog_start.png';
        petMessage.textContent= "I'm full";
        petEnergy.textContent=`Energy:${energy}`
        return energy;
      }else{
        petImage.src='assests/dog_start.png';
        petMessage.textContent= "I just ate";
        petEnergy.textContent=`Energy:${energy}`
        return energy;
      }
      
    },
  };
}

const myPet = initPet("Dog");


buttonSleep.addEventListener('click',()=>myPet.sleep());
buttonPlay.addEventListener('click',()=>myPet.play());
buttonEat.addEventListener('click',()=>myPet.eat());

