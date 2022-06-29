import Dexie from "dexie";
import { $Esper } from "../components/espers/Esper";
import Relic from "../data/Relic";

export class RelicerDB extends Dexie {
  relics: Dexie.Table<Relic, number>; // number = type of the primkey
  espers: Dexie.Table<$Esper, number>; // number = type of the primkey

  constructor() {
    super("RelicerDB");
    this.version(1).stores({
      relics: "++id, uuid, stars, category, plus, place, mainStat, subStats",
      espers:
        "++id, name, type, level, stars, resonance, image, hp, atk, def, spd, crate, cdmg, acc, resist, relics",
    });

    this.relics = this.table("relics");
    this.espers = this.table("espers");
  }
}
