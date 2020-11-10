import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './img-upload.less'
import React from 'react';
import ReactDOM from 'react-dom';

interface Iprops {
  handleUploadCB: () => void
}
function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class ImageUpload extends React.Component {
  constructor(props: Iprops) {
    super(props);
  }
  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [],
  };

  handleCancel = () => this.setState({ previewVisible: false });
  getImgNameAry = (fileList: any) => {
    this.props.handleUploadCB && this.props.handleUploadCB(fileList)
    // console.log(fileList, 213123213, file)
  }
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  handleChange = ({ fileList, file }) => {
    this.setState({ fileList });
    if (file.response) {
      this.getImgNameAry(fileList)
    };
  }
  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (<div>
      <Upload
        // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        action='http://www.m3brand.top/api/upload'
        listType="picture-card"
        fileList={fileList}
        onPreview={this.handlePreview}
        onChange={this.handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={this.handleCancel}
      >
      </Modal>
    </div>)
  }
}
export default ImageUpload