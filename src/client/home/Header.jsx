import React, { useEffect, useState } from 'react';
import Triangle from '~/common/Triangle';
import { getPageLink } from '~/utils/helper';
import { consult } from '~/utils/helper';
import SubNav from './SubNav';
import SubNavWork from './SubNavWork';
import './Header.less';
import SubNavWechat from './SubNavWechat';

// bgColor only for wechat

export default function Header({ page, showSubNav = false, type = 'fuli', navColor = '' }) {
  const [scrolled, setScolled] = useState(false);

  // const SubNavComp = type === 'fuli' ? SubNav : SubNavWork;
  let SubNavComp = null;
  switch (type) {
    case 'fuli': {
      SubNavComp = SubNav;
      break;
    }
    case 'work': {
      SubNavComp = SubNavWork;
      break;
    }
    case 'wechat': {
      SubNavComp = SubNavWechat;
      break;
    }
    default: {
      SubNavComp = SubNav;
    }
  }

  useEffect(() => {
    const onScroll = () => {
      if (window.pageYOffset > 10 && !scrolled) {
        setScolled(true);
      }
      if (window.pageYOffset === 0 && scrolled) {
        setScolled(false);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [setScolled, scrolled]);

  return (
    <div className={`ns-header-wrapper ${scrolled ? 'white' : ''}`}>
      <div className="ns-header clearfix">
        <div className="logo" onClick={() => (location.href = getPageLink('home'))}></div>
        <div className="nav-list clearfix">
          <div className="nav-item">
            <a
              href={page === 'home' ? '' : getPageLink('home')}
              className={page === 'home' ? 'active' : ''}
            >
              首页
            </a>
          </div>
          <div className="nav-item ">
            <a className={page === 'product-service' ? 'active' : ''}>
              产品
              <span style={{ marginLeft: 9 }}>
                <Triangle color={scrolled ? 'rgba(0, 0, 0, 0.65)' : 'white'} />
              </span>
            </a>
            <div className="sub-nav">
              <div>
                <div
                  className="sub-nav-title"
                  onClick={() => (location.href = getPageLink('fuli'))}
                >
                  <h2>
                    员工福利
                    <span className="nav-arrow">&gt;</span>
                  </h2>
                  <h3>打造全场景互联网+福利生态</h3>
                </div>
                {/* <div className="line"></div> */}
                <div
                  className="sub-nav-item first"
                  onClick={() => (location.href = getPageLink('txfuli'))}
                >
                  <span className="icon i1"></span>
                  弹性福利
                </div>
                <div
                  className="sub-nav-item"
                  onClick={() => (location.href = getPageLink('reward'))}
                >
                  <span className="icon i2"></span>
                  员工激励
                </div>
                <div
                  className="sub-nav-item"
                  onClick={() => (location.href = getPageLink('train'))}
                >
                  <span className="icon i3"></span>
                  在线培训
                </div>
                <div
                  className="sub-nav-item"
                  onClick={() => (location.href = getPageLink('culture'))}
                >
                  <span className="icon i4"></span>
                  企业文化
                </div>
              </div>
              <div>
                <div
                  className="sub-nav-title"
                  onClick={() => (location.href = getPageLink('work'))}
                >
                  <h2>
                    智慧办公 <span className="nav-arrow">&gt;</span>
                  </h2>
                  <h3>构建灵活高效企业办公平台</h3>
                </div>
                {/* <div className="line"></div> */}
                <div
                  className="sub-nav-item first"
                  onClick={() => (location.href = getPageLink('cowork'))}
                >
                  <span className="icon i5"></span>
                  协同办公
                </div>
                <div
                  className="sub-nav-item"
                  onClick={() => (location.href = getPageLink('signature'))}
                >
                  <span className="icon i6"></span>
                  电子签章
                </div>
                <div
                  className="sub-nav-item"
                  onClick={() => (location.href = getPageLink('collect'))}
                >
                  <span className="icon i7"></span>
                  数字化集采
                </div>
                <div className="sub-nav-item" onClick={() => (location.href = getPageLink('trip'))}>
                  <span className="icon i8"></span>
                  员工差旅
                </div>
              </div>
              <div>
                <div className="line" style={{ width: 440, margin: '12px 0' }}></div>
                <div
                  className="sub-nav-title"
                  onClick={() => (location.href = getPageLink('platform'))}
                >
                  <h2>
                    员工体验平台 <span className="nav-arrow">&gt;</span>
                  </h2>
                  <h3>打造未来职场生活方式</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="nav-item">
            <a className={page === 'solution' ? 'active' : ''}>
              解决方案
              <span style={{ marginLeft: 9 }}>
                <Triangle color={scrolled ? 'rgba(0, 0, 0, 0.65)' : 'white'} />
              </span>
            </a>
            <div className="sub-nav sub-nav-solution">
              <div>
                <div
                  className="sub-nav-item first"
                  onClick={() => (location.href = getPageLink('solution-fuli'))}
                >
                  <span className="icon s5"></span>
                  弹性福利
                </div>
                <div
                  className="sub-nav-item"
                  onClick={() => (location.href = getPageLink('solution-reward'))}
                >
                  <span className="icon s7"></span>
                  即时激励
                </div>
                <div
                  className="sub-nav-item"
                  onClick={() => (location.href = getPageLink('solution-festival'))}
                >
                  <span className="icon s8"></span>
                  年节福利
                </div>
                <div
                  className="sub-nav-item"
                  onClick={() => (location.href = getPageLink('solution-health'))}
                >
                  <span className="icon s6"></span>
                  保险体检
                </div>
              </div>
              <div>
                <div
                  className="sub-nav-item first"
                  onClick={() => (location.href = getPageLink('solution-train'))}
                >
                  <span className="icon s2"></span>
                  在线培训
                </div>
                <div
                  className="sub-nav-item"
                  onClick={() => (location.href = getPageLink('solution-trip'))}
                >
                  <span className="icon s3"></span>
                  企业差旅
                </div>
                <div
                  className="sub-nav-item"
                  onClick={() => (location.href = getPageLink('solution-work'))}
                >
                  <span className="icon s4"></span>
                  协同办公
                </div>
                <div
                  className="sub-nav-item"
                  onClick={() => (location.href = getPageLink('solution-food'))}
                >
                  <span className="icon s1"></span>
                  企业用餐
                </div>
              </div>
            </div>
          </div>
          <div className="nav-item">
            <a href={getPageLink('partner')} className={page === 'partner' ? 'active' : ''}>
              合作伙伴
            </a>
          </div>

          <div className="nav-item">
            <a href={getPageLink('open')} className={page === 'open' ? 'active' : ''}>
              开放平台
            </a>
          </div>
          <div className="nav-item">
            <a href={getPageLink('jj-fuli')} className={page === 'wechat' ? 'active' : ''}>
              企业微信
            </a>
          </div>
          <div className="nav-item">
            <a href={getPageLink('about')} className={page === 'about' ? 'active' : ''}>
              关于我们
            </a>
          </div>

          <div className="nav-item company-login">
            <div onClick={consult} className={`apply-btn ${scrolled ? 'scrolled' : ''}`}>
              申请试用
            </div>
            <a href="https://one.zuifuli.com/login">企业登录</a>
          </div>
        </div>
      </div>
      {!showSubNav ? null : <SubNavComp bgColor={navColor} fixed={scrolled === true} />}
    </div>
  );
}
