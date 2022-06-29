import { reciveAllEntities, reciveAllPromise } from "./DatabaseService";

export const downloadBackup = async (
  filename: string,
  updateProgress: (progress: number) => void
) => {
  console.time("Get all");
  let backupEntities: any = {};
  let tables: string[] = await reciveAllEntities();

  let dataPromises: Promise<any>[] = [];
  tables.forEach((table: string) => {
    dataPromises.push(reciveAllPromise(table));
  });
  await Promise.all(dataPromises).then((values: any[]) => {
    values.forEach((test: any) => {
      backupEntities[test.name] = test.data;
    });
  });
  updateProgress(50);
  console.timeEnd("Get all");

  downloadContent(backupEntities, filename);
  updateProgress(100);
};

const downloadContent = (all: any, fileName: string) => {
  const url = window.URL.createObjectURL(new Blob([JSON.stringify(all)]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName); // 3. Append to html page
  document.body.appendChild(link); // 4. Force download
  link.click(); // 5. Clean up and remove the link
  document.body.removeChild(link);
};
