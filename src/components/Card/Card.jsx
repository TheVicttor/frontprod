import React from "react";
import "./Card.css";

export default function Card(props) {
    function separarLinhasMatriz(matrizString) {
        // Remove os colchetes externos e espaços extras
        if (matrizString.startsWith('[')) {

            const matrizSemColchetes = matrizString.trim().slice(1, -1);
            
            // Divide a string nas vírgulas entre os colchetes
            const linhas = matrizSemColchetes.match(/\[.*?\]/g);
        }
        else { 
            linhas = [matrizString]
        }
        
        // Retorna as linhas como um vetor de strings
        return linhas;
    }
    
    const resultado = separarLinhasMatriz(props.result);
    console.log(resultado);
    

    return (
        <div className="CardField" style={{ maxHeight: "100%" }}>
            <div className="Title">{props.title}</div>
            <div className="Content">
                {resultado.map((elemento, index) => (
                    <p key={index}>{elemento}</p>
            ))}
            </div>
        </div>
    );
}
