import React, {useState} from 'react';
import {TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, Modal, ActivityIndicator} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import StatusBarPage from '../../components/StatusBarPage';
import Menu from '../../components/Menu';
import ModalLink from '../../components/ModalLink';
import {Feather} from '@expo/vector-icons';
import {ContainerLogo, 
        Logo,
        ContainerContent,
        Title,
        SubTitle,
        ContainerInput,
        BoxIcon,
        Input,
        ButtonLink,
        ButtonLinkText  
    } from './styles';
import api from '../../services/api';

export default function Home(){

    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState(''); {/** dentro de useState vai começar com ela vazia, o setInput é o cara q chamamos p/ trocar o valor */}
    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState({});


    async function handleShortLink(){
        setLoading(true);
        //setModalVisible(true); //mudando o hook para visualizar o modal
        try{
            const response = await api.post('/shorten',
            {
                long_url: input
            })
            setData(response.data); //toda a resposta do response vai passar por esse useState
            setModalVisible(true);
            Keyboard.dismiss();
            setLoading(false);
            setInput(''); //depois que gerou voltar o input pra vazio
        }catch{
            alert('Ops, parece que algo deu errado');
            Keyboard.dismiss();
            setInput(''); //limpando o input
            setLoading(false) //tirando o loading quando a aplicação carregar
        }
    }

    return(
         <>{/** passando a func p/ clicar em qualquer lugar e sumir o teclado */}
         <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <LinearGradient
            colors={['#1DDBB9', '#132742']}
            style={{flex: 1, justifyContent: 'center'}}
        >
            <StatusBarPage
                barStyle="light-content" 
                backgroundColor="#1DDBB9"
            />
            <Menu />

        {/** passando propriedade para o input e o botão subirem quando o teclado aparecer na tela */}
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'position' : 'padding'}
                enabled
            >
            
            <ContainerLogo>
                <Logo source={require('../../assets/logo.png')} resizeMode="contain" />
            </ContainerLogo>

            <ContainerContent>
                <Title>SujeitoLink</Title>
                <SubTitle>Cole seu link para encurtar</SubTitle>

                <ContainerInput>
                    <BoxIcon>
                        <Feather name="link" size={22} color="#FFFFFF" />
                    </BoxIcon>


                    {/** 
                     * autoCapitalize = faz com q a primeira letra seja sempre minúscula
                     * autoCorrect = ignora que tenha erros na escrita e não tem corretor
                     * keyboardType = somente p/ ios, da opção de sites no teclado como .com, etc
                    */}
                    <Input placeholder="Cole seu link aqui" 
                           placeholderTextColor="#FFFFFF"
                           autoCapitalize="none" 
                           autoCorrect={false}
                           keyboardType="url"
                           value={input}
                           onChangeText={(text) => setInput(text)}
                           />
                </ContainerInput>

                <ButtonLink onPress={handleShortLink}>
                    {
                        loading ? (
                            <ActivityIndicator color="#121212" size={24} />
                        ) : (
                            <ButtonLinkText>Gerar Link</ButtonLinkText>
                        )
                    }
                </ButtonLink>
            </ContainerContent>
            </KeyboardAvoidingView>
            <Modal visible={modalVisible} transparent animationType="slide">
                <ModalLink onClose={() => setModalVisible(false)} data={data} />
            </Modal>
        </LinearGradient>
        </TouchableWithoutFeedback>
    </>
    
    )
}