import { $Esper, EsperType } from "../components/espers/Esper";
import Relic, {
  $Stat,
  RelicSubStats,
  RelicCategory,
  RelicPlace,
  RelicMainStats,
} from "../data/Relic";

const getRandomArbitrary = (min: number, max: number) => {
  return Math.round(Math.random() * (max - min) + min);
};

function randomEnum<T>(anEnum: T): T[keyof T] {
  const enumValues = Object.keys(anEnum)
    .map((n) => Number.parseInt(n))
    .filter((n) => !Number.isNaN(n)) as unknown as T[keyof T][];
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  const randomEnumValue = enumValues[randomIndex];
  return randomEnumValue;
}

export const generateSubStats = () => {
  const amount = getRandomArbitrary(1, 4);
  let substats: $Stat[] = [];
  for (let i = 0; i < amount; i++) {
    let newStat: $Stat = {
      type: getRandomArbitrary(0, RelicSubStats.length),
      bonus: getRandomArbitrary(1, 4),
      isAdded: !!getRandomArbitrary(0, 1),
    };
    substats.push(newStat);
  }
  return substats;
};

export const generateRelics = (amount: number) => {
  let relics: Relic[] = [];
  for (let i = 0; i < amount; i++) {
    let newRelic: Relic = {
      id: 0,
      uuid: "",
      stars: getRandomArbitrary(2, 5),
      category: randomEnum(RelicCategory),
      plus: getRandomArbitrary(0, 12),
      place: randomEnum(RelicPlace),
      mainStat: {
        type: getRandomArbitrary(0, RelicMainStats.length),
      },
      subStats: generateSubStats(),
    };
    relics.push(newRelic);
  }
  return relics;
};

export const generateEspers = (amount: number) => {
  let erspers: $Esper[] = [];
  for (let i = 0; i < amount; i++) {
    let newEsper: $Esper = {
      name: "Test",
      type: randomEnum(EsperType),
      level: getRandomArbitrary(1, 60),
      stars: getRandomArbitrary(2, 6),
      resonance: getRandomArbitrary(0, 6),
      image: "https://playdislyte.com/wp-content/uploads/2022/06/Ahmed-Geb.png",

      hp: getRandomArbitrary(200, 1200),
      atk: getRandomArbitrary(200, 1200),
      def: getRandomArbitrary(200, 1200),
      spd: getRandomArbitrary(60, 120),
      crate: getRandomArbitrary(0, 100),
      cdmg: getRandomArbitrary(0, 100),
      acc: getRandomArbitrary(0, 100),
      resist: getRandomArbitrary(0, 100),

      relics: [],
    };
    erspers.push(newEsper);
  }
  return erspers;
};
