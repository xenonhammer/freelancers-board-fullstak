import React, { useEffect, useState } from 'react';
import './topMenu.css';
import TopMenuItem from './topMenuItem/TopMenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { Spring } from 'react-spring/renderprops';
import { loadingAction } from '../../redux/actions/loadingAction';
import { switchDataAction } from '../../redux/actions/swichDataAction';
import { warningAction } from '../../redux/actions/warningActions';
import { mainDataAction } from '../../redux/actions/mainDataActions';

export default function TopMenu() {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const { category, switchData, mainData, warning } = state;
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [btnShowTopMenu, setBtnShowTopMenu] = useState('Показать фриланс биржи');

  function toggleShowTopMenu() {
    if (visibleMenu) {
      setVisibleMenu(false);
      setBtnShowTopMenu('Скрыть биржи');
    } else {
      setVisibleMenu(true);
      setBtnShowTopMenu('Показать фриланс биржи');
    }
  }

  async function fetchData (url) {
    try{
      const response = await fetch(url).then(res => res.json());
      let modResponse = { ...JSON.parse(response) };
      let len = Object.keys(mainData).length > 0 ? Object.keys(mainData).length : 0;
      let obj = {};
      for (let key in modResponse) {
        let index = len + +key;
        obj[index] = modResponse[key];
      }
      return  { ...mainData, ...obj };

    } catch (e) {
      console.error(e.message)
      dispatch(warningAction.setNotification('Похоже, эта биржа пока недоступена...'));
      dispatch(warningAction.openNotification());
      setTimeout(() => {
        dispatch(warningAction.closeNotification());
      }, 5000);
    }
  }

  async function getKwor() {
    const url = category.category.kworkHref;
    dispatch(switchDataAction.kwork.setStopDownload())
    dispatch(loadingAction.enable());

    const data = await fetchData(url)

    if (data) {
      dispatch(mainDataAction.setData(data));
      dispatch(loadingAction.disable());
    }
  }

  async function getFreelanceRu() {
    const url = category.category.freelance_ruHref;
    dispatch(switchDataAction.freelanceRu.setStopDownload)
    dispatch(loadingAction.enable());

    const data = await fetchData(url)

    if (data) {
      dispatch(mainDataAction.setData(data));
      dispatch(loadingAction.disable());
    }
  }

  useEffect(() => {
    if (switchData.kwork.downloading) getKwor();
    if (switchData.freelanceRu.downloading) getFreelanceRu();
  }, [switchData.kwork.downloading, switchData.freelanceRu.downloading])

  return (
    <section className="top-menu">
      <div className="fl-boxs">
        {category.categorySelected &&
        <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
          {props => (
            <button
              style={props}
              onClick={() => {
                category.categorySelected && toggleShowTopMenu();
                dispatch(warningAction.closeTopMenu())
              }}
              className={visibleMenu ? 'box active-menu' : warning.warningTopMenu && warning.stepInitial === 1 ? 'box warning-top-menu' : 'box'}
            >
              {btnShowTopMenu}
            </button>
          )}
        </Spring>}

        {(!visibleMenu && warning.warningTopMenu && warning.stepInitial === 1) &&
        <Spring from={{ opacity: 0, marginTop: 300 }} to={{ opacity: 1, marginTop: 0 }}>
          {props => (<div
            style={props}
            className="warning-tp "
            onClick={() => dispatch(warningAction.closeTopMenu())}
          > 2. Выберите биржу
          </div>)}
        </Spring>}

        <TopMenuItem visibleMenu={visibleMenu}/>

      </div>
    </section>
  );
}
