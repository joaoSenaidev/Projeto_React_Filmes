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
            alerta("sucess", "Cadastro realizado com sucesso!");
            setGenero("");
        } catch (error){
           alerta("error", "Erro! entre em contato com o suporte!");
           console.log(error);
        }
    }else{
        alerta("error", "Erro! preencha o campo!!");
    }


}

    //teste: validar o genero

    // useEffect(() => {
    //     console.log(genero);
    // },[genero]);

    //fim do teste

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
            lista="Gênero" 
            visible="none"
            />

            <Footer/>
        </>
    )
}

export default CadastroGenero;