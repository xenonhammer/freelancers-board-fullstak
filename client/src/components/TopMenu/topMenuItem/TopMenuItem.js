import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classname';

import { Trail, animated, config } from 'react-spring/renderprops';
import freelancersExchanges from './FreelancersExchanges';

export default function TopMenuItem({ visibleMenu }) {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const { switchData, loading } = state;
  const items = Object.values(freelancersExchanges(switchData, dispatch));

  function toggleFExchanges(items) {
    if (loading.loading) return null;
    if (items.enable) {
      items.setDisable();
    }
    else {
      items.setEnabled();
      items.setStartDownload();
    }
  }

  const animatedStyles = {
    from: { x: -110, opacity: 1, height: 0 },
    to: {
      x: visibleMenu ? 0 : -110,
      opacity: visibleMenu ? 1 : 0,
      paddingTop: visibleMenu ? 5 : 0,
      paddingBottom: visibleMenu ? 5 : 0,
      paddingLeft: visibleMenu ? 10 : 0,
      paddingRight: visibleMenu ? 10 : 0,
      height: visibleMenu ? 30 : 0
    }
  }

  return (
    <div style={{ height: 0 }}>
      <Trail
        config={config.default}
        native
        initial={null}
        items={items}
        keys={items => items.key}
        from={animatedStyles.from}
        to={animatedStyles.to}
      >
        {items => ({ x, opacity, height, paddingTop, paddingBottom, paddingLeft, paddingRight }) => (
          <animated.div
            onClick={() => toggleFExchanges(items)}
            style={{
              paddingTop,
              paddingBottom,
              paddingLeft,
              paddingRight,
              height,
              opacity,
              transform: x.interpolate(x => `translate3d(${x.toFixed(0)}%,0,0)`)
            }}
            className={cn("box", items.enable && "active-menu")}
          >
            {items.name}
          </animated.div>
        )}
      </Trail>
    </div>
  );
}