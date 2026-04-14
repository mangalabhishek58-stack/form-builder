import React, { useEffect, useState } from 'react'
import { updateUser, UserData } from '../../api/User'
import styles from './SettingPage.module.css'
import { GrHide, GrLock, GrLogout, GrMail, GrUser, GrView } from 'react-icons/gr'
import { useNavigate } from 'react-router-dom'

function SettingPage() {
    const navigate = useNavigate()
    const [error, setError] = useState({ username: '', oldPassword: '', newPassword: '' })
    const [userId, setUserId] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [oldPasswordType, setOldPasswordType] = useState('password');
    const [newPasswordType, setNewPasswordType] = useState('password');


    function validate() {
        let err = false;
        setError({ username: '', oldPassword: '', newPassword: '' })
        if (username.trim().length === 0) {
            err = true
            setError((error) => {
                return {
                    ...error,
                    username: 'Username is required'
                }
            })
        }
        if (oldPassword.trim().length === 0) {
            err = true
            setError((error) => {
                return {
                    ...error,
                    oldPassword: 'Old Password is required'
                }
            })
        }
        if (newPassword.trim().length === 0) {
            err = true
            setError((error) => {
                return {
                    ...error,
                    newPassword: ' Enter New Password'
                }
            })
        }
        if (err) {
            return
        }
        handleUpdate()
    }

    const handleUpdate = async() =>{
        const response = await updateUser(username , email , oldPassword , newPassword)
        if(response.status == 201){
            alert(response.data.message)
            navigate('/dashboard')
        }else if(response.status == 400){
            setError((error) => {
                return {
                    ...error,
                    oldPassword: response.data.message,
                }
            })
        }else if(response.status == 401 || response.status == 404){
            Logout()
        }
    }

    const Logout = () => {
        localStorage.clear()
        navigate('/')
    }
    const fetchUser = async () => {
        const response = await UserData()
        if (response.status == 200) {
            setUserId(response.data.user._id)
            setUsername(response.data.user.userName)
            setEmail(response.data.user.email)
        } else if (response.status == 400 || response.status == 401) {
            Logout()
        }
    }

    // const handleUpdate = () => {
    //     validate()
    // }

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <div className={styles.page} >
            <h4 style={{ fontWeight: '600', fontSize: '1.37rem' }}>Settings</h4>

            <div className={styles.Logout} onClick={Logout} >
                <GrLogout style={{ height: '1.5rem', width: '1.5rem' }} />
                <p>Log out</p>
            </div>

            <div className={styles.updateForm}>
                <form >
                    <div className={styles.inputBox}>
                        <GrUser className={styles.leftIcon} />
                        <input
                            type="text"
                            value={username}
                            placeholder='Enter a Upadated username'
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {error.username && <p>{error.username}</p>}
                    </div>
                    <div className={styles.inputBox}>
                        <GrMail className={styles.leftIcon} />
                        <input
                            type="email"
                            value={email}
                            placeholder='Enter your Updated email'
                            readOnly
                        // onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputBox}>
                        <GrLock className={styles.leftIcon} />
                        <input
                            type={oldPasswordType}
                            value={oldPassword}
                            placeholder='Old password'
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                        {error.oldPassword && <p>{error.oldPassword}</p>}
                        {oldPasswordType == 'text' ?
                            <GrHide className={styles.rightIcon} onClick={() => setOldPasswordType('password')} /> :
                            <GrView className={styles.rightIcon} onClick={() => setOldPasswordType('text')} />}
                    </div>
                    <div className={styles.inputBox}>
                        <GrLock className={styles.leftIcon} />
                        <input
                            type={newPasswordType}
                            value={newPassword}
                            placeholder='New password'
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        {error.newPassword && <p>{error.newPassword}</p>}
                        {newPasswordType == 'text' ?
                            <GrHide className={styles.rightIcon} onClick={() => setNewPasswordType('password')} /> :
                            <GrView className={styles.rightIcon} onClick={() => setNewPasswordType('text')} />}
                    </div>
                </form>
                
                <button onClick={()=>validate()}>Sign Up</button>

            </div>
        </div>
    )
}

export default SettingPage
