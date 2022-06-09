import React, { Component } from 'react'
import { StyleSheet, View, Modal } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer';
import { SliderBox } from 'react-native-image-slider-box';
import {responsiveHeight, colors, responsiveWidth} from '../../../utils'

export default class ProdukSlider extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
             openImage: false,
             previewImage: false,
        }
    }
    

    clickPreview = (index) => {
        this.setState({
            openImage: true,
            previewImage: [{
                url: this.props.images[index],
                props: {
                    // Or you can set source directory.
                    source: this.props.images[index]
                }
            }] 
        })
    }

    render() {
        const {images} = this.props
        const {openImage, previewImage} = this.state
        return (
            <View>
                <SliderBox images={images} 
               circleLoop
               sliderBoxHeight={responsiveHeight(300)}
               ImageComponentStyle={styles.produk}
               dotStyle={styles.dotStyle}
               dotColor={colors.primary}
               imageLoadingColor={colors.primary}
               onCurrentImagePressed={(index) =>
            this.clickPreview(index)
                }
               />
               
               <Modal visible={openImage} transparent={true}on onRequestClose={() => this.setState({openImage: false})}>
                <ImageViewer 
                imageUrls={previewImage} 
                backgroundColor={colors.primary} 
                onClick={() => this.setState({openImage: false})}
                enableSwipeDown
                onSwipeDown={() => this.setState({openImage: false})}
                />
            </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    produk: {
        marginTop: 80,
        width: responsiveWidth(300),
        height: responsiveHeight(300),
        borderRadius: 20,
        
    },
    dotStyle: {
        marginTop: -50
    }
})
