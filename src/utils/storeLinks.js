import AsyncStorage from '@react-native-async-storage/async-storage';

//Buscar os links salvos
//passando o export async pq vamos importar ela em outros locais
export async function getLinksSave(key){
    const myLinks = await AsyncStorage.getItem(key);

    //temos que converter ele em uma string
    //se não vier nada passamos o OU || array vazio
    let linksSaves = JSON.parse(myLinks) || [];

    return linksSaves;
}

//salvar o link no storage
export async function saveLink(key, newLink){
    //buscar todos os links q já tenho
    let linksStored = await getLinksSave(key);

    //se tiver algum link salvo com esse mesmo ID ou duplicado, preciso ignorar
    const hasLink = linksStored.some(link => link.id === newLink.id);

    if(hasLink){
        console.log('Esse link já existe na lista')
        return; //parar a execução aqui
    }
    linksStored.push(newLink);
    await AsyncStorage.setItem(key, JSON.stringify(linksStored))
    console.log('Link salvo com sucesso')
}

//deletar algum link específico
export async function deleteLink(links, id){

}