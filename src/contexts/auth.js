import React, {
    useState,
    createContext,
    useEffect,
    useCallback
} from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import isCobol from '../services/isCobol';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [lojaLevelAccess, setLojaLevelAccess] = useState(false);
    const [superLevelAccess, setSuperLevelAccess] = useState(false);
    const [naturLevelAccess, setNaturLevelAccess] = useState(false);
    const [grupoLevelAccess, setGrupoLevelAccess] = useState(false);

    const [dataFiltro, setDataFiltro] = useState(new Date());

    const dtFormatada = (date) => {
        return moment(date).format('YYYY-MM-DD');
    }

    function calendarDate(dataf) {
        console.log(dataf);
    }


    // Armazena usuário no storage
    useEffect(() => {
        async function loadStorage() {
            const storageUser = await AsyncStorage.getItem('Auth_user');
            if (storageUser) {
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }
            setLoading(false);
        }
        loadStorage();
    }, []);

    const signIn = useCallback(async ({ code, password, name }) => {
        setLoadingAuth(true);

        const response = await isCobol.post('(LOG_USU_VALIDATE_LOGIN)', {
            code,
            password,
        });

        if (response.status !== 200) {
            setLoadingAuth(false);
            throw new Error(
                'Erro ao conectar-se ao servidor. O serviço da aplicação parece estar parado.',
            );
        }

        const { success } = response.data.login;
        if (!success) {
            setUser(undefined);
            setLoadingAuth(false);
            // throw new Error(`${message}\n\nDetalhes:\n${detailMessage}`);
            return;
        }

        const lojaAccess = await validateAccessLevel(code, 2866, 9);
        const superAccess = await validateAccessLevel(code, 2867, 9);
        const naturAccess = await validateAccessLevel(code, 2868, 9);

        let la = lojaAccess ? 1 : 0;
        let sa = superAccess ? 1 : 0;
        let sn = naturAccess ? 1 : 0;

        let udata = {
            Code: code,
            Name: name,
            levelLoja: lojaAccess ? true : false,
            levelSuper: superAccess ? true : false,
            levelNatur: naturAccess ? true : false,
            lengthGrupo: la + sa + sn
        }
        storageUser(udata);
        setUser(udata);
        setLoadingAuth(false);

    }, []);

    const validateUser = useCallback(async ({ alternative }) => {
        const response = await isCobol.post('(LOG_USU_VALIDATE_USER)', {
            alternative,
        });
        if (response.status !== 200) {

            throw new Error(
                'Erro ao conectar-se ao servidor. O serviço da aplicação parece estar parado.',
            );
        }
        const { success, message, detailMessage, userName, userCode } =
            response.data.user;
        if (!success) {
            setUser(undefined)

            Alert.alert('Erro de Acesso', message);
            // throw new Error(`${message}\n\nDetalhes:\n${detailMessage}`);
        }

        return {
            userName,
            userCode
        };
    }, []);

    const validateAccessLevel = useCallback(async (userCode, programCode, module) => {
      
        const response = await isCobol.post('(LOG_USU_VALIDATE_ACCESS)', {
            userCode,
            programCode,
            module,
        });

        if (response.status !== 200) {
    
            throw new Error(
                'Erro ao conectar-se ao servidor. O serviço da aplicação parece estar parado.',
            );
        }

        const { success } = response.data.access;

        if (!success) {

            // throw new Error(`${message}\n\nDetalhes:\n${detailMessage}`);
        }
  
        return success;
    },
        [],
    );


    async function storageUser(data) {
        await AsyncStorage.setItem('Auth_user', JSON.stringify(data));
    }

    async function signOut() {
        await AsyncStorage.clear()
            .then(() => {
                setUser(null);
            })
    }

    return (

        <AuthContext.Provider value={{
            signed: !!user,
            user,
            signIn,
            validateUser,
            signOut,
            validateAccessLevel,
            setLojaLevelAccess,
            lojaLevelAccess,
            setSuperLevelAccess,
            superLevelAccess,
            setNaturLevelAccess,
            naturLevelAccess,
            setGrupoLevelAccess,
            grupoLevelAccess,
            setLoadingAuth,
            loadingAuth,
            loading,
            calendarDate,
            dtFormatada,
            setDataFiltro,
            dataFiltro
        }}>
            {children}
        </AuthContext.Provider>

    );
}