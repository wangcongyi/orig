import React, { Component } from 'react'
import { Input, Table, Button, Modal, Divider, Icon } from 'antd'
import { indexSettings } from '../../api'

const { TextArea } = Input
const confirm = Modal.confirm

class Overview extends Component {
  state = {
    data: [],
    total: 0,
    pageNo: 1,
    pageSize: 20,
    searchQ: '',
    searchType: '',
    columns: [
      { title: 'ID', dataIndex: 'id', key: 'id', align: 'center' },
      { title: '名称', dataIndex: 'name', key: 'name', align: 'center' },
      { title: '分片数', dataIndex: 'shards', key: 'type', align: 'center' },
      { title: '副本数', dataIndex: 'replicas', key: 'createTime', align: 'center' },
      { title: '最大结果窗口数', dataIndex: 'maxResultWindow', key: 'creator', align: 'center' },
      {
        title: '操作',
        dataIndex: 'actions',
        key: 'actions',
        align: 'center',
        render: (text, record, index) => (
          <span>
            <a onClick={() => this.props.onRecord(record)}>查看</a>
            <Divider type="vertical" />
            <a style={{ color: '#ff4d4f' }} onClick={() => this.handleDelete(record.id, index)}>删除</a>
          </span>
        ),
      },
    ],
  }

  componentDidMount() {
    indexSettings.check()
      .then(({ data }) => {
        this.setState({
          data: data.data.data,
          total: data.data.total,
        })
      })
  }

  handleSearch = () => {
    const { searchName, searchID } = this.refs
    const searchQ = `name=${searchName.input.value}&id=${searchID.input.value}`
    indexSettings.check(searchQ)
      .then(({ data }) => {
        this.setState({
          data: data.data.data,
          total: data.data.total,
          pageSize: data.data.pageSize,
          pageNo: 1,
          searchQ: searchQ,
        })
      })
  }


  handleDelete = (id, index) => {
    const self = this
    confirm({
      title: '提醒',
      content: '确定删除该索引？',
      onOk() {
        indexSettings.delete(id)
          .then(() => {
            Modal.success({
              title: '删除成功',
              content: '',
            })
          })
          .then(() => {
            self.state.data.splice(index, 1)
            self.setState({
              data: self.state.data,
            })
          })
          .catch(err => {
            Modal.error({
              title: '删除失败',
              content: err.msg,
            })
          })
      },
      onCancel() {
        return false
      },
    })
  }

  handlePageChange = (page, pageSize) => {
    indexSettings.check(`pageNo=${page}`)
      .then(({ data }) => {
        this.setState({
          data: data.data.data,
          total: data.data.total,
          pageNo: data.data.pageNo,
        })
      })
  }

  handlePageSize = (current, size) => {
    indexSettings.check(`pageSize=${size}`)
      .then(({ data }) => {
        this.setState({
          data: data.data.data,
          total: data.data.total,
          pageSize: data.data.pageSize,
        })
      })
  }

  handleReSet = () => {
    const { searchName, searchID } = this.refs
    searchName.input.value = ''
    searchID.input.value = ''
    indexSettings.check()
      .then(({ data }) => {
        this.setState({
          data: data.data.data,
          total: data.data.total,
        })
      })
  }


  render() {
    const { columns, data, total, pageSize, pageNo } = this.state

    return (
      <div className="index-template">
        <Button type="primary" className="float-right" style={{ top: 0 }} onClick={this.props.onToggle}>
          <Icon type="plus" />
          <span>新增</span>
        </Button>
        <h3>索引基本设置管理</h3>
        <div className="filter-wrapper">
          <p className="name-bottom-border">筛选</p>
          <div className="filter-row">
            <label>名称</label>
            <Input ref="searchName" placeholder="请输入关键字" style={{ width: 330 }} />
            <label>ID</label>
            <Input ref="searchID" placeholder="请输入ID" />
            <Button onClick={this.handleSearch} type="primary">查询</Button>
            <Button onClick={this.handleReSet}>重置</Button>
          </div>
        </div>
        <p className="name-bottom-border">索引基本设置列表</p>
        <Table
          rowKey={record => record.id}
          columns={columns}
          dataSource={data}
          bordered
          pagination={{
            position: 'bottom',
            total: total,
            pageSize: pageSize,
            pageNo: pageNo,
            pageSizeOptions: ['20', '40', '60'],
            showQuickJumper: true,
            showSizeChanger: true,
            onChange: this.handlePageChange,
            onShowSizeChange: this.handlePageSize,
          }}
        />
      </div>
    )
  }
}

class AddTemplatePage extends Component {

  handleSaveAndUpdate = () => {
    const { searchName, searchShards, searchReplicas, searchMaxWin, searchSettings } = this.refs
    const ttt = searchSettings.textAreaRef.value
    const { id } = this.props.data
    let method = id ? 'update' : 'add'
    let string = `name=${searchName.input.value}&shards=${searchShards.input.value}&replicas=${searchReplicas.input.value}&maxResultWindow=${searchMaxWin.input.value}&settings=${ttt}`

    id && (string += `&id=${id}`)

    indexSettings[method](string)
      .then(({ data }) => {
        if (data.code === 0) {
          this.props.onToggle()
        } else {
          Modal.error({
            title: data.msg,
          })
        }
      })
      .catch(({ data }) => {
        Modal.error({
          title: data.msg,
        })
      })
  }

  render() {
    const { shards, settings, replicas, maxResultWindow, name } = this.props.data
    let tt = ''
    if (settings) {
      tt = JSON.parse(settings)
      tt = JSON.stringify(tt, undefined, 2)
    }

    return (
      <div className="index-template-form">
        <h3>索引基本设置管理</h3>
        <div className="form-row">
          <label className="ant-form-item-required editor-title">名称</label>
          <Input ref="searchName" defaultValue={name} placeholder="最多不超过50个字符" style={{ width: 320 }} />
        </div>
        <div className="form-row">
          <label className="ant-form-item-required editor-title">分片数</label>
          <Input ref="searchShards" defaultValue={shards} style={{ width: 320 }} />
        </div>
        <div className="form-row">
          <label className="ant-form-item-required editor-title">副本数</label>
          <Input ref="searchReplicas" defaultValue={replicas} style={{ width: 320 }} />
        </div>
        <div className="form-row">
          <label className="ant-form-item-required editor-title">最大结果窗口数</label>
          <Input ref="searchMaxWin" defaultValue={maxResultWindow} style={{ width: 320 }} />
        </div>
        <div className="form-row">
          <label className="editor-title">settings (JSON 格式)</label>
          <TextArea ref="searchSettings" rows={15} style={{ width: 'calc(100% - 200px)' }}>
            {tt}
          </TextArea>
        </div>
        <div className="form-row text-align-center" style={{ padding: '0 30px 0 0' }}>
          <Button onClick={this.handleSaveAndUpdate} type="primary">保存</Button>
          <Button onClick={this.props.onToggle}>返回列表</Button>
        </div>
      </div>
    )
  }
}

class IndexTemplate extends Component {
  state = {
    showAddPage: false,
    record: {},
  }

  onShowAddPage = () => {
    this.setState({
      showAddPage: !this.state.showAddPage,
      record: {},
    })
  }

  onRecord = (record) => {
    this.setState({
      record: record,
      showAddPage: !this.state.showAddPage,
    })
  }

  render() {
    const { showAddPage, record } = this.state
    return (
      <div className="index-template-manager">
        {showAddPage ? <AddTemplatePage onToggle={this.onShowAddPage} data={record} /> :
          <Overview onToggle={this.onShowAddPage} onRecord={this.onRecord} />}
      </div>
    )
  }
}

export default IndexTemplate
