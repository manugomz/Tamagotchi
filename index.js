//------DOM manipulation----------

const device = document.querySelector(".device");
const buttonSleep = document.getElementById("button-sleep");
const buttonRun = document.getElementById("button-run");
const buttonEat = document.getElementById("button-eat");
const petImage = document.getElementById('image');
const petMessage = document.getElementById('text');

const petHunger = document.querySelector('.hunger-number');
const petEnergy = document.querySelector('.energy-number');
const energyBar = document.querySelector('.energy');
const hungerBar = document.querySelector('.hunger');

const petOptions = document.querySelectorAll('.pet-option');
const continueBtn = document.getElementById('continue');

const selectionWdw = document.querySelector(".selector-window");
const restartBtn = document.querySelector(".restart");
const petNameInput = document.getElementById('pet-name');

let energy = 100;
let energyChange;
let hunger = 100;
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
  timePass();
})

//------------------------Restarting game----------------------------

//! Edit confirmation window
restartBtn.addEventListener("click", () => {
  let confirmation = confirm("Are you sure you want to restart?");
  if (confirmation) {
    selectionWdw.classList.remove("hidden");
    device.classList.add("hidden");
    initialStatus();
  }
})

//-----------------Pet declaration & functions--------------

function initPet() {
  petEnergy.textContent = energy;
  petHunger.textContent = hunger;

  return {
    sleep: function () {
      if (energy <= 80) {
        /*setInterval setting & clearing------*/
        energyChangePause();
        sleeping();
        /*----------------------------------- */
        petImage.src = `assests/${petType}/${petType}-sleep.gif`;
        petMessage.textContent = `${petName} is sleeping`;
        status = "sleeping";
        return {
          energy,
          status,
        };
      } else if (status === 'sleeping') {
        defaultStatus();
        petImage.src = `assests/${petType}/${petType}-start.gif`;
        petMessage.textContent = "I just slept";
        return energy;
      } else {
        defaultStatus();
        petImage.src = `assests/${petType}/${petType}-start.gif`;
        petMessage.textContent = "I don't need to sleep";
        return energy;
      }
    },
    run: function () {
      if (energy > 30) {
        energyChangePause();
        running();
        petImage.src = `assests/${petType}/${petType}-run.gif`;
        petMessage.textContent = `${petName} is running`;
        status = "running";
        return {
          energy,
          status,
        }
      } else {
        defaultStatus();
        petImage.src = `assests/${petType}/${petType}-start.gif`;
        petMessage.textContent = "I'm tired";
      }
      ;
    },
    eat: function () {
      if (status !== 'eating' && hunger <= 90) {
        /* setInterval setting & clearing------*/
        energyChangePause();
        eating();
        /*----------------------------------- */
        petImage.src = `assests/${petType}/${petType}-eat.gif`;
        petMessage.textContent = `${petName} is eating`;
        status = "eating";
        return {
          energy,
          hunger,
          status,
        };
      } else if (hunger >= 90) {
        petImage.src = `assests/${petType}/${petType}-start.gif`;
        petMessage.textContent = "I'm full";
        defaultStatus();
        return { energy, hunger };
      } else {
        petImage.src = `assests/${petType}/${petType}-start.gif`;
        petMessage.textContent = "I just ate";
        defaultStatus();
        return { energy, hunger };
      }
    },
  };
}

const myPet = initPet();

buttonSleep.addEventListener('click', () => myPet.sleep());
buttonRun.addEventListener('click', () => myPet.run());
buttonEat.addEventListener('click', () => myPet.eat());


/*STATUS FUNCTIONS*/
function initialStatus() {
  petMessage.textContent = "";
  energy = 100;
  hunger = 100;
  buttonEat.disabled = false;
  buttonSleep.disabled = false;
  buttonRun.disabled = false;
}

function timePass() {
  energyChange = setInterval(() => {
    if (energy > 1 && hunger > 1) {
      energy = energy - 1;
      hunger = hunger - 0.5;
      visualStats();
    } else {
      petDies();
    }
  }, 2000);
}

function energyChangePause() {
  clearInterval(energyChange);
}

function defaultStatus() {
  energyChangePause();
  timePass();
}

function sleeping() {
  energyChange = setInterval(() => {
    if (energy > 99) {
      petImage.src = `assests/${petType}/${petType}-start.gif`;
      petMessage.textContent = "I'm ready to play!";
      defaultStatus();
    } else if (energy > 1 && hunger > 1) {
      energy = energy + 1;
      hunger = hunger - 0.25;
      visualStats();
    }
    else {
      petDies;
    }
  }, 1000);
}

function running() {
  energyChange = setInterval(() => {
    if (energy > 1 && hunger > 1) {
      energy = energy - 3;
      hunger = hunger - 1;
      visualStats();
    }
    else {
      petDies;
    }
  }, 1000);
}

function eating() {
  energyChange = setInterval(() => {
    if (energy < 100 && hunger < 97) {
      energy = energy + 1;
      hunger = hunger + 3;
      visualStats();
    } else if (energy === 100 && hunger < 100) {
      hunger = hunger + 1;
    }
    else {
      petImage.src = `assests/${petType}/${petType}-start.gif`;
      petMessage.textContent = "I'm full, let's do something!";
      defaultStatus();
    }
  }, 1000);
}

function petDies() {
  petImage.src = `assests/dead.png`;
  energy = 0;
  hunger = 0;
  petMessage.textContent = `${petName} died :(`
  visualStats();
  buttonEat.disabled = true;
  buttonSleep.disabled = true;
  buttonRun.disabled = true;
}

function visualStats() {
  petEnergy.textContent = energy;
  energyBar.style.width = `${energy}%`;
  petHunger.textContent = Math.round(hunger);
  hungerBar.style.width = `${hunger}%`;
}