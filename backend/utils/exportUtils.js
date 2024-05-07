const fs = require('fs');
const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;
const pdf = require('html-pdf'); // Import the 'html-pdf' library
const ExcelJS = require('exceljs');

// Function to export data to CSV
const exportToCSV = async (pdfHeader, pdfData, filepath, res) => {
    try {
        const excelData = await generateExcel(pdfHeader, pdfData);
        if (!excelData) {
            return res.status(500).json({ error: 'An error occurred while generating Excel' });
        }
        console.log('Excel generated successfully');
        // Set response headers for Excel download
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=${filepath}.xlsx`);

        // Send the Excel buffer for download
        res.send(excelData); // Send the generated Excel buffer
    } catch (error) {
        console.error('Error generating Excel:', error);
        return null;
    }
};


const generateExcel = async (pdfHeader, pdfData) => {
    try {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Employees');

        // Define the columns in the Excel file
        const columns = pdfHeader.map(header => ({ header, key: header, width: 20 }));
        worksheet.columns = columns;

        // Add employee data to the worksheet
        pdfData.forEach((data) => {
            const row = {};
            const values = Object.values(data); // Get only the values from the object
            columns.forEach((column, index) => {
                row[column.key] = values[index]; // Assign each value to the corresponding column
            });
            console.log(row);
            worksheet.addRow(row);
        });

        // Save the workbook to a buffer
        const buffer = await workbook.xlsx.writeBuffer();
        return buffer;
    } catch (error) {
        console.error('Error generating Excel:', error);
        return null;
    }
};





// Function to export data to PDF with dynamic table
function exportToPDF(pdfHeader, pdfData, filepath, res) { // Add 'res' as a parameter
    const html = generateHTML(pdfHeader, filepath, pdfData);

    const options = { format: 'Letter' }; // You can customize PDF options as needed

    pdf.create(html, options).toBuffer((err, buffer) => {
        if (err) {
            console.error('Error generating PDF:', err);
            return res.status(500).json({ error: 'An error occurred while generating PDF' });
        }
        console.log('PDF generated successfully');

        // Set response headers for PDF download
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${filepath}.pdf`); // Remove backticks from filename

        // Send the PDF buffer for download
        res.send(buffer);
    });
}

const generateHTML = (pdfHeader, filepath, pdfData) => {
    let html = `
        <html>
        <head>
            <title>Employees Report</title>
            <style>
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                th, td {
                    border: 1px solid #000;
                    padding: 8px;
                }
                th {
                    background-color: #f2f2f2;
                }
            </style>
        </head>
        <body>
            <h1>${filepath} Report</h1>
            <table>
                <tr>
                    ${pdfHeader.map(header => `<th>${header}</th>`).join('')}
                </tr>
    `;

    pdfData.forEach(row => {
        html += `
            <tr>
                ${Object.values(row).map(value => `<td>${value}</td>`).join('')}
            </tr>
        `;
    });

    html += `
            </table>
        </body>
        </html>
    `;

    return html;
};


module.exports = { exportToCSV, exportToPDF };
