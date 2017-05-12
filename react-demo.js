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
