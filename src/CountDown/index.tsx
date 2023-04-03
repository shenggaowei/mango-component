import React, { useEffect, useState } from 'react';
import draggable from './core/draggle';
import './index.less';

const Input: React.FC = (props) => {
  return <input className="input" />;
};

const SetTimer: React.FC = (props) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  return (
    <div className="setTimerContainer">
      <div className="title">计时器</div>
      <div className="timer">
        <div className="button reduce" />
        {isEdit ? (
          <div className="inputTime">
            <Input />
          </div>
        ) : (
          <div
            className="showTime"
            onClick={() => {
              setIsEdit(!isEdit);
            }}
          >
            <div className="time">1</div>
            <div className="text">min</div>
          </div>
        )}
        <div className="button add" />
      </div>
      <div className="start">开始</div>
    </div>
  );
};

const TimerCount: React.FC = (props) => {
  return (
    <div className="countDownContainer">
      <div className="timeBig">8</div>
      <div className="pause">暂停</div>
    </div>
  );
};

export default () => {
  useEffect(() => {
    draggable({
      selector: '.wrapper',
    });
  }, []);
  return (
    <div className={'wrapper'}>
      <div className="head">
        <div className="reset">重置</div>
        <div className="close">关闭</div>
      </div>
      <div className="container">
        <SetTimer />
      </div>
    </div>
  );
};
