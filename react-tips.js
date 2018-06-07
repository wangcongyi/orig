import React from 'react'
import { fmtAmount } from '~/common/helpers/fmt'
import { Modal } from 'antd-mobile'
import './index.less'

class PlanList extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object,
  }

  state = {
    visible: false,
  }

  onClose = () => {
    this.setState({
      visible: false,
    })
  }

  showModal = (e, bagInfo) => {
    e.preventDefault()
    e.stopPropagation()
    this.setState({
      visible: true,
      bagInfo: bagInfo,
    })
  }

  goToBid = (platID) => {
    this.context.router.push({
      pathname: '/libra/bidList',
      query: { platID: platID },
    })
  }

  renderModal() {
    const Content = ({ bagInfo }) => (
      <ul>
        {bagInfo.map((item, i) => (
          <li key={i}>
            <div>{item}</div>
          </li>
        ))}
      </ul>
    )
    return (
      <Modal
        title="&nbsp;"
        closable={false}
        prefixCls="bag-modal"
        transparent
        maskClosable={false}
        visible={this.state.visible}
        onClose={this.onClose}
        platform="ios"
      >
        <Content bagInfo={this.state.bagInfo} />
        <i className="icon icon-circle-close" onClick={this.onClose} />
      </Modal>
    )
  }

  renderDesc(desc) {
    return (
      <div className="plan-list-desc">{desc}</div>
    )
  }

  renderProgress(progress, amount) {
    return (
      <div className="plan-list-progress">完成进度：<em>{fmtAmount(progress)}</em>&nbsp;&#47;&nbsp;{fmtAmount(amount)}</div>
    )
  }

  renderBag(bag) {
    return (
      <section className="plan-list-bagwrap" onClick={e => this.showModal(e, bag)}>
        <div className="plan-list-bag" style={{ WebkitAnimation: `shake ${Math.floor(Math.random() * 3 + 2)}s ${Math.floor(Math.random() * 3 + 2)}s ease infinite` }} />
      </section>
    )
  }

  render() {
    const { data, canGotoBid, noShowProgress } = this.props
    return (
      <ul className="plan-list">
        {data.map((item, i) => (
          <li
            className="plan-list-item"
            key={i}
            onClick={canGotoBid && (() => this.goToBid(item.platID))}
          >
            <section className="plan-list-plat plan-list-level">
              {item.platID !== 'tzj' ?
                <img className="plan-list-logo" src={`https://static.touzhijia.com/m/platforms/recommend/${item.platID}.png`} role="presentation" /> :
                <div className="plan-list-tzj" />
              }
              {item.platID !== 'tzj' && <div>{`安全评级${item.platLevel}`}</div>}
            </section>
            <section className="plan-list-bid">
              <div className="plan-list-debt">投资定期满<em>{fmtAmount(item.planAmount)}</em>元</div>
              {item.recommend && this.renderDesc(item.recommend)}
              {!noShowProgress && this.renderProgress(item.investedAmount, item.planAmount)}
            </section>
            {!!item.lucky && this.renderBag(item.lucky)}
            {item.investedAmount >= item.planAmount && <div className="over" />}
          </li>),
        )}
        {this.renderModal()}
      </ul>
    )
  }
}

export default PlanList


//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
import React from 'react'
import { connect } from 'react-refetch'
import setPageTitle from '~/common/helpers/setPageTitle'
import PromiseStateContainer from '~/common/components/PromiseStateContainer'
import './index.less'

const ShowAmount = () => (
  <section>
    <cite>保留金额</cite>
    <div>
      <input className="input-normal" type="text" placeholder="账户保留金额" />
    </div>
  </section>
)

class AutoBuy extends React.Component {

  state = {
    showAmount: true,
    type: ['普通债权', '品牌债权'],
    period: ['1个月', '2个月', '3个月'],
    copies: ['最大份数', '自定义购买']
  }

  componentDidMount() {
    setPageTitle('自动购买')
  }
                                                     /* react有一个‘强制要求’ ：必须wrapper一个‘DIV’; */
                                                     /* 可以返回一个数组 */
                                                    /* Each child in an array or iterator should have a unique "key" prop */
                               
                                                        
  renderInput(stateType) {
    const s = this.state[`${stateType}`]
    const c = stateType === 'copies'
    return s.map((item, i) => {       <<<<<<<<----------- /* 2017-6-13 为了解决react遍历时候产生的key提醒 可以不直接返回数组 */
      return [                        <<<<<<<<----------- /* 2017-10-12 React 16版本已经可以返回数组和字符串了 */
        <input
          type={c ? 'radio' : 'checkbox'}
          id={`${stateType}${i}`}
          name={`${stateType}`}
          onChange={c ? (e) => this.changeCopies(e) : null}
        />,
        <label htmlFor={`${stateType}${i}`}>{item}</label>
      ]
    })
  }

  renderSection(classNames, cite) {
    const style = classNames === 'period' ? { "padding": 0 } : null
    return (
      <section className={classNames}>
        <cite>{cite}</cite>
        <div style={style}>
          {this.renderInput(classNames)}
          {classNames === 'type' ? <small>VIP特享</small> : null}
        </div>
      </section>
    )
  }

  changeCopies(e) {
    e.target.id === 'copies0' ? this.setState({ showAmount: false }) : this.setState({ showAmount: true })
  }

  render() {
    const { autoBuy } = this.props
    return (
      <PromiseStateContainer
        ps={autoBuy}
        onFulfillment={({ r }) => (
          <main className="auto-purchase">
            <section>
              <cite>可用余额</cite>
              <div><em>￥65.15</em></div>
            </section>
            {this.renderSection('type', '债权类型')}
            {this.renderSection('period', '债权期限')}
            {this.renderSection('copies', '购买份数')}
            <section>
              <cite>债权购买</cite>
              <div>
                <input className="input-normal" type="text" placeholder="每个债权购买份额" />
              </div>
            </section>
            {this.state.showAmount ? <ShowAmount /> : null}
            <section className="password">
              <cite>交易密码</cite>
              <div>
                <input className="input-normal" type="text" placeholder="请输入交易密码" />
                <a href="">忘记密码</a>
              </div>
            </section>
            <a id="save" href="">保存设置</a>
          </main>
        )}
      />
    )
  }
}

const autoBuy = {
  url: '/api/walletk/autoBuy',
  headers: {
    'x-auth-token': 'yFXQ8ELaeNjJfoYG7VMkAbHX5VnWormF'
  }
}

export default connect(() => ({
  autoBuy,
}))(AutoBuy)




///////////////////////////////////////////////////////////////////
//////////   react change tagName
//  根据参数不同 用于修改tagName
// const ToBillion = ({tag,data})=>{
//   let Ele = `${tag}`;
//   return (
//     <dd>
//       { data ? (~~data).toString().length>=5 ? <Ele>{(data/10000).toFixed(2)}<sub>亿元</sub></Ele> : <Ele>{data}<sub>万元</sub></Ele> : <NoDate/> }
//     </dd>
//   )
// }
////////////////////////////////////////////////////////////////
//    对react 组件默认参数写法 统一写法
// export default class Plat extends React.Component {
//   static defaultProps = {
//     a: "aaaaaa",
//     b: "bbbbbb",
//   }

////////////////////////   ****  import PropTypes from 'prop-types'  ****
//   static PropTypes = {
//     a: PropTypes.string,
//     b: PropTypes.string,
//   }
//     如果是 Functional Components 
//       Plat.propType = {
//          a: PropTypes.string,
//          b: PropTypes.ttring
//    }
////////////////////////////////////
//
//
//   state = {
//     aa: this.props.a,
//     bb: this.props.b,
//   }
//
//   handleAA() {
//     this.setState({
//       aa: "adasd",
//       bb: "asdsadasdsad",
//     })
//   }
//
//   render() {
//     return (
//       <div>
//         <div>{this.state.aa}</div>
//         <div>{this.state.bb}</div>
//         <button onClick={::this.handleAA}>hello</button>
//       </div>
//     )
//   }
// }
//////////////////////////////////////////////////////////////////////////////////////
//  react render collects for demo
//  useage   <Section data={data} />
// const data = [
//   {
//     a: '111',
//     b: '222',
//   },
//   {
//     a: '333',
//     b: '444',
//   },
// ]

// const Section = ({ data }) => (
//   <main>
//     {data.map(item => <Item {...item} />)}
//   </main>
// )
// const Item = ({ a, b }) => (
//   <section>
//     <div className="title">
//       <p>{a}</p>
//       <span>{b}</span>
//     </div>
//   </section>
// )

class SS extends React.Component {
  constructor() {
    super();
    this.state = {
      comments: []
    }
  }

  componentDidMount() {
    axios.get('./data.json')
      .then(({ data }) => this.setState({ comments: data }))
  }

  render() {
    return (
      <ul>
        {this.state.comments.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    )
  }
}



ReactDOM.render(
  <SS />,
  document.getElementById('app')
)


/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
// Dynamic import in Create React App

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

class Dynamic extends Component {
  constructor(props) {
    super(props);
    this.state = { module: null };
  }
  componentDidMount() {
    const { path } = this.props;
    import(`${path}`)
      .then(module => this.setState({ module: module.default }))
  }
  render() {
    const { module: Component } = this.state; // Assigning to new variable names @see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    return(
      <div>
        {Component && <Component />}
      </div>
    )
  }
}

ReactDOM.render(<Dynamic path='./App' />, document.getElementById('root'));
registerServiceWorker();



