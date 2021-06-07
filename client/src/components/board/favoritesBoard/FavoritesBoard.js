import React, { useEffect, useState } from 'react';
import '../optionsBoard.css';
import FavoriteItem from './FavoriteItem/FavoriteItem';
import { Transition } from 'react-spring/renderprops';
import { useDispatch, useSelector } from 'react-redux';
import { favoriteActions } from '../../../redux/actions/favoriteActions';

export default function FavoritesBoard() {
  const { favorite } = useSelector(state => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(favoriteActions.getAllFavorites())
  }, []);

  return (
    <Transition
      items={favorite.isShowFavoritesBoard}
      from={{ opacity: 0, transform: 'rotateY(-90deg) translateX(200px)' }}
      enter={{ opacity: 1, transform: 'rotateY(0deg) translateX(0)' }}
      leave={{ opacity: 0, transform: 'rotateY(0deg) translateX(-100px)' }}
    >
      {item => item && (props => (
          <div style={props} className="options-board">
            <div className="close-wrap">
              <div className="options-title">Избранное</div>
              <button
                onClick={() => dispatch(favoriteActions.setHideBoard())}
                className="box"
              >
                x
              </button>
            </div>
            {favorite.countOfFavorites
              ?  <ul className="listing">
                  {favorite.favoriteData.map((elem, i) =>
                    <FavoriteItem favoriteData={elem}  key={elem.id}/>
                  )}
                  </ul>
              : <p className="favorites-board-message">
                  Выберете объявление и нажмите "запомнить", чтобы мы его сохранили для Вас
                </p>
            }
          </div>))}
    </Transition>
  );
}