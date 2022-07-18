import { Switch, Modal, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';

interface InitData {
    id?:number,
    name: string,
    marriage: boolean
}

interface MyModalProps {
    title: string,
    visible: boolean,
    initialValues?: InitData | {}
    handleOk: (item: object) => void,
    handleCancel: () => void
}

function MyModal(props: MyModalProps): JSX.Element {
    const { title, visible, initialValues, handleOk, handleCancel } = props;
    const [form] = Form.useForm();


    const onOk = () => {
        form
        .validateFields()
        .then(values => {
          handleOk(values);
        })
        .catch(info => {
          console.log('Validate Failed:', info);
        });       
        
    }

    const onCancel = () => {
        form.resetFields();
        handleCancel();
    }

    useEffect(() => {
        form.setFieldsValue(initialValues)
    }, [initialValues])

    return (
        <Modal
            title={title}
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}
            forceRender
        >
            <Form
                form={form}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
                initialValues={initialValues}
                autoComplete="off"
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item label="Marriage" name="marriage" valuePropName="checked" >
                    <Switch />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default MyModal