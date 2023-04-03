import React from 'react';
import classnames from 'classnames';
import './index.less';

export interface IPullUpToRefresh {
  wrapperClassName: string;
  onReachBottom: () => void;
  loadingComponent: React.FC;
  finishedComponent: React.FC;
  loading: boolean;
  finished: boolean;
}

const PullUpToRefresh: React.FC<IPullUpToRefresh> = (props) => {
  React.Children.only(props.children);
  const wrapperClass = classnames('wrapper_container', props.wrapperClassName);
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const footerRef = React.useRef<HTMLDivElement>(null);
  const footerHeight = footerRef.current?.offsetHeight ?? 0;
  const LoadingComponent = props.loadingComponent;
  const FinishedComponent = props.finishedComponent;
  const { loading, finished } = props;

  React.useEffect(() => {
    const scrollHandler: EventListener = () => {
      const { offsetHeight = 0, scrollTop = 0, scrollHeight = 0 } = wrapperRef.current || {};
      if (offsetHeight + scrollTop >= scrollHeight - footerHeight - 30) {
        props.onReachBottom();
      }
    };
    if (loading || finished) {
      wrapperRef.current?.removeEventListener('scroll', scrollHandler);
    } else {
      wrapperRef.current?.addEventListener('scroll', scrollHandler);
    }
    return () => {
      wrapperRef.current?.removeEventListener('scroll', scrollHandler);
    };
  }, [props.onReachBottom, loading, finished]);

  return (
    <div className={wrapperClass} ref={wrapperRef}>
      <div className="content_container" ref={contentRef}>
        {props.children}
      </div>
      <div className="footer" ref={footerRef}>
        {loading && LoadingComponent && <LoadingComponent />}
        {finished && FinishedComponent && <FinishedComponent />}
      </div>
    </div>
  );
};

export default PullUpToRefresh;
