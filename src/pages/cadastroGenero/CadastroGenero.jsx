import Header from '../../components/header/Header';
import Cadastro from '../../components/cadastro/Cadastro';
import Footer from '../../components/footer/Footer';
import Lista from '../../components/lista/Lista';
import './CadastroGenero.css';
import { useEffect,useState } from 'react';


import api from '../../Services/services';

//importar sweet alert
import Swal from 'sweetalert2';

const CadastroGenero = () => {

    //nome do genero
    const [genero, setGenero] = useState("");
    const [listaGenero, setlistaGenero] = useState([]);
    // const [deletaGenero, setdeletaGenero] = useState([]);

    function alerta(icone, mensagem){
       
            const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
            didOpen: (toast) => {
                 toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                    icon: icone,
                    title: mensagem
            });
    
    }
    
    async function cadastrarGenero(evt){
        evt.preventDefault();
        //verificar se o input esta vindo vazio
    if (genero.trim() != "") {
            // alert("O campo precisa estar preenchido!!")

        
        //try => tentar (o esperado)
        //catch => lança a exeção
        try {
            //cadastrar um genero: post
            await api.post("genero", {nome: genero});
            alerta("success", "Cadastro realizado com sucesso!");
            setGenero("");
        } catch (error){
           alerta("error", "Erro! entre em contato com o suporte!");
           console.log(error);
        }
    }else{
        alerta("error", "Erro! preencha o campo!!");
    }


}

    async function listarGenero(){
        try {
        //await -> Aguarde uma resp da solicitacao
        const resposta = await api.get("genero");
            // console.log(resposta);
            setlistaGenero(resposta.data);
            
        } catch (error) {
        console.log(error);
        }
    }

    //funcao de excluir o genero
    async function deletarGenero(id) {

        Swal.fire({
            title: "Voce tem certeza?",
            text: "voce apagará isso para sempre!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, Deletar isso!"
    }).then(async (result) => {
        if (result.isConfirmed) {
            
        await api.delete(`genero/${id}`);

        Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
        });
    }
    });
listarGenero();   
    
}
    //teste: validar o genero

    // useEffect(() => {
    //     console.log(genero);
    // },[genero]);

    //fim do teste

   // Assim que a pagina renderizar, o metodo listarGenero() será chamado
    useEffect(() => {
        listarGenero();
    }, []);
   
    return(
        <>
            <Header/>
            <main>
                <Cadastro 
                    tituloCadastro="Cadastro de Gênero"
                    visibilidade="none"
                    placeholder="Gênero"

                    //atribuindo a funcao:
                    funcCadastro = {cadastrarGenero}
                    //atribuindo o valor ao input
                    valorInput = {genero} 
                    //atribuindo a função que atualiza o meu genero:
                    setValorInput = {setGenero}
                    />
                    
            </main>
            
            <Lista 
            titulolista="Gênero" 
            visible="none"

            //atribuir para lista, o meu estado atual:
            lista = {listaGenero}

            deletarGenero = {deletarGenero}
            />

        


            <Footer/>
        </>
    )
}

export default CadastroGenero;