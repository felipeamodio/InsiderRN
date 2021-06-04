import React, {useState, useEffect} from 'react';
import {Modal, ActivityIndicator, ActivityIndicatorBase} from 'react-native';
import StatusBarPage from '../../components/StatusBarPage';
import {Container, Title, ListLinks, ContainerEmpty, WarningText} from './styles';
import Menu from '../../components/Menu';
import ListItem from '../../components/ListItem';
import {useIsFocused} from '@react-navigation/native';
import {getLinksSave, deleteLink} from '../../utils/storeLinks';
import ModalLink from '../../components/ModalLink';

export default function MyLinks(){
    const isFocused = useIsFocused();
    const [links, setLinks] = useState([]);
    const [data, setData] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //quando abir o projeto ele vai chamar o q estiver aqui
        async function getLinks(){
            const result = await getLinksSave('sujeitolinks');
            setLinks(result);
            setLoading(false);
        }
        getLinks();
    }, [isFocused])

    //função para aparecer o modal
    function handleItem(item){
        setData(item);
        setModalVisible(true);
    }

    //função para deletar os itens
    async function handleDelete(id){
        const result = await deleteLink(links, id);
        setLinks(result);
    }

    return(
        <Container>
            <StatusBarPage
                barStyle="light-content" 
                backgroundColor="#132742"
            />
            <Menu />
            <Title>Meus Links</Title>

            {  loading && (
                <ContainerEmpty>
                    <ActivityIndicator color="#FFFFFF" size={25} />
                </ContainerEmpty>
            )}

            { links.length === 0 && (
                <ContainerEmpty>
                    <WarningText>Você ainda não possui nenhum link 🙁</WarningText>
                </ContainerEmpty>
            )}

            <ListLinks 
                data={links}
                keyExtractor={(item) => String(item.id)}
                renderItem={({item}) => <ListItem data={item} selectedItem={handleItem} deleteItem={handleDelete} />}
                contentContainerStyle={{paddingBottom: 22}}
                showsVerticalScrollIndicator={false}
            />

            <Modal visible={modalVisible} transparent animationType="slide">
                <ModalLink onClose={() => setModalVisible(false)} data={data} />
            </Modal>
        </Container>
    )
}