
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DataTable, Text } from 'react-native-paper';

const AppTable = ({ title, data }) => {
  return (
    <View style={styles.tableContainer}>
      <Text style={styles.tableTitle}>{title}</Text>
      <DataTable>
        <DataTable.Header>
          {Object.keys(data[0]).map((key, index) => (
            <DataTable.Title key={index}>{key}</DataTable.Title>
          ))}
        </DataTable.Header>

        {data.map((row, rowIndex) => (
          <DataTable.Row key={rowIndex}>
            {Object.keys(row).map((key, cellIndex) => (
              <DataTable.Cell key={cellIndex}>{row[key]}</DataTable.Cell>
            ))}
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  );
};

const styles = StyleSheet.create({
  tableContainer: {
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  tableTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});

export default AppTable;
