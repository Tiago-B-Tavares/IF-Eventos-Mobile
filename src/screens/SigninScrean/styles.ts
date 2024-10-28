import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: '8%',
        gap: 50,
    },
    titleContainer: {
        width: '100%',
        marginBottom: 20,
    },
    title: {
        fontSize: 50,
        fontWeight: 'bold',
        color: 'blue',
    },
    inputGroup: {
        width: '100%',
        gap: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#808080',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 18,
        paddingHorizontal: 10,
    },
    icon: {
        marginRight: 10,
    },
    buttonPrimary: {
        backgroundColor: 'blue',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        marginTop: 20,
        height: 50,
    },
    buttonTextPrimary: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    separatorText: {
        marginVertical: 10,
        fontSize: 18,
        color: '#808080',
    },
    socialButtonGroup: {
        flexDirection: 'row',
        gap: 20,
    },
    socialButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#707070',
    },
    socialIcon: {
        width: 30,
        height: 30,
    },
});