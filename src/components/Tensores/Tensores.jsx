import api from "axios";
import { useEffect, useState } from "react";
import Card from "../Card/Card";
import Metrica from "../Metric/Metrica";
import "./Tensores.css";

// URL do backend com o IP e a porta corretos
const backendUrl = window.location.hostname === "localhost"
    ? "http://localhost:8121" // URL para desenvolvimento local
    : "https://backprod.onrender.com"; // URL para produção

export default function Tensores() {
    const [metricas, setMetricas] = useState([]);
    const [tensorDaMetricaChecked, setTensorDaMetricaChecked] = useState(false);
    const [riemannChecked, setRiemannChecked] = useState(false);
    const [ricciChecked, setRicciChecked] = useState(false);
    const [ricciScalarChecked, setRicciScalarChecked] = useState(false);
    const [weylChecked, setWeylChecked] = useState(false);
    const [exibirCards, setExibirCards] = useState(false);
    const [tensorDaMetrica, setTensorDaMetrica] = useState(null);
    const [riemann, setRiemann] = useState(null);
    const [ricci, setRicci] = useState(null);
    const [ricciScalar, setRicciScalar] = useState(null);
    const [weylTensor, setWeylTensor] = useState(null);
    const [metricaSelecionada, setMetricaSelecionada] = useState("Schwarzschild");
    const [loading, setLoading] = useState(true);
    const [loadingCalculos, setLoadingCalculos] = useState(false);

    const Loading = () => {
        const [dots, setDots] = useState("");

        useEffect(() => {
            const interval = setInterval(() => {
                setDots(prevDots => {
                    if (prevDots.length < 3) {
                        return prevDots + ".";
                    } else {
                        return "";
                    }
                });
            }, 500);

            return () => clearInterval(interval);
        }, []);

        return loading ? <h1 className="Loading" style={{ color: 'darkgray' }}>{dots}</h1> : <h1 className="Loading" style={{ color: 'darkgray' }}>Erro!</h1>;
    };

    const LoadingCalculos = () => {
        const [dots, setDots] = useState("");

        useEffect(() => {
            const interval = setInterval(() => {
                setDots(prevDots => {
                    if (prevDots.length < 3) {
                        return prevDots + ".";
                    } else {
                        return "";
                    }
                });
            }, 500);

            return () => clearInterval(interval);
        }, []);

        return <h1 className="Loading" style={{ color: 'darkgray' }}>Calculando{dots}</h1>; // Mensagem de carregando durante os cálculos
    };

    useEffect(() => {
        getMetricas();
    }, []);

    // Resetar resultados ao mudar a métrica
    useEffect(() => {
        setExibirCards(false);
        setTensorDaMetrica(null);
        setRiemann(null);
        setRicci(null);
        setRicciScalar(null);
        setWeylTensor(null);
        // Resetar os checkboxes quando a métrica é alterada
        setTensorDaMetricaChecked(false);
        setRiemannChecked(false);
        setRicciChecked(false);
        setRicciScalarChecked(false);
        setWeylChecked(false);
    }, [metricaSelecionada]);

    const getMetricas = () => {
        setLoading(true);
        api.get(`${backendUrl}/metricas`)
            .then((response) => {
                console.log(response.data);
                setMetricas(response.data);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    };

    const handleMetricaChange = (event) => {
        setMetricaSelecionada(event.target.value);
    };

    const handleTensorDaMetricaChange = (event) => {
        setTensorDaMetricaChecked(event.target.checked);
    };

    const handleRiemannChange = (event) => {
        setRiemannChecked(event.target.checked);
    };

    const handleRicciChange = (event) => {
        setRicciChecked(event.target.checked);
    };

    const handleRicciScalarChange = (event) => {
        setRicciScalarChecked(event.target.checked);
    };

    const handleWeylChange = (event) => {
        setWeylChecked(event.target.checked);
    };

    const handleCalcular = () => {
        setLoadingCalculos(true);

        // Resetar resultados antes de calcular
        setExibirCards(true); // Exibir cards se houver resultados

        const dataTensorDaMetrica = {
            metrica: metricaSelecionada,
            tipo: "tensor",
        };

        api.post(`${backendUrl}/tensores`, dataTensorDaMetrica)
            .then((response) => {
                setTensorDaMetrica(response.data.result);
                handleRiemann();
                handleRicci();
                handleRicciScalar();
                handleWeyl();
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setTimeout(() => {
                    setLoadingCalculos(false); // Finalizar loading dos cálculos
                }, 3500);// Finalizar loading dos cálculos
            });
    };

    const handleRiemann = () => {
        if (riemannChecked) {
            setLoadingCalculos(true);
            const dataRiemann = {
                metrica: metricaSelecionada,
                tipo: "riemann",
            };

            api.post(`${backendUrl}/tensores`, dataRiemann)
                .then((response) => {
                    setRiemann(response.data.result);
                })
                .catch((error) => {
                    console.error(error);
                })
                .finally(() => {
                    setTimeout(() => {
                        setLoadingCalculos(false); // Finalizar loading dos cálculos
                    }, 3500);
                });
        }
    };

    const handleRicci = () => {
        if (ricciChecked) {
            setLoadingCalculos(true);
            const dataRicci = {
                metrica: metricaSelecionada,
                tipo: "ricci",
            };

            api.post(`${backendUrl}/tensores`, dataRicci)
                .then((response) => {
                    setRicci(response.data.result);
                })
                .catch((error) => {
                    console.error(error);
                })
                .finally(() => {
                    setTimeout(() => {
                        setLoadingCalculos(false); // Finalizar loading dos cálculos
                    }, 3500);
                });
        }
    };

    const handleRicciScalar = () => {
        if (ricciScalarChecked) {
            setLoadingCalculos(true);
            const dataRicciScalar = {
                metrica: metricaSelecionada,
                tipo: "ricciScalar",
            };

            api.post(`${backendUrl}/tensores`, dataRicciScalar)
                .then((response) => {
                    setRicciScalar(response.data.result);
                })
                .catch((error) => {
                    console.error(error);
                })
                .finally(() => {
                    setTimeout(() => {
                        setLoadingCalculos(false); // Finalizar loading dos cálculos
                    }, 3600);
                });
        }
    };

    const handleWeyl = () => {
        if (weylChecked) {
            setLoadingCalculos(true);
            const dataWeyl = {
                metrica: metricaSelecionada,
                tipo: "weylTensor",
            };

            api.post(`${backendUrl}/tensores`, dataWeyl)
                .then((response) => {
                    setWeylTensor(response.data.result);
                })
                .catch((error) => {
                    console.error(error);
                })
                .finally(() => {
                    setTimeout(() => {
                        setLoadingCalculos(false); // Finalizar loading dos cálculos
                    }, 3600);
                });
        }
    };

    const handleResetar = () => {
        setExibirCards(false);
        setTensorDaMetricaChecked(false);
        setRiemannChecked(false);
        setRicciChecked(false);
        setRicciScalarChecked(false);
        setWeylChecked(false);
        setMetricaSelecionada(metricas[0]?.value || "Schwarzschild");
        // Resetar resultados ao resetar
        setTensorDaMetrica(null);
        setRiemann(null);
        setRicci(null);
        setRicciScalar(null);
        setWeylTensor(null);
    };

    return (
        <>
            <div className="Selector">
                <Metrica
                    onChange={handleMetricaChange}
                    options={metricas}
                    value={metricaSelecionada}
                />
                {metricas.length ? null : <Loading />}
            </div>
            <div className="Tensores">
                <fieldset>
                    <legend>Escolha o que deseja calcular</legend>
                    <div className="Tensores-checkbox">
                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={tensorDaMetricaChecked}
                                    onChange={handleTensorDaMetricaChange}
                                />
                                Tensor Métrico
                            </label>
                        </div>
                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={riemannChecked}
                                    onChange={handleRiemannChange}
                                />
                                Tensor de Riemann
                            </label>
                        </div>
                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={ricciChecked}
                                    onChange={handleRicciChange}
                                />
                                Tensor de Ricci
                            </label>
                        </div>
                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={ricciScalarChecked}
                                    onChange={handleRicciScalarChange}
                                />
                                Escalar de Ricci
                            </label>
                        </div>
                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={weylChecked}
                                    onChange={handleWeylChange}
                                />
                                Tensor de Weyl
                            </label>
                        </div>
                    </div>
                </fieldset>
                <div className="Botoes">
                    <button onClick={handleCalcular}>Calcular</button>
                    <button onClick={handleResetar}>Resetar</button>
                </div>
                {loadingCalculos && <LoadingCalculos />}
                {exibirCards && (
                    <div className="Cards">
                        {tensorDaMetricaChecked && tensorDaMetrica && (
                            <Card
                                title="Tensor Métrico"
                                result={tensorDaMetrica}
                            />
                        )}
                        {riemannChecked && riemann && (
                            <Card
                                title="Tensor de Riemann"
                                result={riemann}
                            />
                        )}
                        {ricciChecked && ricci && (
                            <Card
                                title="Tensor de Ricci"
                                result={ricci}
                            />
                        )}
                        {ricciScalarChecked && ricciScalar && (
                            <Card
                                title="Escalar de Ricci"
                                result={ricciScalar}
                            />
                        )}

                        {weylChecked && weylTensor && (
                            <Card
                                title="Tensor de Weyl"
                                result={weylTensor}
                            />
                        )}
                    </div>
                )}
            </div>
        </>
    );
}
