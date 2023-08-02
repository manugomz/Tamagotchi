//------DOM manipulation----------

const buttonSleep = document.getElementById("button-sleep");
const buttonPlay = document.getElementById("button-play");
const buttonEat = document.getElementById("button-eat");
const petImage = document.getElementById('image');
const petMessage = document.getElementById('text');

const petHunger = document.querySelector('.hunger-number');
const petEnergy = document.querySelector('.energy-number');

const petOptions = document.querySelectorAll('.pet-option');
const continueBtn = document.getElementById('continue');

const selectionWdw = document.querySelector(".selector-window");
const device = document.querySelector(".device");
const restartBtn = document.querySelector(".restart");
const petNameInput = document.getElementById('pet-name');

let energy = 100;
let hunger = 0;
let status;
let petName = "";
let petType = "";

//----------Pet picking and initializing--------------------

const pickPet = (position) => {
  type = petOptions[position].textContent;
  petOptions.forEach(x => x.classList.remove('chosen'));
  petOptions[position].classList.toggle('chosen');
}

petOptions[0].addEventListener("click", () => pickPet(0));
petOptions[1].addEventListener("click", () => pickPet(1));
petOptions[2].addEventListener("click", () => pickPet(2));
petOptions[3].addEventListener("click", () => pickPet(3));

continueBtn.addEventListener("click", () => {
  petName = petNameInput.value;
  petType = document.querySelector('.chosen').id;
  selectionWdw.classList.add("hidden");
  device.classList.remove("hidden");
  petImage.src = `assests/${petType}/${petType}-start.gif`;
  energy = 100;
  hunger = 50;
})

//------------------------Restarting game----------------------------

restartBtn.addEventListener("click", () => {
  selectionWdw.classList.remove("hidden");
  device.classList.add("hidden");
  petMessage.textContent = "";
})

//-----------------Pet declaration & functions--------------

function initPet() {

  let hunger = 100;
  let age = 0;
  petEnergy.textContent = energy;
  petHunger.textContent = hunger;

  return {
    sleep: function () {
      if (energy <= 80) {
        clearInterval(timePass);
        petImage.src = `assests/${petType}/${petType}-sleep.gif`;
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
        petImage.src = `assests/${petType}/${petType}-start.gif`;
        petMessage.textContent = "I just slept";
        petEnergy.textContent = energy;
        return energy;
      } else {
        petImage.src = `assests/${petType}/${petType}-start.gif`;
        petMessage.textContent = "I don't need to sleep";
        petEnergy.textContent = energy
        return energy;
      }
    },
    play: function () {
      if (energy > 30) {
        petImage.src = `assests/${petType}/${petType}-run.gif`;
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
        petImage.src = `assests/${petType}/${petType}-start.gif`;
        petMessage.textContent = "I'm tired";
      }
      ;
    },
    eat: function () {
      if (status !== 'eating' && energy <= 90) {
        petImage.src = `assests/${petType}/${petType}-eat.gif`;
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
        petImage.src = `assests/${petType}/${petType}-start.gif`;
        petMessage.textContent = "I'm full";
        petEnergy.textContent = energy
        return energy;
      } else {
        petImage.src = `assests/${petType}/${petType}-start.gif`;
        petMessage.textContent = "I just ate";
        petEnergy.textContent = energy
        return energy;
      }
    },
  };
}

const myPet = initPet();

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


