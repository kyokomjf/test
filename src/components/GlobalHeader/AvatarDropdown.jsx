import { LogoutOutlined, SettingOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import React from 'react';
import { history, connect } from 'umi';
import defaultSettings from '@/../config/defaultSettings';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

const { ssoUrl } = defaultSettings;

class AvatarDropdown extends React.Component {
  onMenuClick = (event) => {
    const {
      currentUser = {
        account: '',
      },
    } = this.props;
    const { key } = event;

    if (key === 'logout') {
      const { dispatch } = this.props;

      if (dispatch) {
        dispatch({
          type: 'login/logout',
        });
      }

      return;
    }

    if (key === 'changePassword') {
      const portalUrl = new URL(ssoUrl[REACT_APP_ENV]);
      window.location.href = `${portalUrl.origin}/portal/user/password/${currentUser.account}`;
      return;
    }

    history.push(`/account/${key}`);
  };

  render() {
    const {
      currentUser = {
        avatar: '',
        name: '',
      },
      menu,
    } = this.props;
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        {menu && (
          <Menu.Item key="center">
            <UserOutlined />
            个人中心
          </Menu.Item>
        )}
        {menu && (
          <Menu.Item key="settings">
            <SettingOutlined />
            个人设置
          </Menu.Item>
        )}
        {menu && <Menu.Divider />}

        {currentUser?.allowLocalLogin && (
          <Menu.Item key="changePassword">
            <LockOutlined />
            修改密码
          </Menu.Item>
        )}

        <Menu.Item key="logout">
          <LogoutOutlined />
          退出登录
        </Menu.Item>
      </Menu>
    );
    return currentUser?.name ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="small" className={styles.avatar} alt="avatar">
            {currentUser.name[0]}
          </Avatar>
          <span className={styles.name}>{currentUser.name}</span>
        </span>
      </HeaderDropdown>
    ) : (
      <span className={`${styles.action} ${styles.account}`}>
        <Spin
          size="small"
          style={{
            marginLeft: 8,
            marginRight: 8,
          }}
        />
      </span>
    );
  }
}

export default connect(({ user }) => ({
  currentUser: user.currentUser,
}))(AvatarDropdown);
