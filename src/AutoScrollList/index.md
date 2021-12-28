## AutoScrollList

倒计时组件

```tsx
import React from 'react';
import classnames from 'classnames';
import { AutoScrollList } from '@shenggao/rc';
import './index.less';

const mockData = Array.from({ length: 30 })
  .fill('')
  .map((ele, index) => {
    return {
      label: `天龙八部${index}`,
      value: index + 1,
    };
  });

export default () => (
  <div className="app">
    <AutoScrollList<{ label: string; value: number }>
      className="container"
      renderItem={(item, index, active) => {
        const classNames = classnames('listItem', active ? 'active' : 'normal');
        return <div className={classNames}>{item.label}</div>;
      }}
      keyExtractor={(item, index) => `${index}`}
      data={mockData}
      timeInterval={1000}
    />
  </div>
);
```
