const XLSX = require('xlsx');
const path = require('path');

const workbook = XLSX.readFile('../menu_pos.xlsx');
const sheet_name_list = workbook.SheetNames;

sheet_name_list.forEach(sheetName => {
  const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
  console.log(`--- Sheet: ${sheetName} ---`);
  console.log(JSON.stringify(jsonData, null, 2));
});
