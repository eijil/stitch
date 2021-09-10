import React, { useState, useEffect } from 'react'
import { Layout, PageHeader, Image, Row, Col, Button, Upload, Space, Divider } from 'antd';
import { CloudUploadOutlined, DeleteOutlined } from '@ant-design/icons';

import _ from 'lodash'
import img0 from './image/0.jpg'
import img1 from './image/1.jpg'
import img2 from './image/2.jpg'
import img3 from './image/3.jpg'
import img4 from './image/4.jpg'
import img5 from './image/5.jpg'
import img6 from './image/6.jpg'


import Stitch from './stitch'

// TODO
// import MyWorker from './worker?worker'
// const worker = new MyWorker()



import './App.scss'

const { Content } = Layout;


function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}


const loadImages = (urls) => {
  const promises = []
  urls.forEach((url) => {
    const loadImg = new Promise((resolve, reject) => {
      const img = document.createElement('img')
      img.src = url
      img.onload = () => {
        resolve(img)
      }
      img.onerror = () => {
        reject()
      }
    })
    promises.push(loadImg)
  })
  return Promise.all(promises)

}



function App() {

 


  const [fileList, setFileList] = useState([
    {
      uid: 0,
      name: 0,
      url: img0
    },
    {
      uid: 1,
      name: 1,
      url: img1
    },
    {
      uid: 2,
      name: 2,
      url: img2
    },
    {
      uid: 3,
      name: 3,
      url: img3
    },
    {
      uid: 4,
      name: 4,
      url: img4
    },
    {
      uid: 5,
      name: 5,
      url: img5
    },
    {
      uid: 6,
      name: 6,
      url: img6
    }

  ])

  const [result, setResult] = useState('')
  const [isLoading, setIsLoading] = useState(false)



  const handlerChange = async (info) => {

    let fileList = info.fileList
   
    for (let file of fileList) {
      if (!file.url) {
        file.url = await getBase64(file.originFileObj)
      }
     
    }
    
    setFileList(_.sortBy(fileList, ['lastModified']))
  }

  const handlerStitch = async () => {

    setIsLoading(true)
   
    console.time('stitch')
    const imgs = await createImage()
    const stich = new Stitch([...imgs],true)
   
   

    const canvas = document.createElement('canvas')
    canvas.width = stich.result.width 
    canvas.height = stich.result.height
    const ctx = canvas.getContext('2d')
   
    ctx.putImageData(stich.result, 0, 0)
    
    setResult(canvas.toDataURL('image/jpeg'))
    console.timeEnd('stitch')
    setIsLoading(false)
  }

  const createImage = async () => {

    const urls = fileList.map(file => file.url)
    return loadImages(urls)
  }

  const clear = () => {
    setResult('')
    setFileList([])
  }

  return (
    <div className="App">

      <Layout>
        <PageHeader
          title="截图合成工具"
        ></PageHeader>
        <Content>
          <Row justify="space-between">
            <Col>
              <Space>
                <Upload
                  accept=".jpg,.jpeg"
                  fileList={fileList}
                  multiple
                  listType="picture"
                  onChange={handlerChange}
                  beforeUpload={() => { return false }}
                  showUploadList={false}
                >
                  <Button type="primary" icon={<CloudUploadOutlined />} size="large">Upload</Button>
                </Upload>
                <Button size="large" icon={<DeleteOutlined />} onClick={clear}>Clean</Button>
              </Space>
            </Col>
            <Col>
              <Button
                type="primary"
                size="large"
                disabled={fileList.length >= 2 ? false : true}
                loading={isLoading}
                onClick={handlerStitch}
              >Stitch</Button>
            </Col>
          </Row>
          <Divider />
          <div className="upload-preview">

            <Image.PreviewGroup>
              {
                fileList.map((file) => {
                
                  return (
                    <Image
                      key={file.uid}
                      alt={file.name}
                      width={100}
                      src={file.url}
                    />)
                })}
            </Image.PreviewGroup>
          </div>
          <Row justify="center">
            <Col span={12}>

              {result && <Image

                src={result}
              />}

            </Col>
          </Row>
          <div className="result">


          </div>
        </Content>

      </Layout>
    </div>
  );
}

export default App;
