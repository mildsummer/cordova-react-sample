import React from 'react';
import ReactDOM from 'react-DOM';

// react-router
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

// animation
import CSSTransitionGroup from 'react-addons-css-transition-group';

// react container
import IndexContainer from './containers/IndexContainer';
import FirstContainer from './containers/FirstContainer';
import SecondContainer from './containers/SecondContainer';

class App extends React.Component {
  render() {
    // ページの切り替えのアニメーションはCSSTransitionGroupを使うが、ここではページの階層に応じてアニメーションの向きを変える処理を行う

    // 子のルートをクローンする
    const route = React.cloneElement(this.props.children, {// ここにページに渡すpropsを入れる
      key: this.props.location.pathname.replace(/\d+/g, '*'), // ページごとに違うkeyを入れる（ただしIDなどは同じものとする）
      ref: 'current' // 子要素はrefを使って参照できる
    });
    const beforeLayer = this.refs.current ? this.refs.current.props.route.component.layer : undefined;// 現在のページの階層を取得
    const afterLayer = route.props.route.component.layer;// 開くページの階層を取得

    let transitionName = '';
    if (beforeLayer < afterLayer) {
      transitionName = 'slideLeft';
    } else if (beforeLayer > afterLayer) {
      transitionName = 'slideRight';
    } else if (typeof beforeLayer !== 'undefined' && typeof afterLayer !== 'undefined' && beforeLayer === afterLayer) {
      transitionName = 'fade';
    }

    return (
      <div>
        <CSSTransitionGroup
          component="div"
          transitionName={transitionName}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
          transitionEnter={true}
          transitionLeave={true}
        >
          {route}
        </CSSTransitionGroup>
      </div>
    );
  }
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={IndexContainer}/>
      <Route path="/first" component={FirstContainer}/>
      <Route path="/second" component={SecondContainer}/>
    </Route>
  </Router>
), document.querySelector('.app'));
