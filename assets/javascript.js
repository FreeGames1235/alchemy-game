document.addEventListener('DOMContentLoaded', () => {
    const elements = {
        fire: "Fire",
        water: "Water",
        earth: "Earth",
        air: "Air"
    };

    const combinations = {
        "waterwater": "sea",
        "earthearth": "rock",
        "firefire": "enegry",
        "airair": "pressure",
        "airwater": "mist",
        "airearth": "dust",
        "airfire": "smoke",
        "earthfire": "lava",
        "earthwater": "mud",
        "firewater": "steam",
        "seasea": "ocean",
        "oceanocean": "pressure",
        "earthenegry": "earthquake",
        "earthquakeearth": "mountain",
        "lavaair": "stone",
        "earthlava": "volcano",
        "volcanopressure": "eruption",
        "mudstone": "clay",
        "mudplant": "swamp",
        "steamair": "cloud",
        "swampenegry": "life",
        "lifeclay": "human",
        "rockrock": "stone",
        "mountainlava": "volcano",
        "cloudwater": "rain",
        "earthrain": "plant",
        "": "",
        "": "",
    };

    const dropZones = document.querySelectorAll('.drop-zone');
    const resultElement = document.getElementById('resultElement');
    const elementsContainer = document.getElementById('elementsContainer');

    if (!elementsContainer) {
        console.error('elementsContainer is not found in the DOM.');
        return;
    }

    dropZones.forEach(zone => {
        zone.addEventListener('dragover', (event) => {
            event.preventDefault();
        });

        zone.addEventListener('drop', (event) => {
            event.preventDefault();
            const element = event.dataTransfer.getData('text');
            if (elements[element]) {
                zone.innerHTML = `<img src="images/${element}.png" alt="${elements[element]}"><span>${elements[element]}</span>`;
                checkCombination();
            }
        });
    });

    function createDraggableElement(name) {
        console.log(`Creating new element: ${name}`);
        const newElement = document.createElement('div');
        newElement.classList.add('element');
        newElement.setAttribute('draggable', true);
        newElement.setAttribute('data-element', name.toLowerCase());
        newElement.innerHTML = `<img src="images/${name.toLowerCase()}.png" alt="${name}"><span>${name}</span>`;
        
        // Add dragstart event listener
        newElement.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text', event.target.dataset.element);
        });

        elementsContainer.appendChild(newElement);
    }

    // Attach dragstart and click event listeners to existing elements
    document.querySelectorAll('.element').forEach(el => {
        el.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text', event.target.dataset.element);
        });
    });

    function checkCombination() {
        const dropZone1 = document.getElementById('dropZone1').textContent.toLowerCase().trim();
        const dropZone2 = document.getElementById('dropZone2').textContent.toLowerCase().trim();

        if (dropZone1 && dropZone2) {
            console.log(`Combining: ${dropZone1} + ${dropZone2}`);
            const combined = combinations[dropZone1 + dropZone2] || combinations[dropZone2 + dropZone1];
            if (combined) {
                console.log(`Combination result: ${combined}`);
                resultElement.textContent = combined;
                if (!elements[combined.toLowerCase()]) {
                    elements[combined.toLowerCase()] = combined;
                    createDraggableElement(combined);
                }
            } else {
                console.log('No valid combination');
                resultElement.textContent = 'No combination';
            }
        }
    }
});