import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { THEME_COLORS as themes } from "../ThemeConfig";
import { connect } from 'react-redux';
import CreateBtn from "../components/includes/CreateBtn";
import ExportBtn from "../components/includes/ExportBtn";
import SortBtn from "../components/includes/SortBtn";
import { getInvoices } from "../actions/InvoiceActions";
import SearchBar from "../components/includes/SearchBar";
import InvoiceSortBtn from "../components/includes/InvoiceSortBtn";
import { axiosInstance } from "../utils/baseurl";
import Pagination from "../components/includes/Pagination";

const Invoice = ({ invoices, getInvoices }) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(invoices.totalPages);

  useEffect(() => {
    // Fetch projects when component mounts
    getInvoices(page, limit);

  }, [page, getInvoices]);

  const handleSearch = (e) => {
    getInvoices(page, limit, e.target.value, '', ''); // Pass empty strings for sortBy and sortOrder
  };

  const handleFilter = (option) => {
    // Call getInvoices with the selected sorting option
    if (option === "Name A-Z") {
      getInvoices('', "nameA-Z", "ASC"); // Pass an empty string for searchTerm
    } else if (option === "Amount Low to High") {
      getInvoices('', "amountL-H", "ASC"); // Pass an empty string for searchTerm
    }
  };

  const handleExportData = async (format) => {
    try {
      const response = await axiosInstance.get('/invoices/exportinvoices', {
        headers: {
          "Content-Type": `application/json`
        },
        params: {
          format
        },
        responseType: 'arraybuffer' // Specify arraybuffer response type to receive binary data
      });
      if (format === "PDF") {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Invoice.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      } else if (format === "CSV") {
        const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Invoice.xlsx';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error exporting data:', error);
      // Handle error, e.g., show an error message to the user
    }
  };

  function parseName(address) {
    // Define a regular expression pattern to match the name
    const namePattern = /^[a-zA-Z\s]+/;

    // Use the match method with the pattern to extract the name
    const match = address.match(namePattern);

    // Check if a match is found
    if (match) {
      // Return the matched name
      return match[0].trim();
    } else {
      // If no match is found, return null or an appropriate value
      return null;
    }
  }

  console.log(invoices.invoices);

  return (
    <div>
      <MainContainer>
        <Top>
          <Head>Invoice</Head>
          <SearchBar placeholder={"Search name or GSTIN"} onChange={handleSearch} />
          <BtnSection>
            <Link to={"/taxInvoice"}>
              <CreateBtn text="Create New Invoice" />
            </Link>
            <ExportBtn ExportData={handleExportData} />
            <InvoiceSortBtn onFilter={handleFilter} />
          </BtnSection>
        </Top>
        <Table>
          <Thead>
            <Tr>
              <Th>Invoice Number</Th>
              <Th>Date</Th>
              <Th>Name/Company</Th>
              <Th>GSTIN/UIN</Th>
              <Th>HSN/SAC</Th>
              <Th>Description</Th>
              <Th>Total</Th>
            </Tr>
          </Thead>
          <Tbody>
            {invoices.invoices && invoices.invoices.length > 0 ? (
              invoices.invoices.map((item) => (
                <Tr key={item.id}>
                  <Td>{item.invoiceNumber}</Td>
                  <Td>{item.date}</Td>
                  <Td>{parseName(item.nameAndAddress)}</Td>
                  <Td>{item.gstinUin}</Td>
                  <Td>{item.InvoiceItems[0].hsnSac}</Td> {/* Assuming there's always at least one item */}
                  <Td>{item.InvoiceItems.map((item) => item.descriptionOfGoods).join(", ")}</Td>
                  <Td>{item.total}</Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan="10">No Invoice available</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
        <Pagination initialPage={page} totalPages={invoices.totalPages} getData={setPage} />
      </MainContainer>
    </div>
  );
};

const mapStateToProps = (state) => ({
  invoices: state.invoice.invoices,
  loading: state.invoice.loading,
  error: state.invoice.error
});

export default connect(mapStateToProps, { getInvoices })(Invoice);


const MainContainer = styled.div``;
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px auto;
  width: 98%;
`;

const Btn = styled.div`


  background: rgba(113, 113, 113, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 20px;
  z-index: 999;
`;


const Head = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: ${themes.text_1};
`;
const BtnSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;


const Table = styled.table`
  border-collapse: collapse;
  border-spacing: 0 10px;
  width: 98%;
  margin: 20px auto;
`;
const Thead = styled.thead`
  background-color: ${themes.table_1};
  font-weight: 500;
`;
const Tr = styled.tr`
  &:nth-child(even) {
    background-color: ${themes.table_1};
  }
`;
const Th = styled.th`
  padding: 15px;
  font-size: 14px;
  font-weight: 600;
`;
const Tbody = styled.tbody``;
const Td = styled.td`
  padding: 15px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  font-weight: 300;
`;