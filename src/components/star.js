import React, {Component, Fragment} from 'react';
import {View, Text, Image, StyleSheet, Animated, TouchableWithoutFeedback} from 'react-native';
import {Button, Flex, Icon, List, WhiteSpace, SegmentedControl} from '@ant-design/react-native';
import ScreenUtil from '../utils/screen-util';


export default class Star extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //接到页面传过来的值
            //因为当前页面显示五颗星，而分数是十分所以要去平均值，
            num: this.props.star,
            //根据页面当中的星星的数量来设置默认值
            arr: [1, 2, 3, 4, 5],
            titles: ['','非常不满意','不满意','一般','满意','非常满意']
        };

    }

    tap = (ele) => {
        if (this.props.onChange) {
            this.setState({num: ele}, () => {
                this.props.onChange(ele);
            });
        }
    };

    render() {
        const {num,titles} = this.state;
        return (
            <Flex style={{marginTop: 15,paddingRight:15}} justify={'between'}>
                <Flex>
                    {
                        this.state.arr.map((ele, index) => {
                            return (
                                <TouchableWithoutFeedback key={index} onPress={() => this.tap(ele)}>
                                    <Flex key={index} style={{marginLeft: 15}}>
                                        {ele > this.state.num ? <Text style={{color: '#ccc', fontSize: 30}}>☆</Text> :
                                            <Text style={{color: '#f0a825', fontSize: 30}}>★</Text>}
                                    </Flex>
                                </TouchableWithoutFeedback>
                            );
                        })
                    }
                </Flex>
                <Text style={{color:'#666',fontSize:16}}>
                    {titles[num]}
                </Text>
            </Flex>

        );
    }
}
