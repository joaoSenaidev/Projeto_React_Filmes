import "./Lista.css";

import Editar from "../../assets/img/pen-to-square-solid.svg";
import Excluir from "../../assets/img/trash-can-regular.svg";

const Lista = (props) => {
    return(
        <section className="layout_grid listagem">
            <h1>{`Lista de ${props.titulolista}`}</h1>
            <hr/>
            <div className="tabela">
                <table>
                    {/* cabeçalho da tabela */}
                    <thead>
                        {/* tr => table row */}
                        <tr className="table_cabecalho">
                            {/* th => table head */}
                            <th>Nome</th>
                            <th style={{display:props.visible}}>Gênero</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>
                    {/* tbody => corpo da tabela */}
                    <tbody>
                        {/* verificar se a lista esta vindo vazia */}
                        {/* usando o if terciario */}
                        {props.lista && props.lista.length > 0 ? (
                            //vamos mapear os itens da lista
                            props.lista.map((item) => (
                                <tr className="item_lista" key={item.idGereno}>
                                    <td data-cell="Nome">
                                        {item.nome}
                                    </td>
                                    <td data-cell="Genero" style={{display:props.visible}}>Ação</td>
                                    <td data-cell="Editar">
                                        <img 
                                        src={Editar}
                                        alt="Caneta"
                                        />
                                    </td>
                                    <td data-cell="Excluir">
                                        <img 
                                        src={Excluir}  
                                        alt="Lixeira"
                                        onClick={() => props.deletarGenero(item.idGereno)} 
                                        /></td>
                                </tr>
                            ))
                        ) : 
                        (
                            <p>Nenhum gênero foi encontrado.</p>
                        )
                    }
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default Lista;