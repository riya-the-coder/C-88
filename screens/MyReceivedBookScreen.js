import React, { Component} from 'react';
import { Icon,ListItem } from 'react-native-elements';
import { View, Text, StyeSheet ,Alert, Dimensions, TouchableHighlight, Animated, ImageComponent} from 'react-native';
import {firebase} from 'firebase';
import db from '../config';
import MyHeader from '../components/MyHeader';
export default class MyReceivedBookScreen extends Component {
    constructor(){
    super();
    this.state={
        userId:firebase.auth().currentUser.email,
        receivedBookList:[]
    }
    this.requestRef=null;
}
getReceivedBookList=() => {
    this.requestRef=db.collection('requested_books')
    .where('userId','==',this.state.userId)
    .where('book_status','==','received')
    .onSnapshot((snapshot) => {
        var receivedBookList=snapshot.docs.map((doc) => doc.data())
        this.setState({
            receivedBookList:receivedBookList
        })
    })

}
componentDidMount(){
    this.receivedBookList();
}
componentWillUnmount(){
    this.requestRef();
}
keyExtractor=(item,index) => index.toString()
renderItem=({item,i}) => {
    return(
        <ListItem 
        key={i}
        title={item.bookName}
        subtitle={item.bookStatus}
        titleStyle={{color:'black', fontWeight:'bold'}}
        bottomDivider
        ></ListItem>
    )
}
render(){
    return(
        <View style={{flex:1}}>
<MyHeader title='received books' navigation={this.props.navigation}/>
<View style={{flex:1}}>
{
    this.state.receivedBookList.length===0
    ?(
        <View>
            <Text>List of all received books</Text>
        </View>
        
    )
    :(
        <FlatList
        keyExtractor={this.keyExtractor}
        data={this.state.receivedBookList}
        renderItem={this.renderItem}
        />
    )
}
</View>
        </View>
    )
}
}
