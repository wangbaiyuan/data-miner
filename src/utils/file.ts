import fs from 'fs';
import path from 'path';

export const save = (content: string, fileName: string) => {
  const relativeFilePath = `./_data/${fileName}`;

  const absolutePath = path.resolve(process.cwd(), relativeFilePath)
  fs.writeFile(absolutePath, content, function (err) {
    if (err) return console.log(err);
    console.log(`Saved ${fileName} > ${absolutePath}`);
  });
}
