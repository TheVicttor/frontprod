import React from "react";
import "./Card.css";

export default function Card(props) {
    function formatarMatriz(matriz) {
        return matriz.map(row => row.join(" ")).join("\n");
    }

    return (
        <div className="CardField" style={{ maxHeight: "100%" }}>
            <div className="Title">{props.title}</div>
            <div className="Content"><pre>{formatarMatriz(props.result)}</pre></div>
        </div>
    );
}
