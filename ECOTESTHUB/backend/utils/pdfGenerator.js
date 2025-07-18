const PDFDocument = require('pdfkit');
const fs = require('fs');

exports.generateResultPDF = (result, user) => {
  const doc = new PDFDocument();
  const filePath = `/tmp/result_${result._id}.pdf`;
  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(20).text('Test Result Summary', { align: 'center' });
  doc.moveDown();
  doc.fontSize(14).text(`Name: ${user.name}`);
  doc.text(`Email: ${user.email}`);
  doc.text(`Score: ${result.score} / ${result.total}`);
  doc.text(`Taken At: ${result.createdAt}`);

  doc.end();
  return filePath;
};