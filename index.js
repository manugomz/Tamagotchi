//------DOM manipulation----------

const buttonSleep = document.getElementById("button-sleep");
const buttonPlay = document.getElementById("button-play");
const buttonEat = document.getElementById("button-eat");
const petImage = document.getElementById('image');
const petMessage = document.getElementById('text');

const petHunger = document.querySelector('.hunger-number')
const petEnergy = document.querySelector('.energy-number')

let energy = 100;
let hunger = 0;
let status;

//-------Pet declaration & functions----

function initPet(pet) {
  const petName = pet;
  let hunger = 100;
  let age = 0;
  petEnergy.textContent = energy;
  petHunger.textContent = hunger;

  return {
    sleep: function () {
      if (energy <= 80) {
        clearInterval(timePass);
        petImage.src = 'assests/dog_sleep.gif';
        petMessage.textContent = `${petName} is sleeping`;
        status = "sleeping";
        age++;
        energy += 20;
        petEnergy.textContent = energy;

        return {
          energy,
          age,
          status,
        };
      } else if (status === 'sleeping') {
        petImage.src = 'assests/dog_start.gif';
        petMessage.textContent = "I just slept";
        petEnergy.textContent = energy;
        return energy;
      } else {
        petImage.src = 'assests/dog_start.gif';
        petMessage.textContent = "I don't need to sleep";
        petEnergy.textContent = energy
        return energy;
      }
    },
    play: function () {
      if (energy > 30) {
        petImage.src = 'assests/dog_play.gif';
        petMessage.textContent = `${petName} is running`;
        status = "running";
        age++;
        energy = energy - 30;
        petEnergy.textContent = energy;
        return {
          energy,
          age,
          status,
        }
      } else {
        petImage.src = 'assests/dog_start.gif';
        petMessage.textContent = "I'm tired";
      }
      ;
    },
    eat: function () {
      if (status !== 'eating' && energy <= 90) {
        petImage.src = 'assests/dog_eat.gif';
        petMessage.textContent = `${petName} is eating`;
        status = "eating";
        age++;
        energy = energy + 10;
        petEnergy.textContent = energy;
        return {
          energy,
          age,
          status,
        };
      } else if (energy <= 90) {
        petImage.src = 'assests/dog_start.gif';
        petMessage.textContent = "I'm full";
        petEnergy.textContent = energy
        return energy;
      } else {
        petImage.src = 'assests/dog_start.gif';
        petMessage.textContent = "I just ate";
        petEnergy.textContent = energy
        return energy;
      }
    },
  };
}

const myPet = initPet("Dog");

buttonSleep.addEventListener('click', () => myPet.sleep());
buttonPlay.addEventListener('click', () => myPet.play());
buttonEat.addEventListener('click', () => myPet.eat());


let timePass = setInterval(() => {
  energy = energy - 1;
  petEnergy.textContent = energy
}, 2000);

let sleeping = setInterval(() => {
  energy = energy++;
  petEnergy.textContent = energy
}, 1000);


