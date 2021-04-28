import { Tooltip, Tag } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { useSelector } from 'umi';
import { getToken } from '@/utils/token';
import Avatar from './AvatarDropdown';
import styles from './index.less';

const ENVTagColor = {
  dev: 'orange',
  test: 'green',
  pre: '#87d068',
};

const GlobalHeaderRight = () => {
  const settings = useSelector((state) => state.settings);
  const { theme, layout } = settings;
  const appInfo = useSelector((state) => state.global.appInfo);
  let className = styles.right;

  if (theme === 'dark' && layout === 'topmenu') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div className={className}>
      <Avatar />
      {appInfo.help === 1 && (
        <Tooltip title="使用文档">
          <a
            href={`/api/manager/apps/${appInfo.code}/help?token=${getToken()}`}
            className={styles.action}
            download
          >
            <QuestionCircleOutlined />
          </a>
        </Tooltip>
      )}
      {REACT_APP_ENV !== 'pro' && (
        <span>
          <Tag color={ENVTagColor[REACT_APP_ENV]}>{REACT_APP_ENV}</Tag>
        </span>
      )}
    </div>
  );
};

export default GlobalHeaderRight;
