import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, Alert } from 'react-native'
import {colors,  getData,  responsiveHeight} from '../../utils'
import {Inputan, Tombol} from '../../components'
import { connect } from 'react-redux'
import { changePassword } from '../../actions/ProfileAction'

class ChangePassword extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             password: '',
             newPassword: '',
             newPasswordConfirmation: '',
        }
    }
    
    onSubmit = () => {
        console.log("Masuk");
        const { password, newPassword, newPasswordConfirmation } = this.state
   
        if(newPassword !== newPasswordConfirmation) {
            Alert.alert('Error', 'Password Baru Dan Password Konfirmasi Tidak Sesuai !')
        }else if(password && newPassword && newPasswordConfirmation) {
            
            //ambil data email dari lokal storage
            getData('user').then((res) => {
                const parameter = {
                    email: res.email,
                    password: password,
                    newPassword: newPassword
                }

                this.props.dispatch(changePassword(parameter))

            })

        }else {
            Alert.alert('Error', 'Password, Password Baru Dan Password Konfirmasi Harus Di Isi !')
        }
    }

    componentDidUpdate(prevProps) {
        const {changePasswordResult} = this.props

        if(changePasswordResult && prevProps.changePasswordResult !== changePasswordResult) {
            Alert.alert("Berhasil", "Change Password Berhasil")
            this.props.navigation.replace("MainApp")
        }
    }
    
    render() {
        const { password, newPassword, newPasswordConfirmation } = this.state
        const { changePasswordLoading } = this.props
        return (
            <View style={styles.pages}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <Inputan 
                        label="Old Password" 
                        secureTextEntry 
                        value = {password}
                        onChangeText={(password) => this.setState({password})}
                        />

                        <Inputan 
                        label="New Password" 
                        secureTextEntry
                        value = {newPassword}
                        onChangeText={(newPassword) => this.setState({newPassword})}
                        />

                        <Inputan 
                        label="Confirm New Password" 
                        secureTextEntry 
                        value = {newPasswordConfirmation}
                        onChangeText={(newPasswordConfirmation) => this.setState({newPasswordConfirmation})}
                        />
                    </View>

                    

                    

                    <View style={styles.submit}>
                        <Tombol 
                        title="Submit" 
                        type="textIcon" 
                        icon="submit" 
                        padding={responsiveHeight(15)} 
                        fontSize={20}
                        onPress={() => this.onSubmit()}
                        loading={changePasswordLoading}
                        />
                    </View>

                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    changePasswordLoading: state.ProfileReducer.changePasswordLoading,
    changePasswordResult: state.ProfileReducer.changePasswordResult,
    changePasswordError: state.ProfileReducer.changePasswordError,
})

export default connect(mapStateToProps, null)(ChangePassword)

const styles = StyleSheet.create({ 
    pages: {
        flex: 1,
        backgroundColor: colors.white,
        paddingHorizontal: 30,
        paddingTop: 10,
    },
    submit: {
        marginTop: 430,
    }
})
