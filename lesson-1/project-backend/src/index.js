// import {readFile} from "node:fs";
import {readFile, appendFile, writeFile, unlink} from "node:fs/promises";
import {join, resolve} from "node:path";

// const filePath = join("src", "file.txt");
// const filePath = join(process.cwd(), "src", "file.txt");
const filePath = resolve("src", "file.txt");
// console.log(filePath);

const fileOperations = async()=> {
  // const buffer = await readFile(filePath);
  // const text = buffer.toString();
  // console.log(text);
  // const text = await readFile(filePath, "utf-8");
  // console.log(text);
  // await appendFile(filePath, "\nNew text");
  // await writeFile(filePath, "Absolute new text");
  // await appendFile("src/file2.txt", "\nNew text");
  // await writeFile("src/file3.txt", "Absolute new text");
  // await unlink("src/file3.txt");
}

fileOperations();

// const data = await readFile("src/file.txt");
// console.log(data);

// readFile("src/file.txt")
//   .then(data => console.log(data))
//   .catch(err => console.error(err));

// readFile("src/file.txt", (err, data) => {
//   console.log(err);
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(data);
// });

