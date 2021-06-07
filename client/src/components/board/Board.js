import React, { useEffect, useState } from 'react';
import './board.css';
import Item from './Item/Item';
import Modal from './modal/Modal';
import SearchBoard from './SearchBoard/SearchBoard';
import FavoritesBoard from './favoritesBoard/FavoritesBoard';
import CategoryBoard from './categoryBoard/CategoryBoard';
import Warning from '../warning/Warning';
import Greeting from './greeting/Greeting';
import { useDispatch, useSelector } from 'react-redux';
import { Spring, Transition, animated } from 'react-spring/renderprops';
import { boardAction } from '../../redux/actions/boardActions';
import { warningAction } from '../../redux/actions/warningActions';
import { localStorageHandler } from '../../utils/localStorageHandler';
import { searchActions } from '../../redux/actions/searchActions';

export default function Board({ searchValue, setSearchValueNull, notResultMessage, setSearchValue, partners }) {
  const { loading, mainData, favorite, board, sorting, search } = useSelector(state => state);
  const [data, setData] = useState(mainData.data);
  const dispatch = useDispatch();

  function startSearching(data) {
    let searchKey = new RegExp(`(${searchValue})`, 'mgi');
    let suitableData = {};
    let count = 0;
    for (let item in data) {
      if (data[item].description.search(searchKey) !== -1) {
        suitableData[count] = data[item];
      }
      count++;
    }
    return suitableData;
  };

  function scrollUp() {
    document.documentElement.scrollTop = 0;
  };

  function onScroll() {
    const { clientHeight, scrollHeight, offsetHeight, scrollTop} = document.documentElement;
    if (clientHeight + (window.pageYOffset || scrollTop) + 150 >= Math.max(clientHeight, scrollHeight, offsetHeight)) {
      dispatch(boardAction.paginationNext(data));
    }
  };

  function sortingUpDataForPrice(data = mainData.data) {
    return Object.values(data)
      .map(e => {
        if (+e.price) return { ...e, price: +e.price };
        else return { ...e };
      })
      .sort((a, b) => (typeof b.price === 'string') ? -1 : +a.price - +b.price);
  };

  function sortingDownDataForPrice(data = mainData.data) {
    return Object.values(data)
      .map(e => {
        if (+e.price) return { ...e, price: +e.price };
        else return { ...e };
      })
      .sort((a, b) => (typeof b.price === 'string') ? -1 : +b.price - +a.price);
  };

  function sortingHandler(data) {
    if (sorting.sortToPrice && sorting.sortingStep === 1) {
      return sortingUpDataForPrice(data);
    } else if (sorting.sortingStep === 2) {
      return sortingDownDataForPrice(data);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll, true);
    return () => window.removeEventListener('scroll', onScroll);
  }, [data]);

  useEffect(() => {
    setData({ ...mainData.data });
  }, [mainData.data]);

  useEffect(() => {
    if (search.searching) setData(startSearching(sortingHandler(data)));
    else setData(sortingHandler(data));
  }, [sorting.sortingStep, sorting.sortToPrice, search.searching]);

  useEffect(() => {
    if (favorite.favoriteData.length > 0) {
      warningAction.setNotification(`Найдено ${favorite.favoriteData.length} объявлений`);
      warningAction.openNotification();
      setTimeout(() => warningAction.closeNotification(), 5000);
    } else {
      localStorageHandler.removeAllFavorites();
    }
  }, []);

  let isAnimate = !Object.keys(mainData.data).length;
  return (
    <section className="board-sec">
      <div className="board">
        {search.searching && (
          <button
            onClick={() => {
              dispatch(searchActions.setStop());
              if (setSearchValueNull) setSearchValueNull();
            }}
            className="box active-menu"
          >
            Вернуться
          </button>
          )
        }

        <div>
          <Transition
            items={isAnimate}
            from={{ opacity: 0 }}
            enter={{ opacity: 1 }}
            leave={{ opacity: 0 }}
          >
            {item => item && (props => ( <animated.div style={props}> <Greeting/> </animated.div> ))}
          </Transition>

          {loading.loading
            ? <Spring
              from={{ opacity: 0, marginTop: -1000 }}
              to={{ opacity: 1, marginTop: 0 }}
              delay="300">
              {props => (
                <div style={props} className="loading">
                  <div className="lds-roller">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>)}
              </Spring>
            : !isAnimate && (
             <div className="items">
                <Spring
                  from={{ transform: 'translateX(200px)' }}
                  to={{ transform: 'translateX(0px)' }}
                  delay="1000"
                >
                  {(props) => (
                    <button
                      style={props}
                      onClick={scrollUp}
                      className="up-button"
                    >
                      <span></span>
                    </button>
                  )}
                </Spring>

                {Object.keys(data)
                  .slice(0, board.countOfItemsShow)
                  .map((elem, i) => {
                  return (
                    <Item
                      key={data[elem] + i}
                      data={data[elem]}
                      id={data[elem].id}
                      partners={partners}
                    />
                  );
                })}
             </div>
            )
          }
        </div>

        <Modal/>

        <SearchBoard
          notResultMessage={notResultMessage}
          setSearchValue={setSearchValue}
        />

        <FavoritesBoard/>

        <CategoryBoard/>

        <Warning/>

      </div>
    </section>
  );
};
