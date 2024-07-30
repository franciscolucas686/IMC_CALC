import React, { useState } from 'react';

const IMCCalculator: React.FC = () => {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const calculateBMI = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (!isNaN(weightNum) && !isNaN(heightNum) && heightNum > 0) {
      const bmiValue = weightNum / (heightNum * heightNum);
      setBmi(bmiValue);
      setShowModal(true);
    } else {
      setBmi(null);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Calculadora de IMC</h1>
        <div className="mb-4">
          <label className="block text-gray-700">Peso (kg):</label>
          <input
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Altura (m):</label>
          <input
            type="text"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button
          onClick={calculateBMI}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Calcular IMC
        </button>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Resultado do IMC</h2>
            {bmi !== null ? (
              <p>Seu IMC é: {bmi.toFixed(2)}</p>
            ) : (
              <p>Por favor, insira valores válidos para peso e altura.</p>
            )}
            <button
              onClick={closeModal}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IMCCalculator;