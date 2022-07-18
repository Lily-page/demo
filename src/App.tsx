import React, { useEffect, useState } from 'react';
import { Table, Switch, Space, Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import MyHeader from './components/MyHeader';
import MyModal from './components/MyModal';
import { addItem, deleteItem, editItem, getSearchList } from './api/data';

import './App.css';

interface DataType {
  id: number;
  name: string;
  marriage: boolean;
}

function App(): JSX.Element {
  const [keyword, setKeyword] = useState<string>();
  const [tableData, setTableData] = useState<DataType[]>();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState<string>();
  const [initialValues, setInitialValues] = useState<object>();
  const [editId, setEditId] = useState<number>(null);

  const getDataList = async (value?: string) => {
    setLoading(true);
    const data = value ? await getSearchList(value) : await getSearchList();
    setTableData([...data]);
    setLoading(false);
  }

  const onSearch = (value: string) => {
    setKeyword(value);
    getDataList(value);
  }

  const onKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  }

  const onAdd = () => {
    setTitle('Add Modal');
    setVisible(true);
  }


  const switchChange = (switchValue: boolean, record: DataType) => {
    const newRecord = {...record, marriage: switchValue};
    const newTableData = tableData.map(v => v.id === record.id ? newRecord : v);
    setTableData([...newTableData]);
    editItem(newRecord);
  }

  const handleEdit = (item: DataType) => {
    setTitle('Edit Modal');
    setVisible(true);
    setInitialValues({ ...item });
    setEditId(item.id);
  }



  const deleteData = async (id: number) => {
    await deleteItem(id);
    getDataList();
  }

  const handleOk = async (item: object) => {
    editId!==null ? await editItem({ id: editId, ...item }) : await addItem(item);
    getDataList();
    setVisible(false);
    setEditId(null);
  }

  const handleCancel = () => {
    setVisible(false);
  }

  useEffect(() => {
    getDataList();
  }, [])


  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Marriage',
      dataIndex: 'marriage',
      key: 'marriage',
      render: (_, record) => (
        <Switch checked={record.marriage} onChange={(checked) => switchChange(checked, record)} />
      ) 
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type='primary' onClick={() => handleEdit(record)}>编辑</Button>
          <Button type='primary' danger onClick={() => {
            Modal.confirm({
              title: 'Confirm',
              icon: <ExclamationCircleOutlined />,
              content: `确定要删除${record.name}吗？`,
              okText: '确认',
              cancelText: '取消',
              onOk: () => {
                deleteData(record.id)
              }
            });
          }}>删除</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="App">
      <MyHeader
        keyword={keyword}
        onChange={onKeywordChange}
        onSearch={onSearch}
        onAdd={onAdd}
      />
      <Table
        rowKey={'id'}
        columns={columns}
        dataSource={tableData}
        loading={loading}
      />
      <MyModal
        title={title}
        visible={visible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        initialValues={initialValues}
      />
    </div>
  );
}

export default App;
