import React, { Component } from 'react'
import { Text, StyleSheet, View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView, Alert } from 'react-native'

import { colors, fonts, responsiveHeight, responsiveWidth } from '../../utils'
import {Inputan, Jarak, Tombol} from '../../components'


export default class Register1 extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             nama: '',
             email: '',
             nohp: '',
             password: ''
        }
    }

    onContinue = () => {
        const { nama, email, nohp, password } = this.state;
        if(nama && email && nohp && password) {
            this.props.navigation.navigate('Register2', this.state);
        }else {
            Alert.alert("Error", "Nama, \nEmail, \nNo. Handphone, \ndan Password \nHarus Di Isi !" )
        }

    }
    
    render() {
        const { nama, email, nohp, password } = this.state
        return (
            <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.pages}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

   <ScrollView showsVerticalScrollIndicator={false}>
   <View style={styles.btnBack}>
        <Tombol icon="arrow-left" onPress={()=> this.props.navigation.goBack()}/>
    </View>

<View style={styles.ilustrasi}>
    
    <Text style={styles.title}>Daftar</Text>
    <Jarak height={5}/>
    <Text style={styles.title}>Isi Formulir Pendaftaran</Text>

    <View style={styles.wrapperCircle}>
        <View style={styles.circlePrimary}></View>
        <Jarak width={10} />
        <View style={styles.circleDisabled}></View>
    </View>

    <View style={styles.card}>
        <Inputan 
        label="Nama" 
        value={nama} 
        onChangeText={ (nama) => this.setState({nama})}
        />

        <Inputan label="Email" 
        value={email} 
        onChangeText={ (email) => this.setState({email})}
        />

        <Inputan label="No. Handphone" 
        keyboardType="number-pad" 
        value={nohp} 
        onChangeText={(nohp) => this.setState({nohp})}
        />

        <Inputan label="Password" 
        secureTextEntry 
        value={password} 
        onChangeText={(password) => this.setState({password})}
        />

        <Jarak height={30} />
        <Tombol title="Continue" type="textIcon" icon="submit" padding={10} fontSize={18}
        onPress={()=> this.onContinue()} />
    </View>

</View>
   </ScrollView>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

            
        )
    }
}

const styles = StyleSheet.create({
    pages: {
        flex: 1,
        backgroundColor: colors.white
    },
    ilustrasi: {
        alignItems: 'center',
        marginTop: responsiveHeight(50),
    },
    title: {
        fontSize: 24,
        fontFamily: fonts.primary.light,
        color: colors.primary
    },
    wrapperCircle: {
        flexDirection: 'row',
        marginTop: 10
    },
    circlePrimary: {
        backgroundColor: colors.primary,
        width: responsiveWidth(11),
        height: responsiveWidth(11),
        borderRadius: 10
    },
    circleDisabled: {
        backgroundColor: colors.border,
        width: responsiveWidth(11),
        height: responsiveWidth(11),
        borderRadius: 10
    },
    card: {
        width: 350,
        backgroundColor: colors.white,
        marginHorizontal: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        padding: 30,
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 20
    },
    btnBack: {
        marginLeft: 30,
        marginTop: responsiveHeight(40),
        position: 'absolute'
    }
})
