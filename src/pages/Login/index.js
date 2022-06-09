import React, { Component } from 'react';
import { Text, StyleSheet, View, Alert } from 'react-native';
import { Ilustration, Logo} from '../../assets';
import { colors, fonts, responsiveHeight} from '../../utils'
import { Inputan, Jarak, Tombol} from '../../components'
import { loginUser } from '../../actions/AuthAction'
import { connect } from 'react-redux' 

class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             email: '',
             password: '',
        }
    }
    
    login = () => {
        const { email, password } = this.state

        if(email && password){
            //action
            this.props.dispatch(loginUser(email,password))
        }else {
            Alert.alert("Error ! ","Email dan Password harus di isi !")
        }
    }

    componentDidUpdate(prevProps) {
        const {loginResult} = this.props

        if(loginResult && prevProps.loginResult !== loginResult) {
            this.props.navigation.replace("MainApp")
        }
    }

    render() {
        const { email, password } = this.state
        const { loginLoading } = this.props

        return (
            <View style={styles.pages}>
                <View style={styles.logo}>
                    <View style={styles.logo}>
                        <Logo/>
                    </View>
                    <View style={styles.cardLogin}>
                        <Inputan 
                        label="Email" 
                        value={email} 
                        onChangeText={(email) => this.setState({email})}
                        />

                        <Inputan 
                        label="Password" 
                        secureTextEntry
                        value={password}
                        onChangeText={(password) => this.setState({password})}
                        />
                        <Jarak height={27}/>
                        <Tombol 
                        title="Login" 
                        type="text" 
                        padding={12} 
                        fontSize={18}
                        loading={loginLoading}
                        onPress={() => this.login()}
                        />
                    </View>

                <View style={styles.register}>
                    <Text style={styles.textPrimary}>Belum Punya Akun ?</Text>
                    <Text style={styles.textPrimary} onPress={() => this.props.navigation.navigate('Register1')}>Klik Untuk Daftar</Text>
                </View>

                </View>
                <View style={styles.ilustrasi}>
                    <Ilustration />
                </View>
    </View>
        )
    }
}

const mapStateToProps = (state) => ({
    loginLoading: state.AuthReducer.loginLoading,
    loginResult: state.AuthReducer.loginResult,
    loginError: state.AuthReducer.loginError,
})

export default connect(mapStateToProps, null)(Login)

const styles = StyleSheet.create({
    pages: { 
        flex: 1, 
        backgroundColor: colors.white,
    }
    ,logo:{
        bottom:30,
    }
    ,ilustrasi: {
        marginLeft: 80,
        position: 'relative',
        bottom: 0,
        right: -100,
    },
    logo: {
        alignItems: 'center',
        marginTop: responsiveHeight(25)
    },
    cardLogin: {
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
        marginTop: 20
    },
    register: {
        alignItems: 'center',
        marginTop: 10
    },
    textPrimary: {
        fontSize: 15,
        fontFamily: fonts.primary.bold,
        color: colors.primary
    }
})
