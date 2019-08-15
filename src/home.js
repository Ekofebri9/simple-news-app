import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, ActivityIndicator, RefreshControl, Text, Image, View, Dimensions, FlatList } from 'react-native';
import axios from 'axios'
import moment from 'moment'
var { height, width } = Dimensions.get('window');

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            start: 0,
            end: 0,
            data: [],
            dataShow: [],
            refreshing: false
        };
    }
    fetching() {
        axios.get(`https://api.gigel.co.id/api/v1/test/react-native`)
            .then(res => {
                const data = res.data.articles;
                const dataShow = data.slice(0, 8)
                this.setState({
                    data: data,
                    dataShow: dataShow,
                    start: 1,
                    end: 9,
                    refreshing: false,
                    load: false
                });
            })
    }
    refresh = async () => {
        await this.setState({ refreshing: true }, this.fetching)
    }
    componentDidMount() {
        this.setState({ load: true }, this.fetching)
    }
    handleLoadMore = async () => {
        let data = this.state.data
        let dataShow = this.state.dataShow
        if (this.state.end < data.length) {
            await this.setState({refreshing: true})
            let start = this.state.end
            let end = this.state.end + 8
            dataShow = dataShow.concat(data.slice(start, end))
            await this.setState({
                dataShow: dataShow,
                start: start,
                end: end,
                refreshing: false
            })
        }
    }
    keyExtractor = (item, index) => index.toString()
    renderItem = ({ item }) => (
        <View style={styles.item}>
            <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ flex: 5 }}>
                    <Text numberOfLines={3} style={styles.title}>{item.title}</Text>
                    <Text numberOfLines={3}>{item.description}</Text>
                </View>
                <View style={{ flex: 2, paddingHorizontal: 10 }}>
                    <Image source={{ uri: item.urlToImage }}
                        style={{ width: 100, height: 100 }} />
                </View>
            </View>
            <View style={{ flex: 1, justifyContent: "space-between" }}>
                <Text numberOfLines={4}>{item.content}</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                    <View style={{ flex: 6, flexDirection: "row" }}>
                        <View style={{ flex: 1 }}>
                            <Text>Source</Text>
                            <Text>Publish</Text>
                            <Text>Author</Text>
                        </View>
                        <View style={{ flex: 4 }}>
                            <Text>: {item.source.name}</Text>
                            <Text>: {moment(item.publishedAt).format("hh:mm dddd, D MMMM YYYY")}</Text>
                            <Text numberOfLines={1}>: {item.author}</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.readMore}
                        onPress={() => this.props.navigation.navigate("Detail", item.url)}>
                        <Text style={{ color: "white" }}>Read More</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
    renderFooter() {
        return (
          <View style={styles.footer}>
            {this.state.load ? (
              <ActivityIndicator color="black" size="large" style={{ margin: 15 }} />
            ) : null}
          </View>
        );
      }
    render() {
        return (
            <View style={styles.container} >
                <View style={styles.header}>
                    <Text style={styles.txtHeader}>List News</Text>
                </View>
                <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.state.dataShow}
                    renderItem={this.renderItem}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={0.01}
                    ListFooterComponent={this.renderFooter.bind(this)}
                    refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.refresh} />}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    footer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    header: {
        height: 50,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    },
    item: {
        marginHorizontal: 10,
        marginVertical: 5,
        padding: 10,
        height: 270,
        backgroundColor: "#d4d4d4"
    },
    readMore: {
        flex: 2,
        padding: 5,
        backgroundColor: "#e60707",
        alignSelf: "flex-end",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5
    },
    title: {
        fontStyle: "italic",
        fontWeight: "bold",
        fontSize: 16
    },
    txtHeader: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#fff'
    }
});