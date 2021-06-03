import React, {useState, useEffect} from 'react';
import {Modal} from 'react-native';
import StatusBarPage from '../../components/StatusBarPage';
import {Container, Title, ListLinks} from './styles';
import Menu from '../../components/Menu';
import ListItem from '../../components/ListItem';
import {useIsFocused} from '@react-navigation/native';
import {getLinksSave} from '../../utils/storeLinks';
import ModalLink from '../../components/ModalLink';

export default function MyLinks(){
    const isFocused = useIsFocused();
    const [links, setLinks] = useState([]);
    const [data, setData] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    

    useEffect(() => {
        //quando abir o projeto ele vai chamar o q estiver aqui
        async function getLinks(){
            const result = await getLinksSave('sujeitolinks');
            setLinks(result);
        }
        getLinks();
    }, [isFocused])

    //função para aparecer o modal
    function handleItem(item){
        setData(item);
        setModalVisible(true);
    }

    return(
        <Container>
            <StatusBarPage
                barStyle="light-content" 
                backgroundColor="#132742"
            />
            <Menu />
            <Title>Meus Links</Title>

            <ListLinks 
                data={links}
                keyExtractor={(item) => String(item.id)}
                renderItem={({item}) => <ListItem data={item} selectedItem={handleItem} />}
                contentContainerStyle={{paddingBottom: 22}}
                showsVerticalScrollIndicator={false}
            />

            <Modal visible={modalVisible} transparent animationType="slide">
                <ModalLink onClose={() => setModalVisible(false)} data={data} />
            </Modal>
        </Container>
    )
}