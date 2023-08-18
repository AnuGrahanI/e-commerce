import React from 'react'
import { Dropdown, Space } from 'antd';

const items = [
    {
      key: '1',
      label: 'Group title',
      children: [
        {
          key: '1-1',
          label: '1st menu item',
        },
        {
          key: '1-2',
          label: '2nd menu item',
          children:[
            {
              key:'1-2-1',
              label:'3  reknijbhvu'
            }
          ]
        },
      ],
    },
    {
      key: '2',
      label: 'sub menu',
      children: [
        {
          key: '2-1',
          label: '3rd menu item',
        },
        {
          key: '2-2',
          label: '4th menu item',
        },
      ],
    },
    {
      key: '3',
      label: 'disabled sub menu',
      
      children: [
        {
          key: '3-1',
          label: '5d menu item',
        },
        {
          key: '3-2',
          label: '6th menu item',
        },
      ],
    },
  ];
const DropDownItems = () => {
  return (
    <>
        <Dropdown
        menu={{
        items,
        }}
        >
            <a onClick={(e) => e.preventDefault()}>
                <Space>
                    Cascading menu
                    {/* <DownOutlined /> */}
                </Space>
        </a>
    </Dropdown>
  </>
  )
}

export default DropDownItems


