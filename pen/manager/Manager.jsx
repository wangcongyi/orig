import React, { Component } from 'react'
import { Input, Select, Table, Button, Divider, Icon, Modal, Radio } from 'antd'
import { indexSettings, domain, indexManager, type, filter, tokenizer, analyzer, normalizer, all } from '../../api'
import { uuid } from '../../helper'

const Option = Select.Option
const confirm = Modal.confirm
const RadioGroup = Radio.Group

class Overview extends Component {
  state = {
    data: [],
    total: 0,
    pageNo: 1,
    pageSize: 20,
    searchQ: '',
    lexemeTokenizeValue: '',
    i18nValue: '',
    statusValue: '',
    copyDialogVisible: false,
    copyIndexId: '',
    columns: [
      { title: 'ID', dataIndex: 'id', key: 'id', align: 'center' },
      { title: '索引名称', dataIndex: 'name', key: 'name', align: 'center' },
      {
        title: '支持语义分词',
        dataIndex: 'lexemeTokenize',
        key: 'lexemeTokenize',
        align: 'center',
        render: text => text === 1 ? '是' : '否',
      },
      { title: '多国语言', dataIndex: 'i18n', key: 'i18n', render: text => text === 1 ? '是' : '否', align: 'center' },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        render: text => text === 1 ? <span style={{ color: '#1ed14a' }}>有效</span> :
          <span style={{ color: '#ff0000' }}>无效</span>,
      },
      { title: '备注', dataIndex: 'description', key: 'description', align: 'center' },
      {
        title: '操作',
        key: 'action',
        align: 'center',
        render: (text, record, index) => (
          <span style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <a onClick={() => this.props.onRecord(record)}>编辑</a>
            <Divider type="vertical" />
            <a onClick={() => this.showSwitchModal(record.id)}>切换</a>
            <Divider type="vertical" />
            <a onClick={() => this.handleCopy(record.id)}>复制</a>
            <Divider type="vertical" />
            <a style={{ color: '#ff4d4f' }} onClick={() => this.handleDelete(record.id, index)}>删除</a>
          </span>
        ),
      },
    ],
  }

  componentDidMount() {
    this.loadOverviewIndexList()
  }

  handleCopy = (id) => {
    this.setState({
      copyDialogVisible: true,
      copyIndexId: id,
    })
  }

  handleCopyOk = () => {
    const { copyIndexId } = this.state
    const name = this.refs.newIndexName.input.value.trim()
    const param = `indexId=${copyIndexId}&name=${name}`
    indexManager.copy(param)
      .then(({ data }) => {
        this.setState({
          copyDialogVisible: false,
        })
        if (data.code !== 0) {
          Modal.error({
            title: '复制失败!',
            content: data.msg,
          })
        } else {
          Modal.success({
            title: '复制成功',
          })
        }
      })
      .finally(() => {
        this.loadOverviewIndexList()
      })
  }

  handleCopyCancel = (e) => {
    this.setState({
      copyDialogVisible: false,
    })
  }

  showSwitchModal = (id) => {
    const _this = this
    let timeID = ''
    const m = Modal.info({
      title: '提醒',
      content: (<div><p>正在测试中...</p><p>预计测试时间还有2s</p></div>),
      okText: '取消',
      onOk: () => {
        clearTimeout(timeID)
      },
    })

    timeID = setTimeout(() => {
      indexManager.applyOnline(`id=${id}`)
        .then(({ data }) => {
          if (data.code !== 0) {
            confirm({
              title: '链接失败',
              content: data.msg,
              okText: '重试',
              onOk() {
                _this.showSwitchModal(id)
              },
              onCancel() {
                m.destroy()
              },
            })
          } else {
            Modal.success({
              title: '链接成功!',
              content: '',
              onOk() {
                m.destroy()
              },
            })
          }
        })
    }, 2000)
  }

  loadOverviewIndexList() {
    indexManager.list()
      .then(({ data }) => {
        this.setState({
          data: data.data.data,
          total: data.data.total,
        })
      })
  }

  handlePageChange = (page, pageSize) => {
    indexManager.list(`pageNo=${page}&${this.state.searchQ}`)
      .then(({ data }) => {
        this.setState({
          data: data.data.data,
          total: data.data.total,
          pageNo: data.data.pageNo,
        })
      })
  }

  handlePageSize = (current, size) => {
    indexManager.list(`pageSize=${size}`)
      .then(({ data }) => {
        this.setState({
          data: data.data.data,
          total: data.data.total,
          pageSize: data.data.pageSize,
        })
      })
  }

  handleDelete = (id, index) => {
    const self = this
    confirm({
      title: '提醒',
      content: '确定删除该索引？',
      onOk() {
        indexManager.delete(id)
          .then(() => {
            Modal.success({
              title: '删除成功!',
              content: '',
            })
          })
          .then(() => {
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

  handleChangeStatus = (value, type) => {
    const o = {}
    o[type] = value
    this.setState(o)
  }

  handleSearch = () => {
    const { searchName, searchID } = this.refs
    const { lexemeTokenizeValue, i18nValue, statusValue } = this.state
    const searchQ = `name=${searchName.input.value}&id=${searchID.input.value}&i18n=${i18nValue}&lexemeTokenize=${lexemeTokenizeValue}&status=${statusValue}`

    indexManager.list(searchQ)
      .then(({ data }) => {
        this.setState({
          data: data.data.data,
          total: data.data.total,
          pageSize: data.data.pageSize,
          pageNo: 1,
          searchQ,
        })
      })
  }

  handleReSet = () => {
    const { searchName, searchID } = this.refs
    searchName.input.value = ''
    searchID.input.value = ''
    indexManager.list()
      .then(({ data }) => {
        this.setState({
          lexemeTokenizeValue: '',
          i18nValue: '',
          statusValue: '',
          data: data.data.data,
          total: data.data.total,
          pageNo: 1,
        })
      })
  }

  render() {
    const { columns, data, total, pageSize } = this.state
    return (
      <div className="index-manager-overview">
        <Button type="primary" className="float-right" style={{ top: 0 }} onClick={this.props.onToggle}>
          <Icon type="plus" />
          <span>新增</span>
        </Button>
        <h3>索引管理</h3>
        <div className="filter-wrapper">
          <p className="name-bottom-border">筛选</p>
          <div className="filter-row">
            <label>名称</label>
            <Input ref="searchName" placeholder="请输入关键字" style={{ width: 330 }} />
            <label>ID</label>
            <Input ref="searchID" placeholder="请输入ID" />
          </div>
          <div className="filter-row">
            <label>支持语义分词</label>
            <Select style={{ width: 120 }} onChange={(value) => this.handleChangeStatus(value, 'lexemeTokenizeValue')}>
              <Option value="1">是</Option>
              <Option value="0">否</Option>
            </Select>
            <label>多国语言</label>
            <Select style={{ width: 120 }} onChange={(value) => this.handleChangeStatus(value, 'i18nValue')}>
              <Option value="1">是</Option>
              <Option value="0">否</Option>
            </Select>
            <label>状态</label>
            <Select style={{ width: 120 }} onChange={(value) => this.handleChangeStatus(value, 'statusValue')}>
              <Option value="1">有效</Option>
              <Option value="0">无效</Option>
            </Select>
          </div>
          <div className="filter-row text-align-right" style={{ padding: '0 30px 0 0' }}>
            <Button type="primary" onClick={this.handleSearch}>查询</Button>
            <Button onClick={this.handleReSet}>重置</Button>
          </div>
        </div>
        <p className="name-bottom-border">索引列表</p>
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
        <Modal
          title="提示"
          visible={this.state.copyDialogVisible}
          onOk={this.handleCopyOk}
          onCancel={this.handleCopyCancel}
        >
          <div className="form-row">
            <Input placeholder="请输入索引名称（不超过50个字符）" style={{ width: 320 }} ref="newIndexName" />
          </div>
        </Modal>
      </div>
    )
  }
}

class AddPage extends Component {
  state = {
    statusValue: '',
    baseValue: '',
    lexemeTokenizeValue: '',
    i18nValue: '',
    baseIndexMaps: [],
    typeData: [],
    selectDomainData: [],
    domainDialogVisible: false,
    domainData: [],
    domainSelectColumns: [
      { title: 'ID', dataIndex: 'id', key: 'id', align: 'center' },
      { title: '域名', dataIndex: 'domain', key: 'domain', align: 'center' },
      { title: '渠道编码', dataIndex: 'pipelineCode', key: 'pipelineCode', align: 'center' },
      { title: '语言', dataIndex: 'language', key: 'language', align: 'center' },
    ],
    domainColumns: [
      { title: 'ID', dataIndex: 'id', key: 'id', align: 'center' },
      { title: '域名', dataIndex: 'domain', key: 'domain', align: 'center' },
      { title: '渠道编码', dataIndex: 'pipelineCode', key: 'pipelineCode', align: 'center' },
      { title: '语言', dataIndex: 'language', key: 'language', align: 'center' },
      { title: '平台标识', dataIndex: 'agents', key: 'agents', align: 'center' },
      {
        title: '操作',
        key: 'action',
        align: 'center',
        render: (text, record, index) =>
          <a style={{ color: '#ff4d4f' }} onClick={() => this.handleDeleteDomain(record.id, index)}>删除</a>,
      },
    ],
    rowSelection: {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectDomainData: selectedRows,
        })
      },
      getCheckboxProps: record => ({
        name: record.name,
      }),
    },
  }

  componentDidMount() {
    const { domainIds } = this.props
    all([indexSettings.listAll(), type.check()])
      .then(data => {
        this.setState({
          baseIndexMaps: data[0].data.data,
          typeData: data[1].data.data.data,
        })
      })

    if (domainIds) {
      let d = []
      domain.listAll()
        .then(({ data }) => {
          d = data.data.filter((item, index) => {
            if (domainIds.indexOf(item.id) !== -1) return item
          })
          this.setState({
            selectDomainData: d,
          })
        })
    }
  }

  domainDialogVisible = () => {
    domain.query()
      .then(({ data }) => {
        this.setState({
          domainData: data.data.data,
          domainDialogVisible: true,
        })
      })

  }

  domainHandleOk = (e) => {
    this.setState({
      domainDialogVisible: false,
    })
  }

  domainHandleCancel = (e) => {
    this.setState({
      domainDialogVisible: false,
    })
  }

  handleDeleteDomain = (_, index) => {
    this.state.selectDomainData.splice(index, 1)
    this.setState({
      selectDomainData: this.state.selectDomainData,
    })
  }

  onChangeStatus = (e, type) => {
    const o = {}
    o[type] = e.target.value
    this.setState(o)
  }

  onChangeAgents = (value) => {
    this.setState({
      baseValue: value,
    })
  }

  handleSaveAndUpdate = () => {
    const { n, f, t, a, name } = this.refs
    // TODO; 这写法太丑了， 先这么写着~~   update at few days later: still don't know how to write better
    const { statusValue, lexemeTokenizeValue, i18nValue, baseValue, selectDomainData } = this.state
    const { id, settingsId, status = 0, i18n = 0, lexemeTokenize = 0 } = this.props
    const tu = statusValue === '' ? status : statusValue
    const se = baseValue === '' ? settingsId : baseValue
    const sl = lexemeTokenizeValue === '' ? lexemeTokenize : lexemeTokenizeValue
    const si = i18nValue === '' ? i18n : i18nValue
    const nd = uuid(n.state.selectData, 'id')
    const fd = uuid(f.state.selectData, 'id')
    const td = uuid(t.state.selectData, 'id')
    const ad = uuid(a.state.selectData, 'id')
    const dd = uuid(selectDomainData, 'id')
    const q = `name=${name.input.value}&i18n=${si}&lexemeTokenize=${sl}&status=${tu}`
    const d = `&normalizerIds=${nd}&filterIds=${fd}&tokenizerIds=${td}&analyzerIds=${ad}&domainIds=${dd}&settingsId=${se}`
    let m = id ? 'update' : 'add'
    let s = id ? q + d + `&id=${id}` : q + d
    indexManager[m](s)
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
    const {
      baseIndexMaps, domainColumns, domainData,
      typeData, rowSelection, i18nValue, domainSelectColumns,
      domainDialogVisible, selectDomainData,
    } = this.state


    const { name, i18n, lexemeTokenize, status, analyzerIds, filterIds, normalizerIds, tokenizerIds, domainIds, settingsId } = this.props
    return (
      <div className="add-filter-form">
        <h3>{name ? '修改索引' : '新增索引'}</h3>
        <div className="form-row">
          <label className="ant-form-item-required editor-title">名称</label>
          <Input ref="name" style={{ width: 320 }} defaultValue={name} placeholder="最多不超过50个字符" />
        </div>
        <div className="form-row">
          <label className="ant-form-item-required editor-title">状态</label>
          <RadioGroup defaultValue={status} onChange={(e) => this.onChangeStatus(e, 'statusValue')}>
            <Radio value={1}>有效</Radio>
            <Radio value={0}>无效</Radio>
          </RadioGroup>
        </div>
        <div className="form-row">
          <label className="ant-form-item-required editor-title">支持语义分词</label>
          <RadioGroup defaultValue={lexemeTokenize} onChange={(e) => this.onChangeStatus(e, 'lexemeTokenizeValue')}>
            <Radio value={1}>是</Radio>
            <Radio value={0}>否</Radio>
          </RadioGroup>
        </div>
        <div className="form-row">
          <label className="ant-form-item-required editor-title">多国语言</label>
          <RadioGroup defaultValue={i18n || 0} onChange={(e) => this.onChangeStatus(e, 'i18nValue')}>
            <Radio value={1}>是</Radio>
            <Radio value={0}>否</Radio>
          </RadioGroup>
        </div>
        <div className="form-row">
          <label className="ant-form-item-required editor-title">基本设置</label>
          <Select defaultValue={settingsId} style={{ width: 320 }} placeholder="请选择"
                  onChange={this.onChangeAgents}>
            {baseIndexMaps.map(item => <Option
              title={`分片数：${item.shards}；副本数：${item.replicas}；最大窗口数：${item.maxResultWindow}。`}
              value={item.id}
              key={item.id}>{item.name} </Option>)
            }
          </Select>
        </div>
        <div className="form-row">
          <p className="name-bottom-border">
            <label className="editor-title">domain设置</label>
            <a disabled={domainIds ? !domainIds : !i18nValue} onClick={this.domainDialogVisible}>选择domain</a>
          </p>
          {selectDomainData.length >= 1 &&
          <Table
            rowKey={record => record.id}
            columns={domainColumns}
            dataSource={selectDomainData}
            bordered
            size="small"
            style={{ width: '60%' }}
            pagination={false}
          />}
        </div>
        <div className="form-row">
          <p className="name-bottom-border">分词设置</p>
          <ParticipleSet ref="n" name="归一化器" api={normalizer} ids={normalizerIds} />
          <ParticipleSet ref="f" name="过滤器" api={filter} ids={filterIds} />
          <ParticipleSet ref="t" name="分词器" api={tokenizer} ids={tokenizerIds} />
          <ParticipleSet ref="a" name="分析器" api={analyzer} ids={analyzerIds} />
        </div>
        {typeData > 0 && <div className="form-row"><p className="name-bottom-border">type设置</p></div>}
        <div className="form-row text-align-center">
          <Button onClick={this.handleSaveAndUpdate} type="primary">保存</Button>
          <Button onClick={this.props.onToggle}>返回列表</Button>
        </div>
        <Modal
          title="domain列表"
          width={730}
          visible={domainDialogVisible}
          onCancel={this.domainHandleCancel}
          wrapClassName="new-index-dialog"
          footer={[<Button key="submit" type="primary" onClick={this.domainHandleOk}>确定</Button>]}
        >
          <Table
            rowKey={record => record.id}
            rowSelection={rowSelection}
            columns={domainSelectColumns}
            dataSource={domainData}
            bordered
            size="small"
          />
        </Modal>
      </div>
    )
  }
}

class ParticipleSet extends Component {
  state = {
    data: [],
    total: 0,
    pageSize: 10,
    selected: [],
    pageNo: 1,
    selectData: [],
    selectedRowKeys: [],
    visibility: false,
    dataColumns: [
      { title: 'id', dataIndex: 'id', key: 'type', align: 'center' },
      { title: '名称', dataIndex: 'name', key: 'name', align: 'center' },
    ],
    participleColumns: [
      { title: 'id', dataIndex: 'id', key: 'type', align: 'center' },
      { title: '名称', dataIndex: 'name', key: 'name', align: 'center' },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        align: 'center',
        render: (text, record, index) =>
          <a style={{ color: '#ff4d4f' }} onClick={() => this.handleDelete(record.id, index)}>删除</a>,
      },
    ],
  }

  componentDidMount() {
    const { api, ids } = this.props
    let k = [], d = []
    if (ids) {
      api.listAll()
        .then(({ data }) => {
          d = data.data.filter((item, index) => {
            if (ids.indexOf(item.id) !== -1) {
              k[k.length] = index
              return item
            }
          })
          this.setState({
            selectData: d,
            selected: d,
          })
        })
    }
  }

  participle = () => {
    const { api, query = '' } = this.props
    api.check(query + '&pageSize=10')
      .then(({ data }) => {
        this.setState({
          data: data.data.data,
          total: data.data.total,
          visibility: true,
          pageNo: 1,
        })
      })
  }

  handlePageChange = (page, pageSize) => {
    const { api, query = '' } = this.props
    api.check(query + `&pageSize=10&pageNo=${page}`)
      .then(({ data }) => {
        this.setState({
          data: data.data.data,
          total: data.data.total,
          pageNo: data.data.pageNo,
        })
      })
  }

  handleSelect = () => {
    this.setState({
      visibility: false,
      selected: this.state.selectData,
    })
  }

  handleDelete = (key, index) => {
    this.state.selectData.splice(index, 1)
    const k = this.state.selectedRowKeys.filter(item => item !== key)
    this.setState({
      selectData: this.state.selectData,
      selectedRowKeys: k,
    })
  }

  select = (selectedRowKeys, rows) => {
    const t = selectedRowKeys.map(item => JSON.parse(item))
    this.setState({
      selectedRowKeys,
      selectData: t,
    })
  }

  handleCancel = () => {
    const { selected } = this.state
    this.setState({
      visibility: false,
      selectData: selected,
      selectedRowKeys: [],
    })
  }

  render() {
    const { name } = this.props
    const { data, dataColumns, total, visibility, selectedRowKeys, selectData, participleColumns } = this.state
    const rowSelection = { selectedRowKeys, onChange: this.select }
    return (
      <div className="form-row">
        <p className="name-bottom-border">
          <label className="editor-title">{name}</label>
          <a onClick={this.participle}>{`选择${name}`}</a>
        </p>
        {selectData.length >= 1 &&
        <Table
          rowKey={record => JSON.stringify(record)}
          columns={participleColumns}
          dataSource={selectData}
          bordered
          size="small"
          style={{ width: '60%' }}
          pagination={false}
        />}
        <Modal
          title={`${name}列表`}
          width={730}
          closable={false}
          visible={visibility}
          onCancel={this.handleCancel}
          onOk={this.handleSelect}
        >
          <Table
            rowKey={record => JSON.stringify(record)}
            rowSelection={rowSelection}
            columns={dataColumns}
            dataSource={data}
            bordered
            size="small"
            pagination={{
              total: total,
              onChange: this.handlePageChange,
            }}
          />
        </Modal>
      </div>
    )
  }
}

class IndexManager extends Component {
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
      showAddPage: !this.state.showAddPage,
      record: record,
    })
  }

  render() {
    const { showAddPage, record } = this.state
    return (
      <div className="index-manager">
        {showAddPage ? <AddPage onToggle={this.onShowAddPage} {...record} /> :
          <Overview onToggle={this.onShowAddPage} onRecord={this.onRecord} />}
      </div>
    )
  }
}

export default IndexManager
