import React, { useEffect, useState } from 'react';
import { Button, Input } from 'antd';

import './MyHeader.css';

interface MyHeaderProps {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onSearch?: (value: string) => void,
    onAdd?: () => void,
    keyword?: string
}

const { Search } = Input;


function MyHeader(props: MyHeaderProps): JSX.Element {
    const { keyword, onChange, onSearch, onAdd } = props;

    return (
        <div className='MyHeader'>
            <Search value={keyword} onChange={onChange}  onSearch={onSearch} allowClear placeholder="Search......" style={{ width: 300 }} />
            <Button onClick={onAdd}>Add</Button>
        </div>
    )
}

export default MyHeader;