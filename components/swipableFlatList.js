import React, { Component} from 'react';
import { Icon,ListItem } from 'react-native-elements';
import { View, Text, StyeSheet ,Alert, Dimensions, TouchableHighlight, Animated, ImageComponent} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import db from '../config';
export default class SwipableFlatList extends Component{
    constructor(){
        super();
        this.state={
            allNotification:this.props.allNotification
        }
    }
    onSwipeValueChange=swipeData => {
        var allNotifications=this.state.allNotifications
        const {key,index}=swipeData;
    if(value>-Dimensions.get('window').width){
        const newData=[...allNotifications];
        const prevIndex=allNotifications.findIndex(item => item.key===key);
        this.updateMarkAsRead(allNotifications[prevIndex]);
        newData.splice(prevIndex,1);
        this.setState({
            allNotification:newData
        })

    }

    }
    updateMarkAsRead=(notification) => {
        db.collection('all_notifications').doc(notification.doc_Id).update({
            'notification_status':'read'
        })
    }
    renderItem=data => {
        <ListItem
        leftElement={<Icon
        name='book'
        type='font-awesome'
        color='grey'
        />}
        title={data.item.book_name}
        titleStyle={{color:'black',fontWeight:'bold'}}
        subtitle={data.item.message}
        bottomDivider
        />

    
    }
    renderHiddenItem=() => {
        <View style={styles.rowBack}>
<View style={[styles.backRightButton, Styles.backRightButtonRight]}>
<Text style={styles.backTextWhite}></Text>
</View>
        </View>
    }
    render(){
        return(
            <View styles={styles.container}>
               <SwipeListView
               disableRightSwipe
               data={this.state.allNotification}
               renderItem={this.renderItem}
               renderHiddenItem={this.renderHiddenItem}
               rightOpenValue={-Dimensions.get('window').width}
               previewRowKey={'0'}
               previewOpenValue={-40}
               previewOpenDelay={3000}
               onSwipeValueChange={this.onSwipeValueChange}
               />
            </View>
        )
    }
}
