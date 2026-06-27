const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else {
      if (dirFile.endsWith('page.tsx')) {
        filelist.push(dirFile);
      }
    }
  });
  return filelist;
};

const files = walkSync('C:\\__D__Data\\www\\PSSC\\web\\src\\app\\(dashboard)');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const regex = /(<div\s+className="[^"]*)(bg-background|bg-slate-50|bg-white|bg-\[#161622\])(\s+[^"]*")/;
  if (regex.test(content)) {
    content = content.replace(regex, (match, p1, p2, p3) => {
      return (p1 + p3).replace(/  +/g, ' '); 
    });
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});
