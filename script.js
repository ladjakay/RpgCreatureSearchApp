const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const creatureName = document.getElementById("creature-name");
const creatureId = document.getElementById("creature-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

const fetchCreature = async () => {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) return;

  try {
    const res = await fetch(`https://rpg-creature-api.freecodecamp.rocks/api/creature/${query}`);
    if (!res.ok) {
      throw new Error("Creature not found");
    }
    const data = await res.json();
    
    // Set Creature Info
    creatureName.textContent = data.name.toUpperCase();
    creatureId.textContent = `#${data.id}`;
    weight.textContent = `Weight: ${data.weight}`;
    height.textContent = `Height: ${data.height}`;

    // Clear and set Types
    types.innerHTML = "";
    data.types.forEach((t) => {
      const typeName = (typeof t === "string" ? t : t.type ? t.type.name : t.name || "").toUpperCase();
      const typeSpan = document.createElement("span");
      typeSpan.textContent = typeName;
      types.appendChild(typeSpan);
    });

    // Set Stats
    const statsMap = {};
    data.stats.forEach((s) => {
      const name = s.name || (s.stat ? s.stat.name : "");
      statsMap[name.toLowerCase().replace("-", "")] = s.base_stat;
    });

    hp.textContent = statsMap.hp ?? data.stats[0]?.base_stat;
    attack.textContent = statsMap.attack ?? data.stats[1]?.base_stat;
    defense.textContent = statsMap.defense ?? data.stats[2]?.base_stat;
    specialAttack.textContent = statsMap.specialattack ?? data.stats[3]?.base_stat;
    specialDefense.textContent = statsMap.specialdefense ?? data.stats[4]?.base_stat;
    speed.textContent = statsMap.speed ?? data.stats[5]?.base_stat;

  } catch (err) {
    alert("Creature not found");
  }
};

searchButton.addEventListener("click", fetchCreature);
