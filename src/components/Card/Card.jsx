import React from "react";
import "./Card.css";

export default function Card(props) {
    function separarLinhasMatriz(matrizString) {
        var linhas = [];
        if (matrizString.startsWith('[')) {
            const matrizSemColchetes = matrizString.trim().slice(1, -1);
            linhas = matrizSemColchetes.match(/\[.*?\]/g);
        } else {
            linhas = [matrizString];
        }
        return linhas;
    }

    const resultado = separarLinhasMatriz(props.result);
    console.log(resultado);

    return (
        <div className="CardField" style={{ maxHeight: "100%" }}>
            <div className="Title">{props.title}</div>
            <div className="Content">
                <table className="MatrixTable">
                    <tbody>
                        {resultado.map((linha, index) => {
                            const colunas = linha.replace(/[\[\]]/g, '').split(',').map(item => item.trim());
                            return (
                                <tr key={index}>
                                    {colunas.map((coluna, colIndex) => (
                                        <td key={colIndex}>{coluna || '0'}</td> 
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
