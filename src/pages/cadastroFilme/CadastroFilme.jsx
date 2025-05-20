// import { Fragment } from "react";
import Cadastro from "../../components/cadastro/Cadastro";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header"
import Lista from "../../components/lista/Lista";
import api from "../../Services/services";
import './CadastroFilme.css';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';


const CadastroFilme = () => {
    const[listaGenero, setListaGenero] = useState([]);
    const[genero, setGenero] = useState("");
    const[filme, setFilme] = useState("");

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

    //funcao para trazer os generos no meu select
  async function listarGenero () {
        try {
            const resposta =  await api.get("genero");
            setListaGenero(resposta.data);
        } catch (error) {
            console.log(error);
            
        }

   }

  async function cadastrarFilme(e){
    e.preventDefault();
    console.log(filme);
    console.log(genero);
    
    
    if (filme.trim() !== "") {
        //tratamente de excecao
        try {
            await api.post("filme" , {titulo: filme, idGenero: genero});
            
            
        } catch (error) {
            console.log(error);
            
        }
        // alert("Entrou no cadastrarFilme");
    }else{
        alerta("error", "Erro! Preencha os campos");
    }
   }

   useEffect(() => {
        listarGenero();
   }, []);




    return(
        <>
        <Header/>
        <main>
            <Cadastro tituloCadastro="Cadastro de Filme"
                placeholder="Filme"

                lista = {listaGenero}

                funcCadastro = {cadastrarFilme}

                valorInput = {filme}
                setValorInput = {setFilme}

                valorSelect = {genero}
                setValorSelect = {setGenero}
            />

            <Lista titulolista="Filme"    
            />
        </main>
        <Footer/>
        </>
    )
}

export default CadastroFilme;