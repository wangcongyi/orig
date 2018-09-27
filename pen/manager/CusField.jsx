import React, { Component } from 'react'
import { Button, Input, Select, Table, Divider, Icon, Modal, List, Checkbox } from 'antd'
import { type, common, modules, events, normalizer, all } from '../../api'
import analyzer from '../../api/analyzer'

const Option = Select.Option
const { TextArea } = Input
const inputWidth = { width: 280 }
const divStyle = { display: 'flex', width: '100%', justifyContent: 'space-around' }

class CusField extends Component {
  state = {
    parentIds: [],
    parentIDValue: '',
    typeValue: '',
    platforms: [],
    modulesType: [],
    eventsType: [],
    modulesNum: [],
    uid: 0,
    indexed: 1,
    store: 1,
    i18n: 0,
    raw: 0,
    query: 1,
    sortable: 0,
    queryType: [],
    hit: [],
    lexemeType: '',
    weight: '',
    columnType: '',
    cu: 0,
    ci: 0,
    iu: 0,
    ii: 0,
    qt: [],
  }

  componentDidMount() {
    const { id } = this.props
    all([
      type.typeField(id),
      common.getAttribute('type=platform'),
      modules.check(),
      events.check(),
      common.getAttribute('type=queryType'),
    ])
      .then(data => {
        this.setState({
          parentIds: data[0].data.data,
          platforms: data[1].data.data,
          modulesType: data[2].data.data.data,
          eventsType: data[3].data.data.data,
          qt: data[4].data.data,
        })
      })
  }

  handleAddModule = () => {
    this.state.modulesNum.push(1)
    this.setState({
      modulesNum: this.state.modulesNum,
    })
  }

  handleSave = () => {
    const { id, fieldID } = this.props
    let moduleEvents = []
    const {
      name, remark, copyTo, format,
      aggDistinct, aggSize, modifier, weight,
      boost, columnName, params,
      n, a, s,
    } = this.refs
    const { parentIDValue, lexemeType, cu, ci, iu, ii, modulesNum } = this.state
    const normalizer = n.state.defaultName !== '-------' ? n.state.defaultName : ''
    const analyzer = a.state.defaultName !== '-------' ? a.state.defaultName : ''
    const searchAnalyzer = s.state.defaultName !== '-------' ? s.state.defaultName : ''
    const {
      i18n = this.props.i18n,
      uid = this.props.uid,
      indexed = this.props.indexed,
      store = this.props.store,
      raw = this.props.raw,
      query = this.props.query,
      sortable = this.props.sortable,
    } = this.state

    const queryType = this.props.queryType ? this.props.queryType : this.state.queryType.join(',')
    const hit = this.props.hit ? this.props.hit : this.state.hit.join(',')

    modulesNum.forEach((_, index) => {
      const a = this.refs[`module${index}`].state.beforeName
      const b = this.refs[`module${index}`].state.afterName
      a !== '' && moduleEvents.push({ type: 1, eventId: a })
      b !== '' && moduleEvents.push({ type: 2, eventId: b })
    })
    const typeValue = this.props.type || this.state.typeValue
    const columnType = this.state.columnType === '' ? this.props.columnType : this.state.columnType
    const m = fieldID ? 'updateField' : 'addField'
    const q = {
      id: fieldID,
      typeId: id, parentId: parentIDValue, name: name.input.value, type: typeValue,
      uid, indexed, store, i18n, raw, query, sortable, columnType, normalizer, analyzer, searchAnalyzer,
      copyTo: copyTo.input.value,
      format: format.input.value,
      queryType, hit, lexemeType,
      aggDistinct: aggDistinct.input.value,
      aggSize: aggSize.input.value,
      modifier: modifier.input.value,
      boost: boost.input.value,
      weight: weight.input.value,
      columnName: columnName.input.value,
      params: params.textAreaRef.value,
      remark: remark.input.value,
      canalUpdate: cu,
      canalIgnore: ci,
      indexUpdate: iu,
      indexIgnore: ii,
      moduleEvents,
    }

    type[m](q)
      .then(({ data }) => {
        if (data.code === 0) {
          this.props.handleState()
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

  handleCheck = (e, v) => {
    const o = {}
    o[v] = e.target.checked ? 1 : 0
    this.setState(o)
  }

  handleState = (v, t) => {
    const o = {}
    o[t] = v
    this.setState(o)
  }

  render() {
    const { parentIds, platforms, modulesType, modulesNum, eventsType, qt } = this.state
    const {
      id, name, remark, type, parentId, columnName, columnType, aggDistinct,
      aggSize, boost, format, copyTo, params, weight, lexemeType,
      modifier, canalIgnore, canalUpdate, indexIgnore, indexUpdate,
      uid, indexed, store, i18n, raw, query,
      analyzer, normalizer, searchAnalyzer,
    } = this.props
    const queryType = this.props.queryType ? this.props.queryType.split(',') : []
    const hit = this.props.hit ? this.props.hit.split(',') : []

    return (
      <div className="add-type-form">
        <h3>自定义添加field</h3>
        <div className="form-row">
          <label className="ant-form-item-required editor-title">名称</label>
          <Input defaultValue={name} ref="name" style={inputWidth} placeholder="最多不超过50个字符" />
          <label className="editor-title">说明</label>
          <Input defaultValue={remark} ref="remark" style={inputWidth} />
        </div>
        <div className="form-row">
          <label className="ant-form-item-required editor-title">类型</label>
          <Select defaultValue={type} onChange={(e) => this.handleState(e, 'typeValue')} style={inputWidth}>
            <Option value="text">text</Option>
            <Option value="keyword">keyword</Option>
            <Option value="integer">integer</Option>
            <Option value="double">double</Option>
            <Option value="float">float</Option>
            <Option value="nested">nested</Option>
            <Option value="completion">completion</Option>
          </Select>
          <label className="editor-title">parent id</label>
          <Select defaultValue={parentId} onChange={(e) => this.handleState(e, 'parentIDValue')} style={inputWidth}>
            {parentIds.map(item => (<Option key={item.id} value={item.id}>{item.name}</Option>))}
          </Select>
        </div>
        <div className="form-row">
          <label className="editor-title">关联搜索类型</label>
          <Select
            mode="multiple"
            defaultValue={queryType}
            onChange={(e) => this.handleState(e, 'queryType')}
            style={inputWidth}
          >
            {qt.map(item => (<Option key={item.id} value={item.attrName}>{item.attrName}</Option>))}
          </Select>
          <label className="editor-title">数据格式化</label>
          <Input defaultValue={format} ref="format" style={inputWidth} />
          <label className="editor-title">拷贝到字段</label>
          <Input defaultValue={copyTo} ref="copyTo" style={inputWidth} />
        </div>
        <div className="form-row">
          <label className="editor-title">命中</label>
          <Select mode="multiple" defaultValue={hit} onChange={(e) => this.handleState(e, 'hit')} style={inputWidth}>
            {platforms.map((item) => <Option value={item.attrName} key={item.attrName}>{item.attrName}</Option>)}
          </Select>
          <label className="editor-title">词义类型</label>
          <Select defaultValue={lexemeType} onChange={(e) => this.handleState(e, 'lexemeType')} style={inputWidth}>
            <Option value="int">int</Option>
            <Option value="varchar">varchar</Option>
            <Option value="smallint">smallint</Option>
            <Option value="float">float</Option>
            <Option value="timestamp">timestamp</Option>
          </Select>
          <label className="editor-title">查询权重</label>
          <Input defaultValue={weight} ref="weight" style={inputWidth} />
        </div>
        <div className="form-row">
          <label className="editor-title">相关性加权</label>
          <Input ref="boost" style={inputWidth} defaultValue={boost} />
        </div>
        <div className="form-row">
          <label className="editor-title">是否 type 主键</label>
          <Select onChange={(e) => this.handleState(e, 'uid')} defaultValue={uid || 0} style={inputWidth}>
            <Option value={1}>是</Option>
            <Option value={0}>否</Option>
          </Select>
          <label className="editor-title">是否需要索引</label>
          <Select onChange={(e) => this.handleState(e, 'indexed')} defaultValue={indexed || 1} style={inputWidth}>
            <Option value={1}>是</Option>
            <Option value={0}>否</Option>
          </Select>
          <label className="editor-title">是否存储</label>
          <Select onChange={(e) => this.handleState(e, 'store')} defaultValue={store || 1} style={inputWidth}>
            <Option value={1}>是</Option>
            <Option value={0}>否</Option>
          </Select>
        </div>
        <div className="form-row">
          <label className="editor-title">i18n</label>
          <Select onChange={(e) => this.handleState(e, 'i18n')} defaultValue={i18n || 0} style={inputWidth}>
            <Option value={1}>是</Option>
            <Option value={0}>否</Option>
          </Select>
          <label className="editor-title">是否保留原生字段</label>
          <Select onChange={(e) => this.handleState(e, 'raw')} defaultValue={raw || 0} style={inputWidth}>
            <Option value={1}>是</Option>
            <Option value={0}>否</Option>
          </Select>
          <label className="editor-title">是否search查询该字段</label>
          <Select onChange={(e) => this.handleState(e, 'query')} defaultValue={query || 1} style={inputWidth}>
            <Option value={1}>是</Option>
            <Option value={0}>否</Option>
          </Select>
        </div>
        <div className="form-row">
          <label className="editor-title">聚合去重</label>
          <Input defaultValue={aggDistinct} ref="aggDistinct" style={inputWidth} />
          <label className="editor-title">聚合大小</label>
          <Input defaultValue={aggSize} ref="aggSize" style={inputWidth} />
          <label className="editor-title">算数符</label>
          <Input defaultValue={modifier} ref="modifier" style={inputWidth} />
        </div>
        <div className="form-row">
          <label className="editor-title">支持排序</label>
          <Select onChange={(e) => this.handleState(e, 'sortable')} style={inputWidth}>
            <Option value={1}>是</Option>
            <Option value={0}>否</Option>
          </Select>
          <label className="editor-title">db字段</label>
          <Input defaultValue={columnName} ref="columnName" style={inputWidth} />
          <label className="editor-title">db字段类型</label>
          <Select defaultValue={columnType} onChange={(e) => this.handleState(e, 'columnType')} style={inputWidth}>
            <Option value="int">int</Option>
            <Option value="varchar">varchar</Option>
            <Option value="smallint">smallint</Option>
            <Option value="float">float</Option>
            <Option value="timestamp">timestamp</Option>
          </Select>
        </div>
        <div className="form-row">
          <label className="editor-title">额外参数JSON</label>
          <TextArea defaultValue={params} ref="params" rows={15} style={{ width: '79%' }} />
        </div>
        <p className="name-bottom-border" style={{ marginTop: '50px' }}>选择设置</p>
        <List
          bordered
          header={<div style={divStyle}><span>类型</span><span>名称</span><span>操作</span></div>}
          dataSource={[
            <Item ref="n" typeName="归一化器" id={id} default={normalizer} />,
            <Item ref="a" typeName="分析器" id={id} default={analyzer} string />,
            <Item ref="s" typeName="搜索分析器" id={id} default={searchAnalyzer} string />,
          ]}
          renderItem={item => <List.Item>{item}</List.Item>}
        />
        <p className="name-bottom-border" style={{ marginTop: '50px' }}>
          <span>模块设置</span>
          <a onClick={this.handleAddModule}><Icon type="plus" />增加模块</a>
        </p>
        <div className="text-align-center" ref="module">
          {modulesNum.map((_, index) =>
            <AddModule
              ref={`module${index}`}
              key={index}
              modulesType={modulesType}
              eventsType={eventsType}
            />,
          )}
        </div>
        <p className="name-bottom-border" />
        <div className="form-row">
          <label style={{ marginRight: '20px' }}>canal</label>
          <Checkbox defaultChecked={canalUpdate} onChange={(e) => this.handleCheck(e, 'cu')} ref="cu">update</Checkbox>
          <Checkbox defaultChecked={canalIgnore} onChange={(e) => this.handleCheck(e, 'ci')} ref="ci">ignore</Checkbox>
        </div>
        <div className="form-row">
          <label style={{ marginRight: '20px' }}>index</label>
          <Checkbox defaultChecked={indexUpdate} onChange={(e) => this.handleCheck(e, 'iu')} ref="iu">update</Checkbox>
          <Checkbox defaultChecked={indexIgnore} onChange={(e) => this.handleCheck(e, 'ii')} ref="ii">ignore</Checkbox>
        </div>
        <div className="form-row text-align-center">
          <Button onClick={this.handleSave} type="primary">保存</Button>
          <Button onClick={this.props.handleState}>返回列表</Button>
        </div>
      </div>
    )
  }
}

class Item extends Component {
  state = {
    defaultName: this.props.default || '-------',
    tableData: [],
    visible: false,
    c: [
      { title: 'ID', dataIndex: 'id', align: 'center' },
      { title: '名称', dataIndex: 'name', align: 'center' },
    ],
  }

  handleAddItem = () => {
    const { id, string } = this.props
    const api = string ? analyzer : normalizer
    api.getListByTypeId(id)
      .then(({ data }) => {
        this.setState({
          tableData: data.data,
          visible: true,
        })
      })
  }

  onSelectChange = (keys, rows) => {
    this.setState({
      defaultName: rows[0].name,
    })
  }

  handleEvent = (n) => {
    const o = n ? { visible: false } : { visible: false, defaultName: '-------' }
    this.setState(o)
  }

  render() {
    const { defaultName, visible, tableData, c } = this.state
    const { typeName } = this.props
    const rowSelection = {
      type: 'radio',
      onChange: this.onSelectChange,
    }
    return (
      <div style={divStyle}>
        <span>{typeName}</span>
        <span>{defaultName}</span>
        <span>
          <a onClick={this.handleAddItem}>选择</a>
          <Divider type="vertical" />
          <a onClick={() => this.handleEvent(0)} style={{ color: '#ff4d4f' }}>删除</a>
        </span>
        <Modal
          title="分词管理列表"
          width={630}
          visible={visible}
          onCancel={() => this.handleEvent(0)}
          onOk={() => this.handleEvent(1)}
        >
          <Table
            rowKey={record => record.id}
            columns={c}
            rowSelection={rowSelection}
            dataSource={tableData}
            bordered
            size="small"
            pagination={false}
            style={{ height: 400, overflow: 'auto' }}
          />
        </Modal>
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
  }

  modulesType = (v) => {
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
        })
      })
  }

  handleEvent = (n, v) => {
    const o = {}
    const t = n ? 'afterName' : 'beforeName'
    o[t] = v
    this.setState(o)
  }

  render() {
    const { modulesType } = this.props
    const { beforeEvent, afterEvent } = this.state
    return (
      <div className="form-row">
        <Select onChange={this.modulesType} defaultValue="请选择" style={inputWidth}>
          {modulesType.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
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
        <Button type="danger" style={{ marginLeft: '50px' }}>删除</Button>
      </div>
    )
  }
}

export default CusField
