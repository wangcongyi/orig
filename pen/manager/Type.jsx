import React, { Component } from 'react'
import { formatDate } from '../../helper'
import { Input, Table, Button, DatePicker, Select, Modal, Icon, Divider, Alert } from 'antd'
import CusField from './CusField'
import DataBaseField from './DataBaseField'
import { type, indexManager } from "../../api"

const { RangePicker } = DatePicker
const confirm = Modal.confirm
const Option = Select.Option
const buttonStyle = { float: 'right', marginRight: '20px' }
const inputWidth = { width: 320 }

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
      { title: 'type名称', dataIndex: 'name', key: 'name', align: 'center' },
      { title: '创建时间', dataIndex: 'createTime', key: 'createTime', align: 'center', render: text => formatDate(text) },
      { title: '创建人', dataIndex: 'creator', key: 'creator', align: 'center' },
      {
        title: '上一次更新时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
        align: 'center',
        render: text => formatDate(text),
      },
      {
        title: '操作',
        dataIndex: 'actions',
        key: 'actions',
        align: 'center',
        render: (text, record, index) => (
          <span>
            <a onClick={() => this.handleLook(record)}>查看</a>
            <Divider type="vertical" />
            <a style={{ color: '#ff4d4f' }} onClick={() => this.handleDelete(record.id, index)}>删除</a>
          </span>
        ),
      },
    ],
  }

  componentDidMount() {
    type.check()
      .then(({ data }) => {
        this.setState({
          data: data.data.data,
          total: data.data.total,
        })
      })
  }

  handleLook = (record) => {
    this.props.onRecord(record)
  }

  handleDelete = (id, index) => {
    const self = this
    confirm({
      title: '提醒',
      content: '确定删除该 TYPE？',
      onOk() {
        type.delete(id)
          .then(() => {
            Modal.success({
              title: '删除成功',
              content: '',
            })
            self.state.data.splice(index, 1)
            self.setState({
              data: self.state.data,
            })
          })
      },
      onCancel() {
        return false
      },
    })
  }

  handlePageChange = (page, pageSize) => {
    type.check(`pageNo=${page}`)
      .then(({ data }) => {
        this.setState({
          data: data.data.data,
          total: data.data.total,
          pageNo: data.data.pageNo,
        })
      })
  }

  handlePageSize = (current, size) => {
    type.check(`pageSize=${size}`)
      .then(({ data }) => {
        this.setState({
          data: data.data.data,
          total: data.data.total,
          pageSize: data.data.pageSize,
        })
      })
  }

  handleSearch = () => {
    const { searchName, searchID } = this.refs
    const { createTime, updateTime } = this.state
    const searchQ = `&name=${searchName.input.value}&id=${searchID.input.value}&${createTime}&${updateTime}`
    type.check(searchQ)
      .then(({ data }) => {
        this.setState({
          data: data.data.data,
          total: data.data.total,
          pageSize: data.data.pageSize,
          searchQ: searchQ,
          pageNo: 1,
        })
      })
  }

  pickTime = (data, dataString, num) => {
    const time = num ? 'Update' : 'Create'
    const s = num ? 'updateTime' : 'createTime'
    const o = {}
    o[s] = `start${time}Time=${dataString[0]} 00:00:00&end${time}Time=${dataString[1]} 23:59:59`
    this.setState(o)
  }

  handleReSet = () => {
    const { searchName, searchID } = this.refs
    searchName.input.value = ''
    searchID.input.value = ''
    type.check()
      .then(({ data }) => {
        this.setState({
          createTime: '',
          updateTime: '',
          searchType: '',
          data: data.data.data,
          total: data.data.total,
          pageNo: 1,
        })
      })

  }

  render() {
    const { columns, data, total, pageSize } = this.state
    return (
      <div className="domain-manager">
        <Button type="primary" className="float-right" style={{ top: 0 }} onClick={() => this.props.onToggle(false)}>
          <Icon type="plus" />
          <span>新增</span>
        </Button>
        <h3>索引type管理</h3>
        <div className="filter-wrapper">
          <p className="name-bottom-border">筛选</p>
          <div className="filter-row">
            <label>名称</label>
            <Input ref="searchName" placeholder="请输入关键字" style={{ width: 330 }} />
            <label>ID</label>
            <Input ref="searchID" placeholder="请输入ID" />
          </div>
          <div className="filter-row">
            <label>创建时间</label>
            <RangePicker onChange={(a, b) => this.pickTime(a, b, 0)} />
            <label>上一次更新时间</label>
            <RangePicker onChange={(a, b) => this.pickTime(a, b, 1)} />
          </div>
          <div className="form-row text-align-right" style={{ padding: '0 30px 0 0' }}>
            <Button onClick={this.handleSearch} type="primary">查询</Button>
            <Button onClick={this.handleReSet}>重置</Button>
          </div>
        </div>
        <p className="name-bottom-border">TYPE 列表</p>
        <Table
          rowKey={record => record.id}
          columns={columns}
          dataSource={data}
          bordered
          pagination={{
            position: 'bottom',
            total: total,
            pageSize: pageSize,
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

class AllField extends Component {
  state = {
    pageSize: 0,
    total: 0,
    pageNo: 1,
    tableData: [],
    columns: [
      { title: 'ID', dataIndex: 'id', align: 'center', key: 'id', width: 100 },
      { title: '名称', dataIndex: 'name', align: 'center', key: 'name', width: 180 },
      { title: '类型', dataIndex: 'type', align: 'center', key: 'type', width: 90 },
      { title: 'column_name', dataIndex: 'columnName', align: 'center', key: 'columnName', width: 180 },
      { title: 'column_type', dataIndex: 'columnType', align: 'center', key: 'columnType', width: 150 },
      { title: '说明', dataIndex: 'remark', align: 'center', key: 'remark', width: 700 },
      {
        title: '操作',
        dataIndex: 'actions',
        align: 'center',
        key: 'actions',
        render: (text, record, index) =>
          <span>
            <a onClick={() => this.props.handleState(1, record)}>编辑</a>
            <Divider type="vertical" />
            <a style={{ color: '#ff4d4f' }} onClick={() => this.handleDelete(record.id, index)}>删除</a>
          </span>,
      },
    ],
  }

  componentDidMount() {
    this._getFieldList()
  }

  handleDelete = (id, index) => {
    const self = this
    confirm({
      title: '提醒',
      content: '确定删除该 Field？',
      onOk() {
        type.deleteField(id)
          .then(() => {
            Modal.success({
              title: '删除成功',
              content: '',
            })
            self.state.tableData.splice(index, 1)
            self.setState({
              tableData: self.state.tableData,
            })
          })
      },
      onCancel() {
        return false
      },
    })
  }

  handlePageChange = (page) => {
    type.checkField(`typeId=${this.props.id}&pageNo=${page}`)
      .then(({ data }) => {
        this.setState({
          tableData: data.data.data,
          total: data.data.total,
          pageSize: data.data.pageSize,
          pageNo: data.data.pageNo,
        })
      })
  }

  handleSearch = () => {
    const { searchName, searchID } = this.refs
    type.checkField(`typeId=${this.props.id}&name=${searchName.input.value}&id=${searchID.input.value}`)
      .then(({ data }) => {
        this.setState({
          tableData: data.data.data,
          total: data.data.total,
          pageSize: data.data.pageSize,
          pageNo: data.data.pageNo,
        })
      })
  }

  handleReSet = () => {
    this._getFieldList()
  }

  _getFieldList = () => {
    const { searchName, searchID } = this.refs
    searchName.input.value = ''
    searchID.input.value = ''
    type.checkField(`typeId=${this.props.id}`)
      .then(({ data }) => {
        this.setState({
          tableData: data.data.data,
          total: data.data.total,
          pageSize: data.data.pageSize,
          pageNo: data.data.pageNo,
        })
      })
  }

  render() {
    const { tableData, columns, pageSize, total } = this.state
    return (
      <div>
        <h3>修改TYPE</h3>
        <div className="form-row">
          <p className="name-bottom-border" style={{ marginTop: '40px' }}>
            <span>筛选</span>
            <Button onClick={() => this.props.handleState(1)} style={buttonStyle} type="primary">
              <span>自定义添加 field</span>
            </Button>
            <Button onClick={() => this.props.handleState(2)} style={buttonStyle} type="primary">
              <span>数据源添加 field</span>
            </Button>
          </p>
        </div>
        <div className="form-row">
          <label className="editor-title">名称</label>
          <Input ref="searchName" placeholder="请输入关键字" style={inputWidth} />
        </div>
        <div className="form-row">
          <label className="editor-title">ID</label>
          <Input ref="searchID" placeholder="请输入ID" style={inputWidth} />
          <Button onClick={this.handleSearch} type="primary" style={{ marginLeft: '50px' }}>查询</Button>
          <Button onClick={this.handleReSet}>重置</Button>
        </div>
        <p className="name-bottom-border" style={{ marginTop: '80px' }}>type包含field列表</p>
        <Table
          rowKey={record => record.id}
          columns={columns}
          dataSource={tableData}
          bordered
          pagination={{
            position: 'bottom',
            total: total,
            pageSize: pageSize,
            pageSizeOptions: ['20', '40', '60'],
            showQuickJumper: true,
            onChange: this.handlePageChange,
          }}
        />
        <div className="form-row text-align-center">
          <Button type="primary" onClick={this.props.onToggle}>返回上一级</Button>
        </div>
      </div>
    )
  }
}

class TypeTable extends Component {
  state = {
    stateShow: 0,
    record: {},
  }

  handleState = (n, record) => {
    this.setState({
      stateShow: n,
      record,
    })
  }

  render() {
    const { stateShow, record } = this.state
    let fieldID = ''
    if (record && Object.keys(record).length !== 0) {
      fieldID = record.id
      delete record.id
    }
    switch (stateShow) {
      case 1:
        return <CusField {...this.props} fieldID={fieldID} {...record} handleState={this.handleState} />
      case 2:
        return <DataBaseField {...this.props} handleState={this.handleState} />
      default:
        return <AllField {...this.props} handleState={this.handleState} onToggle={this.props.onToggle} />
    }
  }
}

class AddType extends Component {
  state = {
    typeData: [],
    typeId: 0,
  }

  componentDidMount() {
    indexManager.check()
      .then(({ data }) => {
        this.setState({
          typeData: data.data,
        })
      })
  }

  handlePickType = (value) => {
    this.setState({
      typeId: value,
    })
  }

  handleSave = () => {
    const { typeName } = this.refs
    const { typeId } = this.state
    type.add(`name=${typeName.input.value}&indexId=${typeId}`)
      .then(({ data }) => {
        if (data.code === 0) {
          this.props.onToggle()
        } else {
          Modal.error({
            title: data.msg,
          })
        }
      })
      .catch(err => {
        Modal.error({
          title: '操作失败!',
          content: err.msg,
        })
      })
  }

  backList = () => {
    const self = this
    const { typeName } = self.refs
    const { typeId } = self.state
    if (typeName.input.value !== "" || typeId !== 0) {
      confirm({
        title: '提示',
        content: '返回列表将会丢失未保存的数据',
        onOk() {
          self.props.onToggle()
        },
        onCancel() {
          console.log('cancel')
        },
      })
    } else {
      self.props.onToggle()
    }
  }

  render() {
    const { typeData } = this.state
    return (
      <div>
        <h3>新增TYPE</h3>
        <div className="form-row">
          <label className="ant-form-item-required editor-title">名称</label>
          <Input ref="typeName" placeholder="最多不超过50个字符" style={inputWidth} />
          <label className="ant-form-item-required editor-title">关联索引</label>
          <Select onChange={this.handlePickType} style={{ width: 200 }}>
            {typeData.map(item => <Option
              value={item.id}
              title={`支持语义分词:${item.lexemeTokenize ? '是' : '否'};  多国语言:${item.i18n ? '是' : '否'};  状态:${item.status ? '有效' : ' 无效'};`}
              key={item.id}>{item.name}</Option>)}
          </Select>
          <Alert message="名称、关联索引保存后不可进行修改" banner style={{ width: '55%', marginLeft: '5%' }} />
          <div className="form-row text-align-center">
            <Button onClick={this.handleSave} type="primary">保存</Button>
            <Button onClick={this.backList}>返回列表</Button>
          </div>
        </div>
      </div>
    )
  }
}

class AddPage extends Component {
  render() {
    return (
      this.props.id ? <TypeTable id={this.props.id} onToggle={this.props.onToggle} /> :
        <AddType onToggle={this.props.onToggle} />
    )
  }
}

class IndexTypeManager extends Component {
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
      <div className="index-type-manager">
        {showAddPage ? <AddPage onToggle={this.onShowAddPage} {...record} /> :
          <Overview onToggle={this.onShowAddPage} onRecord={this.onRecord} />}
      </div>
    )
  }
}

export default IndexTypeManager
