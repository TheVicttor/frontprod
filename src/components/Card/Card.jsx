import React from "react";
import "./Card.css";

export default function Card(props) {
    function separarLinhasMatriz(matrizString) {
        // Remove os colchetes externos e espaços extras
        const matrizSemColchetes = matrizString.trim().slice(1, -1);
    
        // Divide a string nas vírgulas entre os colchetes
        const linhas = matrizSemColchetes.match(/\[.*?\]/g);
    
        // Retorna as linhas como um vetor de strings
        return linhas;
    }
    
    const resultado = separarLinhasMatriz(props.result);
    console.log(resultado);
    

    return (
        <div className="CardField" style={{ maxHeight: "100%" }}>
            <div className="Title">{props.title}</div>
            <div className="Content">{resultado[0]}</div>
            <div className="Content">{resultado[1]}</div>
            <div className="Content">{resultado[2]}</div>
            <div className="Content">{resultado[3]}</div>
        </div>
    );
}
