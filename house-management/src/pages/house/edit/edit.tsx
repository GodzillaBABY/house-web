import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, InputNumber, Button, Checkbox, Col, Row, Select, Result } from 'antd';
import ImageUpload from '../_house/img-upload/img-upload'
import './edit.less';
import { updateRoom, getRoomDetail } from '@/utils/request/request';

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 16 }
};

const validateMessages = {
  required: '请添加${label}!',
  types: {
    price: '${label} is not validate email!',
    number: '${label} is not a validate number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
const defaultDetail = {
  address: "广东省揭阳市普宁市胡桃里",
  contactPhone: "1234567890",
  contactWechat: "wfewefwe",
  districts: "0",
  farAway: null,
  latitude: "23.297642",
  longitude: "116.166004",
  matchingTag: "冰箱,公共办公空间,电视改为投影",
  name: "测试2",
  nearby: "wefwe",
  price: 123,
  roomImages: null,
  roomTag: "lk",
}
const { Option } = Select;
const Edit = () => {
  const onFinish = async (values: any) => {
    let { room } = values

    let Tag = room.matchingTag.join(','),
      address = '广东省揭阳市普宁市' + room.address
    room = {
      ...room,
      matchingTag: Tag,
      address: address
    }
    try {
      const res = await postCreatRoom(room)
      const { code } = res
      if (code === 0) {
        setSuccess(true)
      } else {
        console.log('错误')
      }
    } catch{
      console.log('网关错误')
    }
    // const getRoomListRes = await getRoomList()
    // console.log(getRoomListRes)
  };

  const [imgList, setImgList] = useState(defaultDetail.roomImages)
  const [activeDistricts, setDistricts] = useState(defaultDetail.districts)
  const districtsArray: Array<string> = ['流沙西街道', '流沙南街道', '流沙北街道']
  const imgRef = useRef(null)
  const [isSuccess, setSuccess] = useState(false)
  const [initData, setInitData] = useState(defaultDetail)
  useEffect(() => {
    // console.log(imgList, 333333)
    // create.setFieldsValue
    imgRef.current.setFieldsValue({ room: { image: imgList } });
  }, [imgList])
  //添加图片数组到方法
  const getDetail = async () => {
    try {
      const res = await getRoomDetail({ id: 1 })
      const { code, data } = res
      if (code === 0) {
        console.log(data)
        setInitData(data)
      } else {
        console.log('错误')
      }
    } catch{
      console.log('网关错误')
    }

  }
  const getImageUpload = (imgListR: Array<any>) => {
    let imgListN = ''
    imgListR.forEach(i => {
      let imgName = i.response.data
      if (imgListN !== '') {
        imgListN += ',' + imgName
      } else {
        imgListN += imgName
      }
      return imgListN
    })
    setImgList(imgListN)
    imgRef.current.setFieldsValue({ room: { image: imgListN } });
  }
  const onDistrictsChange = (districts: any) => {
    setDistricts(districts)
    imgRef.current.setFieldsValue({ room: { districts: districts } });
  }

  // const dealTagData = (tagArr: any[]) => {
  //   let TagSty = tagArr.join(',')
  //   imgRef.current.setFieldsValue({ room: { matchingTag: TagSty } });
  // }
  return (<div>
    {isSuccess ? <Result
      status="success"
      title="成功提交房源！"
      subTitle='请返回房源列表查看，编辑或删除该房源'
      extra={[
        <Button type='primary' key='list'>
          查看房源列表
          </Button>,
        <Button key='edit'>返回修改</Button>,
      ]}
    /> : <Form  {...layout} name='create' ref={imgRef} className='creat-form' onFinish={onFinish} onValuesChange={(e) => { console.log(e) }} validateMessages={validateMessages}>
        <Form.Item
          initialValue={initData.name}
          name={['room', 'name']} label='房源名称' rules={[{ required: true }]} className='creat-form-item'>
          <Input />
        </Form.Item>
        <Form.Item
          initialValue={initData.id}
          name={['room', 'id']} className='creat-form-item' label='房源编号' rules={[{ required: true }]}>
          <InputNumber min={1} max={999999} size='middle' className='input-id' />
        </Form.Item>
        <Form.Item label='房源价格' className='creat-form-item'>
          <Form.Item name={['room', 'price']} noStyle className='creat-form-item price' label='房源价格'
            initialValue={initData.price}
            rules={[{ required: true, message: '请输入房源价格!' }]}
          >
            <InputNumber min={1} max={999999} size='middle' className='input-price' />
          </Form.Item>
          <span className="ant-form-text">元</span>
        </Form.Item>
        <Form.Item
          className='creat-form-item'
          name={['room', 'image']} label='房源图片'
          rules={[{ required: true }]}
          initialValue={initData.roomImages}
        >
          <ImageUpload handleUploadCB={getImageUpload} />
        </Form.Item>
        {/* <Form.Item
    className='creat-form-item'
    name={['room', 'image']} label='房源图片'
    rules={[{ required: true }]}
  >
    <Input />
  </Form.Item> */}
        <Form.Item
          initialValue={initData.matchingTag}
          name={['room', 'matchingTag']} label='配套设施' className='creat-form-item' rules={[{ required: true }]}>
          <Checkbox.Group>
            <Row>
              <Col span={8}>
                <Checkbox value='冰箱' style={{ lineHeight: '32px' }}>
                  冰箱
          </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value='洗衣机' style={{ lineHeight: '32px' }}>
                  洗衣机
          </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value='独立淋浴间' style={{ lineHeight: '32px' }}>
                  独立淋浴间
          </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value='榻榻米' style={{ lineHeight: '32px' }}>
                  榻榻米
          </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value='沙发' style={{ lineHeight: '32px' }}>
                  沙发
          </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value='台灯' style={{ lineHeight: '32px' }}>
                  台灯
          </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value='全身镜' style={{ lineHeight: '32px' }}>
                  全身镜
          </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value='衣柜' style={{ lineHeight: '32px' }}>
                  衣柜
          </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value='多功能柜' style={{ lineHeight: '32px' }}>
                  多功能柜
          </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value='茶几' style={{ lineHeight: '32px' }}>
                  茶几
          </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value='音响' style={{ lineHeight: '32px' }}>
                  音响
          </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value='自助快递柜' style={{ lineHeight: '32px' }}>
                  自助快递柜
          </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value='公共办公空间' style={{ lineHeight: '32px' }}>
                  公共办公空间
          </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value='电视改为投影' style={{ lineHeight: '32px' }}>
                  电视改为投影
          </Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item
          initialValue={initData.nearby}
          name={['room', 'nearby']} className='creat-form-item item-nearby' label='附近信息:' >
          <Input size='middle' className='input-nearby' />
        </Form.Item >
        <Form.Item name={['room', 'roomTag']} className='creat-form-item item-nearby' label='房源特点:'
          initialValue={initData.roomTag}
        >
          <Input size='middle' className='input-roomTag' />
        </Form.Item >
        <div className='box-address'>
          <Form.Item name={['room', 'districts']} className='creat-form-item item-districts' noStyle label='房源地址:'
            initialValue={initData.districts}
          >
            <span className='box-address-txt'>房源地址：普宁市</span>
            <Select
              style={{ width: 120 }}
              value={activeDistricts}
              onChange={onDistrictsChange}
              className='select-districts'
            >
              {districtsArray.map((item, index) => (
                <Option value={index} key={item}>{item}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name={['room', 'address']} className='creat-form-item item-address' noStyle
            initialValue={initData.address}
          >
            <Input size='middle' className='input-address' />
          </Form.Item>
        </div>
        <Form.Item
          initialValue={initData.contactPhone}
          name={['room', 'contactPhone']} className='creat-form-item item-contactPhone' label='管理人电话'
          rules={[{ required: true, message: '请输入联系人电话!' }]}
        >
          <Input type='tel' size='middle' className='input-contactPhone' />
        </Form.Item>
        <Form.Item
          initialValue={initData.contactWechat}
          name={['room', 'contactWechat']} className='creat-form-item item-contactWechat' label='管理人微信' >
          <Input size='middle' className='input-contactWechat' />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
          <Button type='primary' size='large' htmlType='submit' className='submit'>
            提交
          </Button>
        </Form.Item>
      </Form>}
  </div>
  );
};

export default Edit
