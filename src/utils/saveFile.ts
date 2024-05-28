import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

const dataURLtoFile = (dataurl: string, filename: string) => {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)![1],
    bstr = atob(arr[arr.length - 1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

const storeFile = async (fileName: string, file: File) => {
  const uploadDir = path.join(process.cwd(), "public/files");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const filePath = path.join(uploadDir, fileName);

  const fileContents = await file.arrayBuffer();

  fs.writeFileSync(filePath, Buffer.from(fileContents));
};

const saveFile = async (b64File: string): Promise<string> => {
  const type = b64File.split(";")[0].split("/")[1];

  const fileId = uuidv4();
  const fileName = `${fileId}.${type}`;

  const file = dataURLtoFile(b64File, fileName);

  await storeFile(fileName, file);

  return fileName;
};

export { saveFile };
