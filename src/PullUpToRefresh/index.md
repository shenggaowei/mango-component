```tsx
import React from 'react';
import classnames from 'classnames';
import { PullUpToRefresh } from 'mango-component';
import './index.test.less';

const initialData = () => {
  return Array.from({ length: 20 }).fill(1);
};

const sleep = async (time: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

const LoadingComponent: React.FC = () => {
  return <div>加载中。。。</div>;
};

const FinishedComponent: React.FC = () => {
  return <div>没有更多数据了</div>;
};

export default () => {
  const [list, setList] = React.useState(initialData);
  const [loading, setLoading] = React.useState(false);
  const [finished, setFinished] = React.useState(false);

  const onReachBottom = async () => {
    setLoading(true);
    await sleep(2000);
    setLoading(false);
    setList([...list, ...Array.from({ length: 20 })]);
  };

  return (
    <div className="app">
      <PullUpToRefresh
        loading={loading}
        finished={list.length === 100}
        loadingComponent={LoadingComponent}
        finishedComponent={FinishedComponent}
        wrapperClassName="pullUpToRefresh-wrapper"
        onReachBottom={onReachBottom}
      >
        <div className="pullUpToRefresh-content">
          {list.map((ele, index) => {
            return (
              <div className="list" key={index}>
                我是第{index + 1}条数据
              </div>
            );
          })}
        </div>
      </PullUpToRefresh>
    </div>
  );
};
```
