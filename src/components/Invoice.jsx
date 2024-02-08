import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Font,
} from "@react-pdf/renderer";

// Define font for the PDF
Font.register({
  family: "Roboto",
  src: "https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmEU9fBBc4AMP6lQ.woff2",
});

// Component to render the invoice
const Invoice = ({ invoiceData }) => {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Invoice</Text>
        </View>
        <View style={styles.heading}>
          <Text style={styles.headingTitle}>Adacode Solutions</Text>
          <Text style={styles.greeting}>
            Thank you for choosing to enroll in our course. We appreciate your
            trust in our institution. Please find attached the invoice for your
            recent course enrollment. We kindly ask you to keep this invoice for
            your records and to present it upon joining the course. Your invoice
            includes important details about your enrollment, including the
            course name, invoice number, and payment details. It serves as proof
            of your registration and payment. Should you have any questions or
            require further assistance, feel free to contact our customer
            support team at 9947276566 or adacodesolutions@gmail.com . We look
            forward to welcoming you to our course and helping you achieve your
            learning goals.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.header}>
            Invoice Number: {invoiceData.invoiceNumber}
          </Text>
          <Text style={styles.header}>
            Customer Name: {invoiceData.customerName}
          </Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeader}>Item</Text>
              <Text style={styles.tableHeader}>Quantity</Text>
              <Text style={styles.tableHeader}>Price</Text>
            </View>
            {invoiceData.items.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>{item.name}</Text>
                <Text style={styles.tableCell}>{item.quantity}</Text>
                <Text style={styles.tableCell}>Rs.{item.price}/-</Text>
              </View>
            ))}
          </View>
          <Text style={styles.paymentDetial}>
            The payment for your course enrollment has been successfully
            processed.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

// Styles for the PDF document
const styles = StyleSheet.create({
  heading: {
    flexDirection: "column",
    padding: 10,
    fontSize: 20,
    textAlign: "center",
    borderBottom: "1px solid black",
    marginBottom: 10,
  },
  greeting: {
    fontSize: 10,
    fontWeight: 300,
    textAlign: "center",
    padding: 10,
  },
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    height: "100%",
    width: "100%",
    padding: 20,
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
  titleText: {
    fontSize: 10,
    fontFamily: "Roboto",
    fontWeight: "bold",
  },
  section: {
    flexGrow: 1,
  },
  header: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  table: {
    width: "100%",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#000",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#000",
  },
  tableHeader: {
    width: "33.33%",
    padding: 5,
    fontWeight: "bold",
  },
  tableCell: {
    width: "33.33%",
    borderLeft: "1px solid #ccc",
    padding: 5,
  },
  paymentDetial: {
    padding: 10,
    fontSize: 10,
  },
});

// Component to trigger PDF download
const InvoicePDF = ({ paymentId, userName }) => {
  // Sample data for the invoice
  const invoiceData = {
    invoiceNumber: paymentId,
    customerName: userName,
    items: [{ name: "15 Days MasterClass", quantity: 1, price: 1000 }],
  };

  return (
    <PDFDownloadLink
      document={<Invoice invoiceData={invoiceData} />}
      fileName="invoice.pdf"
    >
      {({ loading }) => (loading ? "Loading document..." : "Download Invoice")}
    </PDFDownloadLink>
  );
};

export default InvoicePDF;
