import React, {useState} from 'react';
import axios from 'axios';
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

function StockInfo() {
    const [stockData, setStockData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [symbol, setSymbol] = useState('AAPL');

    const fetchStockData = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`/api/stock/${symbol}`);
            setStockData(response.data);
            setLoading(false);
        } catch (error) {
            setError('Fetching Stock Data Error!');
            setLoading(false);
        }
    };

    const stockSearch = () => {
        if (symbol) {
            fetchStockData();
        }
    };

    return (
        <div className="p-8 bg-transparent min-h-screen">
            <h2 className="text-3xl bg-white font-bold mb-4 text-center">Stock Information</h2>
            <div className="flex justify-center mb-6">
                <input
                    type="text"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                    placeholder="Enter Stock Symbol"
                    className="p-2 border border-gray-300 rounded mr-2"
                />
                <button
                    onClick={stockSearch}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Search
                </button>
            </div>

            {loading && <p className="text-center text-lg">Loading...</p>}
            {error && <p className="text-center text-lg text-red-500">{error}</p>}
            {stockData && (
                <div className="bg-white p-6 rounded shadow-lg max-w-2xl mx-auto">
                    <h3 className="text-2xl font-bold mb-4">
                        {stockData.name} ({stockData.symbol}) Stock Information
                    </h3>
                    <p className="mb-2">Latest Price: ${stockData.price}</p>
                    <p className="mb-4">Last Updated: {stockData.time}</p>

                    {/* 显示股票价格的折线图 */}
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart
                            data={stockData.historicalData.map(day => ({
                                date: day.date,
                                price: day.close
                            }))
                                .sort((a, b) => new Date(a.date) - new Date(b.date))}
                            margin={{top: 5, right: 30, left: 20, bottom: 5}}
                        >
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="date"/>
                            <YAxis/>
                            <Tooltip/>
                            <Line type="monotone" dataKey="price" stroke="#8884d8"/>
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}

export default StockInfo;
