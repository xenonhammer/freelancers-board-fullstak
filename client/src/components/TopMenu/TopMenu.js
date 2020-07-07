import React from 'react';
import './topMenu.css';
import TopMenuItem from './topMenuItem/TopMenuItem';
import Warning from '../warning/Warning';
import { connect } from 'react-redux';
import { Spring, Transition } from 'react-spring/renderprops';

import { 
    SET_DATA, 
    IS_LOADING, 
    IS_NOT_LOADING, 
    STOP_DOWNLOADING_KWORK, 
    DELET_SOME_DATA, 
    KWORK, 
    STOP_DOWNLOADING_FREELANCE_RU, 
    FREELANCE_RU, 
    CLOSE_WARNING_TOP_MENU,
    SET_WARNING_NOTIFICATION,
    OPEN_WARNING_NOTIFICATION,
    CLOSE_WARNING_NOTIFICATION, 
} from '../../redux/types';


class  TopMenu extends React.Component {
    constructor(props){
        super(props);

        this.showTopMenu = this.showTopMenu.bind(this);
        this.hideTopMenu = this.hideTopMenu.bind(this);

        this.state = {
            visibleMenu: false,
            btnShowTopMenu: 'Показать фриланс биржи',
        }
    }
    hideTopMenu(){
        this.setState({ visibleMenu: false, btnShowTopMenu: 'Показать фриланс биржи' })
    }
    showTopMenu(){
        if(this.state.visibleMenu){
            this.hideTopMenu(); 
        } else {
            this.setState({ 
                visibleMenu: true, 
                btnShowTopMenu: 'Скрыть фриланс биржи'
            })}
    }
    getSnapshotBeforeUpdate(prevProps, prevState) {
        let snapshot = {
            downloadingKwork: this.props.downloadingKwork,
            downloadingFreelanceRu: this.props.downloadingFreelanceRu,
         }
       return snapshot 
    }
    componentDidUpdate(prevProps,prevState,snapshot){
        if(this.props.enableKwork  && snapshot.downloadingKwork){
            this.props.switchData(STOP_DOWNLOADING_KWORK)
            this.props.loading(IS_LOADING)
            let url = this.props.category.kworkHref
            
            fetch(url)
            .then(response =>{ 
                return response.json()
            })
            .then(response => JSON.parse(response))
            .then(response => {
                // console.log('Object.keys(response).length', Object.keys(response).length)
                // if(!Object.keys(response).length){ 
                //     this.props.maindData(DELET_SOME_DATA, KWORK)
                //     return false
                // }
                let modResponse = {...response}
                let len = !Object.keys(this.props.data).length ? 0 : Object.keys(this.props.data).length
                let obj = {};
                for(let key in modResponse){
                    let index = len + +key
                    obj[index] = modResponse[key]
                }
                let newState = {...this.props.data, ...obj}
                return newState
            })
            .then(newState => {
                if(!newState) return
                else{
                    this.props.maindData(SET_DATA, newState)
                    this.props.loading(IS_NOT_LOADING)
                }} 
            )
            .catch(error =>{
                this.props.warning(SET_WARNING_NOTIFICATION, 'Похоже, Kwork пару часов будет недоступен...')
                this.props.warning(OPEN_WARNING_NOTIFICATION)
                setTimeout(() => {
                    this.props.warning(CLOSE_WARNING_NOTIFICATION)
                }, 5000);
                
                this.props.loading(IS_NOT_LOADING)
            })
        }
        if(prevProps.enableKwork && !this.props.enableKwork ){
            this.props.maindData(DELET_SOME_DATA, KWORK)
        }


        if(this.props.enableFreelanceRu  && snapshot.downloadingFreelanceRu){
            this.props.switchData(STOP_DOWNLOADING_FREELANCE_RU)
            this.props.loading(IS_LOADING)
            let url = this.props.category.freelance_ruHref
            fetch(url)
            .then(response =>{ 
                return response.json()
            })
            .then(response => {
                // if(!Object.keys(response).length){ 
                //     this.props.maindData(DELET_SOME_DATA, FREELANCE_RU)
                //     return false
                // }
                let modResponse = {...response}
                let len = Object.keys(this.props.data).length 
                let obj = {};
                for(let key in modResponse){
                    let index = len + +key
                    obj[index] = modResponse[key]
                }
                let newState = {...this.props.data, ...obj}
                return newState
            })
            .then(newState => {
                if(!newState) return
                else{
                    this.props.maindData(SET_DATA, newState)
                    this.props.loading(IS_NOT_LOADING)
            }})
            .catch(error =>{
                this.props.warning(SET_WARNING_NOTIFICATION, 'Похоже, Freelance.ru пару часов будет недоступен...')
                this.props.warning(OPEN_WARNING_NOTIFICATION)
                setTimeout(() => {
                    this.props.warning(CLOSE_WARNING_NOTIFICATION)
                }, 5000);
                this.props.loading(IS_NOT_LOADING);
            })
        
        }
        if(prevProps.enableFreelanceRu && !this.props.enableFreelanceRu ){
            this.props.maindData(DELET_SOME_DATA, FREELANCE_RU)
        }
    };
    render(){
        // let topMenuItems = {
        // }
        
        return(
            <section className="top-menu">
                <div className="fl-boxs">
                    {this.props.categorySelected &&
                    <Spring from={{opacity: 0}} to={{opacity:1}}>                    
                        {props=>(
                        <button 
                            style={props}
                            onClick={() => {this.props.categorySelected &&  this.showTopMenu(); this.props.warning(CLOSE_WARNING_TOP_MENU)}} 
                            className={this.state.visibleMenu ? "box active-menu" : this.props.warningTopMenu && this.props.stepInitial === 1 ? "box warning-top-menu" : "box" }  
                            >{this.state.btnShowTopMenu}
                        </button>)}
                    </Spring>}

                    {(!this.state.visibleMenu && this.props.warningTopMenu && this.props.stepInitial === 1) && 
                    <Spring from={{opacity: 0, marginTop: 300}} to={{opacity:1, marginTop: 0}}>    
                        {props=>(<div
                            style={props} 
                            className = "warning-tp "
                            onClick = {() => this.props.warning(CLOSE_WARNING_TOP_MENU)}
                        > 2. Выберите биржу
                        </div>)}
                    </Spring>}
{/* 
                    <Transition          
                        items={this.props.warningNotification}
                        from={{opacity:0, transform: 'translateY(-250)'}}
                        enter={{opacity: 1, transform: 'translateY(0)'}}
                        leave={{opacity: 0, transform: 'translateY(250px)'}}
                        >
                            {item =>
                                item && (props => (
                                    <div
                                        className="warning-notification"
                                        style={props}
                                    >
                                        {this.props.warningNotificationText}
                                    </div>
                        ))}</Transition> */}

                    <TopMenuItem visibleMenu={this.state.visibleMenu} />

                </div>
            </section>
        );
    };
} export default connect(
    state => ({
        warningNotification:         state.warning.warningNotification,
        warningNotificationText:     state.warning.warningNotificationText,
        stepInitial:                 state.warning.stepInitial,
        warningTopMenu:              state.warning.warningTopMenu,
        countOfItemsShow:            state.bord.countOfItemsShow,
        categorySelected:            state.category.categorySelected,
        enableKwork:                 state.switchData.enableKwork,
        enableFreelanceRu:           state.switchData.enableFreelanceRu,
        data:                        state.maindData.data,
        downloadingKwork:            state.switchData.downloadingKwork,
        downloadingFreelanceRu:      state.switchData.downloadingFreelanceRu,
        category:                    state.category.category,
    }),
    dispatch => ({
        maindData: (type, data) => {
            dispatch({ type, data })
        },
        loading: (type) => {
            dispatch({ type })
        },
        switchData: (type) => {
            dispatch({ type })
        },
        bord: (type) => {
            dispatch({ type })
        },
        warning: (type, data) => {
            dispatch({ type, data })
        }
    })
  ) (TopMenu)
