import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEnvelope, faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';

import { useAuth } from '../../contexts/Auth';
import { styles } from './styles';

export default function SigninScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { signIn } = useAuth();

    function handleToggleShowPassword() {
        setShowPassword(!showPassword);
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Acesse a sua conta</Text>
            </View>

            <View style={styles.inputGroup}>
                <View style={styles.inputContainer}>
                    <FontAwesomeIcon icon={faEnvelope} size={20} color="#808080" style={styles.icon} />
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor="#808080"
                        style={styles.input}
                        onChangeText={setEmail}
                        value={email}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <FontAwesomeIcon icon={faLock} size={20} color="#808080" style={styles.icon} />
                    <TextInput
                        placeholder="Senha"
                        placeholderTextColor="#808080"
                        style={styles.input}
                        onChangeText={setPassword}
                        value={password}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity onPress={handleToggleShowPassword}>
                        <FontAwesomeIcon
                            icon={showPassword ? faEyeSlash : faEye}
                            size={20}
                            color="#808080"
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.buttonPrimary} onPress={() => signIn(email, password)}>
                    <Text style={styles.buttonTextPrimary}>Entrar</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.separatorText}>ou</Text>

            <View style={styles.socialButtonGroup}>
                <TouchableOpacity style={styles.socialButton}>
                    <Image source={require('../../assets/google.png')} style={styles.socialIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                    <Image source={require('../../assets/facebook.png')} style={styles.socialIcon} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

