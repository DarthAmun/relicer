import { RelicerDB } from "../database/RelicerDB";
import { IndexableType } from "dexie";
import { $Esper } from "../components/espers/Esper";

export const reciveAllRelics = (callback: (data: IndexableType[]) => void) => {
  const db = new RelicerDB();
  db.open()
    .then(() => {
      db.table("relics")
        .orderBy("stars")
        .reverse()
        .toArray()
        .then((array) => {
          callback(array);
        });
    })
    .finally(() => {
      db.close();
    });
};

export const saveNewRelic = (data: any) => {
  const db = new RelicerDB();
  db.open()
    .then(() => {
      delete data.id;
      db.table("relics").add(data);
    })
    .finally(() => {
      db.close();
    });
};

export const updateRelic = (data: any) => {
  const db = new RelicerDB();
  db.open()
    .then(() => {
      db.table("relics").update(data.id, data);
    })
    .finally(() => {
      db.close();
    });
};

export const reciveAllEspers = (callback: (data: IndexableType[]) => void) => {
  const db = new RelicerDB();
  db.open()
    .then(() => {
      db.table("espers")
        .orderBy("level")
        .toArray()
        .then((array) => {
          callback(array);
        });
    })
    .finally(() => {
      db.close();
    });
};

export const saveNewEsper = (data: any) => {
  const db = new RelicerDB();
  db.open()
    .then(() => {
      delete data.id;
      db.table("espers").add(data);
    })
    .finally(() => {
      db.close();
    });
};

export const reciveAllEntities = () => {
  const db = new RelicerDB();
  return db
    .open()
    .then(() => {
      let tables: string[] = [];
      db.tables.forEach((table) => tables.push(table.name));
      return tables;
    })
    .finally(() => {
      db.close();
    });
};

export const reciveAllPromise = (tableName: string) => {
  const db = new RelicerDB();
  return db
    .open()
    .then(async () => {
      const data = await db.table(tableName).toArray();
      return { name: tableName, data: data };
    })
    .finally(() => {
      db.close();
    });
};

export const saveNewFromList = (tableName: string, entities: any[]) => {
  const db = new RelicerDB();
  db.open()
    .then(async () => {
      const refinedEntities = (entities as any[]).map((entity: any) => {
        delete entity["id"];
        return { ...entity, filename: entity.sources };
      });
      try {
        const prom = await db.table(tableName).bulkPut(refinedEntities);
        return prom;
      } catch (error) {
        console.log(error);
      }
    })
    .finally(() => {
      db.close();
    });
};

export const deleteDatabase = () => {
  const db = new RelicerDB();
  db.delete();
};