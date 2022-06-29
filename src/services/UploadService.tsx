import { FileType } from "rsuite/esm/Uploader";
import { saveNewFromList } from "./DatabaseService";

export const importFile = (file: FileType) => {
  readFile(file, scanImportedJson);
};

const readFile = (file: FileType, callback: (json: any) => void) => {
  if (file.blobFile) {
    let fileReader = new FileReader();
    fileReader.onloadend = function () {
      const content = fileReader.result;
      if (content !== null) {
        let json = JSON.parse(content.toString());
        console.log("Json loaded from " + file.name);
        callback(json);
        console.log("---------");
      }
    };
    fileReader.readAsText(file.blobFile);
  }
};

const scanImportedJson = (json: any) => {
  let listOfNewEntities: { tableName: string; newEntitiy: any }[] = [];
  for (const [key, value] of Object.entries(json)) {
    if (Array.isArray(value)) {
      for (let obj of value) {
        listOfNewEntities = [
          ...listOfNewEntities,
          { tableName: key, newEntitiy: obj },
        ];
      }
    }
  }
  listOfNewEntities = versionFilter(listOfNewEntities);
  saveInDB(listOfNewEntities);
};

const saveInDB = async (
  listOfNewEntities: { tableName: string; newEntitiy: any }[]
) => {
  let listOfNew = [...listOfNewEntities];
  while (listOfNew.length > 0) {
    let newTableName = listOfNew[0].tableName;
    let bulkList: any[] = listOfNew
      .filter((newEntitiy) => newEntitiy.tableName === newTableName)
      .map((entity: { tableName: string; newEntitiy: any }) => {
        return entity.newEntitiy;
      });
    console.log(newTableName, bulkList);
    await saveNewFromList(newTableName, bulkList);
    listOfNew = listOfNew.filter((entity) => entity.tableName !== newTableName);
  }
  console.log("Done saving");
};

const versionFilter = (
  listOfNewEntities: { tableName: string; newEntitiy: any }[]
): { tableName: string; newEntitiy: any }[] => {
  let updatedEntities: { tableName: string; newEntitiy: any }[] = [];
  for (let entity of listOfNewEntities) {
    updatedEntities.push(entity);
  }
  return updatedEntities;
};
