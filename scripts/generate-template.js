const XLSX = require('xlsx')
const path = require('path')

const wb = XLSX.utils.book_new()
const ws = XLSX.utils.aoa_to_sheet([
  ['Nome', 'Punti', 'Numero Gare', 'Numero Ritrovi'],
  ['Mario Rossi', 10, 2, 1],
  ['Anna Bianchi', 8, 1, 3],
])
XLSX.utils.book_append_sheet(wb, ws, 'Classifica')
XLSX.writeFile(wb, path.join(__dirname, '../public/template_classifica.xlsx'))
console.log('Template created in public/template_classifica.xlsx')
