import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DataTable, Text } from 'react-native-paper';

const AppTable = ({ title, data }) => {
  const filterData = (data) => {
    return data.map((item) => {
      const filteredItem = { ...item };
      delete filteredItem.id;
      return filteredItem;
    });
  };

  const filteredData = filterData(data);
  const keys = Object.keys(filteredData[0]);

  return (
    <View style={styles.tableContainer}>
      <Text style={styles.tableTitle}>{title}</Text>
      <DataTable>
        {keys.map((key) => (
          <DataTable.Row key={key}>
            <DataTable.Cell>{key}</DataTable.Cell>
            {filteredData.map((item, index) => (
              <DataTable.Cell key={`${key}-${index}`} style={styles.cell}>{item[key]}</DataTable.Cell>
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
  cell: {
    justifyContent: 'center',
    textAlign: 'center'
  }
});

export default AppTable;
