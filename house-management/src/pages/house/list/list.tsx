import React, { Component } from 'react';
import styles from './list.less';
import { Table, Tag, Space } from 'antd';
import { getRoomList } from '@/utils/request/request';
export default class HouseList extends Component {
  constructor(props: any) {
    super(props)

  }

  state = {
    list: [
      {
        address: "string",
        contactPhone: "string",
        contactWechat: "string",
        districts: "string",
        farAway: "string",
        id: 0,
        latitude: "string",
        longitude: "string",
        matchingTag: "string",
        name: "string",
        nearby: "string",
        price: 0,
        roomImages: [
          "string"
        ],
        roomTag: "string"
      }
    ]
  }
  componentDidMount() {
    this.fetchData()
  }
  fetchData = async () => {
    // try {
    // getRoomList({ districts: 'all', page: 1, type: 1, per_page: 999 }).then(data => console.log(data))
    try {
      const res = await getRoomList({ districts: 'all', page: 1, type: 1, per_page: 999 })
      console.log(res)
      const { data, code } = res
      if (code === 0) {
        this.setState({ list: data.records })
      }
    } catch{
      console.log('网关报错')
    }
  }
  render() {
    const { list } = this.state
    console.log(list)
    return (<Table columns={columns} dataSource={list} />
    )
  }
}
const columns = [
  {
    title: '房源id',
    dataIndex: 'id',
    key: 'id',
    render: (id: string) => <a>{id}</a>,
  },
  {
    title: '房源名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '房源地址',
    dataIndex: 'address',
    key: 'address',
  },
  // {
  //   title: 'Tags',
  //   key: 'tags',
  //   dataIndex: 'tags',
  //   render: (tags: any[]) => (
  //     <>
  //       {tags.map(tag => {
  //         let color = tag.length > 5 ? 'geekblue' : 'green';
  //         if (tag === 'loser') {
  //           color = 'volcano';
  //         }
  //         return (
  //           <Tag color={color} key={tag}>
  //             {tag.toUpperCase()}
  //           </Tag>
  //         );
  //       })}
  //     </>
  //   ),
  // },
  {
    title: '操作',
    key: 'action',
    render: (text: string, record: any) => (
      <Space size="middle">
        <a>编辑</a>
        <a>删除</a>
      </Space>
    ),
  },
];


