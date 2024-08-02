import React, { useState } from "react";
import Modal from "./Modal";
import { imcCalc } from "./ImcCalc";

const Form: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [Imc, setImc] = useState<number | null>(null);
  const [classification, setClassification] = useState<string | null>(null);

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9.]/g, ''); 
    if (value.length === 1) {
      value = value + '.';
    } else if (value.length > 1 && value[1] !== '.') {
      value = value[0] + '.' + value.slice(1);
    }
    setHeight(value);
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setWeight(value);
  };

  const handleCalculate = () => {
    const heightValue = parseFloat(height);
    const weightValue = parseFloat(weight);
    if (!isNaN(heightValue) && !isNaN(weightValue)) {
      const ImcValue = imcCalc(heightValue, weightValue);
      setImc(ImcValue);
      setClassification(getIMCClassification(ImcValue));
      setOpen(true);
    }
  };

  const getIMCClassification = (imc: number): string => {
    if (imc < 18.5) return "Abaixo do peso";
    if (imc >= 18.5 && imc < 24.9) return "Peso normal";
    if (imc >= 25 && imc < 29.9) return "Sobrepeso";
    if (imc >= 30 && imc < 34.9) return "Obesidade grau 1";
    if (imc >= 35 && imc < 39.9) return "Obesidade grau 2";
    return "Obesidade grau 3";
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Calculadora de I.M.C.</h1>
        <div className="mb-4">
          <label className="block text-gray-700">Peso (kg):</label>
          <input
            type="text"
            value={weight}
            onChange={handleWeightChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Altura (m):</label>
          <input
            type="text"
            value={height}
            onChange={handleHeightChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          onClick={handleCalculate}
        >
          Calcular IMC
        </button>
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Seu IMC é de:</h2>
          {Imc !== null && (
            <p className="text-lg mb-4">{Imc.toFixed(2)}</p>
          )}
          {classification && (
            <><p className="text-lg">{classification}</p><div className="mt-8">
              <h2 className="text-xl font-bold mb-2">Classificação IMC</h2>
              <table className="min-w-full border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border px-4 py-2">Faixa de IMC</th>
                    <th className="border px-4 py-2">Classificação</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-4 py-2">Abaixo de 18.5</td>
                    <td className="border px-4 py-2">Abaixo do peso</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">18.5 - 24.9</td>
                    <td className="border px-4 py-2">Peso normal</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">25 - 29.9</td>
                    <td className="border px-4 py-2">Sobrepeso</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">30 - 34.9</td>
                    <td className="border px-4 py-2">Obesidade grau 1</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">35 - 39.9</td>
                    <td className="border px-4 py-2">Obesidade grau 2</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">Acima de 40</td>
                    <td className="border px-4 py-2">Obesidade grau 3</td>
                  </tr>
                </tbody>
              </table>
            </div></>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Form;
