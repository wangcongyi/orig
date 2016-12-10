import React from 'react'
import classnames from 'classnames'
import Button from '~/components/Button'
import Mask from '~/components/Mask'
import Rule from '~/components/Rule'
import Layout from './Layout'

const Reward = () => (
  <div className="wrap reward">
    <div className="other">15元红包</div>
    <div className="other">30元红包</div>
    <div>10元投资券</div>
    <div>30元投资券</div>
    <div className="other">50元红包</div>
    <div className="other">100元红包</div>
    <div>50元投资券</div>
    <div>100元投资券</div>
    <div className="other">所有红包+10元</div>
    <div className="other">红包翻倍</div>
    <div>188元投资券</div>
    <div>投资券翻倍</div>
  </div>
)

const Unmatch = ({ url }) => (
  <div className="panel no">
    <div className="front">
      <div className="box1 no-inv">
        <img src={url} />
      </div>
    </div>
  </div>
)

const Invest = ({ url, card, status }) => {
  return status == 'opened' ? <Open card={card} /> : <Match url={url} />

}

const Open = ({ card }) => {
  let color = '';
  switch (card.type + '') {
    case '1':
    case '3':
    case '4':
      color = 'bonus';
      break;
    case '2':
    case '5':
      color = 'invest'
  }
  return (
    <div className="panel no">
      <div className="front">
        <div className={classnames('box1', color)}>
          <p>{card.title}</p>
          <p>{card.desc}</p>
        </div>
      </div>
    </div>
  )
}

const Match = ({ url }) => (
  <div className="panel">
    <div className="front">
      <div className="box1">
        <img src={url} />
      </div>
    </div>
    <div className="back">
      <div className="box2 invest">
        <p>X 2</p>
        <p>获得所有投资券乘以2</p>
      </div>
    </div>
  </div>
)

const Plat = ({ welfare }) => (
  <div className="plat">
    {welfare.map((item, index) => {
      const status = item.status
      const url = status !== 'unmatch' ? `static/images/logo/${item.platformEnName}.png` : `static/images/logo/${item.platformEnName}2.png`
      const card = item.card
      return status !== 'unmatch' ? <Invest url={url} card={card} status={status} key={index} /> :
        <Unmatch url={url} key={index} />
    })}
  </div>
)

const Message = () => (
  <div className="mes">
    <div className="money">
      <h2>当前您赢得了 <strong>12351元</strong></h2>
      <p>红包奖励：23元*2+3*5元</p>
      <p>投资券：23元*2</p>
    </div>
    <span>................</span>
  </div>
)

const WelSection = ({ welfare }) => (
  <section>
    <h1>
      <span />红包专场<span />
    </h1>
    <p>活动期间，在以下平台首投满3000元（≥30天），可翻开对应平台牌子获得随机奖励，共设置以下12种不同奖励：</p>
    <Rule />
    <Reward />
    <Plat welfare={welfare} />
    <canvas id="c" />
    <div className="message"></div>
    <Message />
  </section>
)

const PlatformSection = ({ platform }) => (
  <section>
    <h1>
      <span />加息12%<span />
    </h1>
    <p>活动期间，在以下平台首投均享12%加息</p>
    <p>最长加息10天，加息金额最高2万元</p>
    <Rule title="活动规则" />
    <div className="wrap platform">
      {
        platform.map((item, index) => {
          const url = item.invested ? `static/images/logo/${item.platformEnName}2.png` : `static/images/logo/${item.platformEnName}.png`
          return (
            <div key={index} className={classnames(item.invested ? 'inves' : '')}>
              <img src={url} alt={item.platformCnName} />
            </div>
          )
        })
      }
    </div>
  </section>
)

const Footer = () => (
  <footer>
    <h1>
      <span />终极福利200元<span />
    </h1>
    <p>活动期间，首投平台满10家</p>
    <p>(每家投资≥3000元，≥10天)即可获得</p>
    <div></div>
    <p>终极福利奖励在活动结束后一周内统一发放</p>
  </footer>
)

const Welfare = ({ welfare, platform }) => (
  <Layout title="福利乐翻天" path="welfare">
    <Button />
    <WelSection welfare={welfare} />
    <PlatformSection platform={platform} />
    <Footer />
    <Mask rule="red" />
    <Mask rule="rate" />
  </Layout>
)

export default Welfare
