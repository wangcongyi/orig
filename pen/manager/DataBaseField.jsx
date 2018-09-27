import React, { Component } from 'react'
import { Select, Input, Table, Radio, Alert, Button, Icon, Modal } from 'antd'
import { datasource, type, events, all, modules } from '../../api'

const Option = Select.Option
const RadioGroup = Radio.Group
const inputWidth = { width: 320 }

class DataBaseField extends Component {
  state = {
    events: [],
    tables: [],
    selectedRowKeys: [],
    tableData: [],
    selectTableName: '',
    dataBaseId: 0,
    modulesType: [],
    eventsType: [],
    modulesNum: [],
    fields: [],
    checkType: [],
    columns: [
      { title: '数据库中名称', dataIndex: 'columnName', align: 'center', key: 'columnName' },
      { title: '数据库类型', dataIndex: 'columnType', align: 'center', key: 'columnType' },
      {
        title: 'field名称',
        align: 'center',
        key: 'name',
        dataIndex: 'columnName',
        render: (text, record) => (
          <Input defaultValue={record.name} onKeyUp={(e) => this.pushName(e, record)} style={{ width: 200 }} />),
      },
      {
        title: 'field字段类型',
        dataIndex: 'columnType',
        align: 'center',
        key: 'type',
        render: (text, record) => (
          <Select defaultValue={record.type} onChange={(value) => this.pushType(value, record)} style={{ width: 150 }}>
            <Option value="text">text</Option>
            <Option value="keyword">keyword</Option>
            <Option value="integer">integer</Option>
            <Option value="double">double</Option>
            <Option value="float">float</Option>
            <Option value="nested">nested</Option>
            <Option value="completion">completion</Option>
          </Select>
        ),
      },
      { title: '说明', dataIndex: 'remark', align: 'center', key: 'remark' },
    ],
  }

  componentDidMount() {
    all([modules.check(), events.check(), datasource.check('pageSize=100')])
      .then(data => {
        this.setState({
          modulesType: data[0].data.data.data,
          eventsType: data[1].data.data.data,
          events: data[2].data.data.data,
        })
      })
  }

  handleChange = (v) => {
    datasource.getListTable(v)
      .then(({ data }) => {
        this.setState({
          tables: data.data || [],
          dataBaseId: v,
        })
      })
  }

  handleRadio = (e) => {
    const { dataBaseId } = this.state
    datasource.getListColumn(dataBaseId, e.target.value)
      .then(({ data }) => {
        this.setState({
          selectTableName: e.target.value,
          tableData: data.data,
          selectedRowKeys: [],
        })
      })
  }

  SelectChange = (selectedRowKeys, rows) => {
    this.setState({
      selectedRowKeys,
      fields: rows,
    })
  }

  handleAddModule = () => {
    this.state.modulesNum.push(1)
    this.setState({
      modulesNum: this.state.modulesNum,
    })
  }

  handleSave = () => {
    const { id } = this.props
    const { tableName } = this.refs
    const { dataBaseId, modulesNum, fields } = this.state
    const moduleEvents = []
    modulesNum.forEach((_, index) => {
      const a = this.refs[`module${index}`].state.beforeName
      const b = this.refs[`module${index}`].state.afterName
      a !== '' && moduleEvents.push({ type: 1, eventId: a })
      b !== '' && moduleEvents.push({ type: 2, eventId: b })
    })
    const q = {
      typeId: id,
      typeTable: tableName.input.value,
      datasourceId: dataBaseId,
      moduleEvents,
      fields,
    }

    type.dataField(q)
      .then(({ data }) => {
        if (data.code === 0) {
          this.props.handleState()
        } else {
          Modal.error({
            title: data.msg,
          })
        }
      })

  }

  pushName = (e, b) => {
    b.name = e.target.value
  }

  pushType = (value, b) => {
    b.type = value
  }

  changeType = (v, m) => {
    const a = this.state.checkType
    const r = m ? a.concat([v]) : a.filter(item => item !== v)
    this.setState({
      checkType: r,
    })
  }

  render() {
    const {
      events, tables, tableData, columns,
      selectTableName, selectedRowKeys, modulesNum,
      modulesType, eventsType, checkType,
    } = this.state
    const rowSelection = { selectedRowKeys, onChange: this.SelectChange }
    return (
      <div className="data-base-field">
        <div className="form-row">
          <label className="editor-title">数据源</label>
          <Select onChange={this.handleChange} placeholder="请选择" style={inputWidth}>
            {events.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
          </Select>
        </div>
        <div className="form-row">
          <label className="editor-title" />
          <RadioGroup
            onChange={this.handleRadio}
            style={{ maxHeight: '300px', overflowY: 'scroll', border: '1px solid #ccc', padding: '25px' }}
          >
            {tables.map(item =>
              <div key={item} style={{ padding: '5px 0' }}>
                <Radio key={item} value={item}>{item}</Radio>
              </div>,
            )}
          </RadioGroup>
        </div>
        <div className="form-row">
          <label className="editor-title">数据源表名：</label>
          <Alert style={{ display: 'inline' }} message={selectTableName} type="info" />
        </div>
        <div className="form-row">
          <label className="ant-form-item-required editor-title">表名：</label>
          <Input ref="tableName" placeholder="请输入备注表名" style={inputWidth} />
        </div>
        <p className="name-bottom-border" style={{ marginTop: '50px' }}>
          <span>模块设置</span>
          <a onClick={this.handleAddModule}><Icon type="plus" />增加模块</a>
        </p>
        <div className="text-align-center">
          {modulesNum.map((_, index) =>
            <AddModule
              ref={`module${index}`}
              key={index}
              modulesType={modulesType}
              eventsType={eventsType}
              changeType={this.changeType}
              checkType={checkType}
            />,
          )}
        </div>
        <p className="name-bottom-border">数据源表中字段</p>
        <Table
          rowKey={record => record.columnName}
          rowSelection={rowSelection}
          dataSource={tableData}
          columns={columns}
          bordered
          size="small"
        />
        <div className="form-row text-align-center">
          <Button onClick={this.handleSave} type="primary">添加</Button>
          <Button onClick={this.props.handleState}>返回列表</Button>
        </div>
      </div>
    )
  }
}

class AddModule extends Component {
  state = {
    beforeEvent: [],
    afterEvent: [],
    beforeName: '',
    afterName: '',
    show: true,
    type: '',
  }

  modulesType = (v) => {
    this.props.changeType(v, 1)
    let a = []
    let b = []
    events.check(`moduleId=${v}`)
      .then(({ data }) => {
        data.data.data.forEach(item => {
          item.type === 1 && a.push(item)
          item.type === 2 && b.push(item)
        })
        this.setState({
          beforeEvent: a,
          afterEvent: b,
          type: v,
        })
      })
  }

  handleEvent = (n, v) => {
    const o = {}
    const t = n ? 'afterName' : 'beforeName'
    o[t] = v
    this.setState(o)
  }

  deleteItem = () => {
    const { type } = this.state
    this.setState({
      show: false,
    })
    this.props.changeType(type, 0)
  }

  render() {
    const { modulesType, checkType } = this.props
    const { beforeEvent, afterEvent, show } = this.state
    return show && (
      <div className="form-row">
        <Select onChange={this.modulesType} defaultValue="请选择" style={inputWidth}>
          {modulesType.map(item =>
            <Option disabled={checkType.includes(item.id)} key={item.id} value={item.id}>{item.name}</Option>)}
        </Select>
        <label>before事件：</label>
        <Select
          onChange={(v) => this.handleEvent(0, v)}
          disabled={beforeEvent.length <= 0}
          defaultValue="选择before事件"
          style={inputWidth}
        >
          {beforeEvent.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
        </Select>
        <label>after事件：</label>
        <Select
          onChange={(v) => this.handleEvent(1, v)}
          disabled={afterEvent.length <= 0}
          defaultValue="选择after事件"
          style={inputWidth}
        >
          {afterEvent.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
        </Select>
        <Button onClick={this.deleteItem} type="danger" style={{ marginLeft: '50px' }}>删除</Button>
      </div>
    )
  }
}

export default DataBaseField
