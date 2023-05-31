import React, { useEffect, useState, useCallback } from 'react';
import './Banner.less';

const mydata = [
  {
    image: '//static.zuifuli.com/images/newsite/banner-home1.png',
    link: '#apply-form',
    showButton: true,
  },
  // {
  //   image: '//static.zuifuli.com/images/new-year-2022.jpg',
  //   link: 'https://www.zuifuli.com/mkt/newyear2022.html',
  //   // showButton: false,
  // },
  // {
  //   image: '//static.zuifuli.com/images/banner-xman.png',
  //   link: '#',
  //   showButton: false,
  // },
];

export default function Banner() {
  const [index, setIndex] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState(mydata);

  useEffect(() => {
    if (clicked) return false;
    let timer = setInterval(() => {
      setIndex((i) => (i < data.length - 1 ? i + 1 : 0));
    }, 5000);
    return () => clearInterval(timer);
  }, [clicked, data]);

  useEffect(() => {
    setData(mydata);
  }, []);

  const onUserClick = useCallback((index) => {
    setClicked(true);
    setIndex(index);
  }, []);

  return (
    <div className="ns-banner">
      {data.map((item, idx) => (
        <div
          key={idx}
          style={{ backgroundImage: `url(${item.image})` }}
          className={`banner ${index === idx ? 'active' : ''}`}
        ></div>
      ))}

      <a href={data[index].link} target={data[index].link[0] == '#' ? '_self' : '_blank'}>
        <div className="content">
          <div className="btn-try" style={{ display: data[index].showButton ? '' : 'none' }}>
            申请试用
          </div>
        </div>
      </a>

      <div className="lines">
        {data.length > 1
          ? data.map((item, idx) => (
              <a
                key={idx}
                onClick={(e) => {
                  e.preventDefault();
                  onUserClick(idx);
                }}
              >
                <div
                  className={`line ${index == idx ? 'active' : ''} ${clicked ? 'clicked' : ''}`}
                ></div>
              </a>
            ))
          : null}
      </div>
      <div className="arc"></div>
    </div>
  );
}
