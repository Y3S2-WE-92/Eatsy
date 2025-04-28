import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { paymentAPI } from '../../services';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

export default function Earnings() {
    const [paybacks, setPaybacks] = useState([]);
    const [timeFilter, setTimeFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Display 5 paybacks per page

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (user?.id) {
            fetchPaybacksForReceiver();
        }
    }, []);

    const fetchPaybacksForReceiver = async () => {
        try {
            const response = await axios.get(`${paymentAPI.PaymentAPIGetPaybackByReceiverId}delivery/${user.id}`);
            if (response?.data) {
                setPaybacks(response.data);
            }
        } catch (error) {
            console.error("Error fetching paybacks:", error);
        }
    };

    const filterByDate = (items) => {
        if (timeFilter === 'all') return items;
        const days = parseInt(timeFilter, 10);
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - days);
        return items.filter(p => new Date(p.date) >= cutoff);
    };

    const filteredPaybacks = filterByDate(paybacks);

    const totalEarnings = filteredPaybacks.reduce((sum, p) => sum + p.amountReceived, 0);
    const lastPayoutDate = filteredPaybacks.length > 0
        ? new Date(filteredPaybacks[filteredPaybacks.length - 1].date).toLocaleDateString()
        : "N/A";
    const avgEarnings = totalEarnings / (filteredPaybacks.length || 1);
    const topPayout = Math.max(...filteredPaybacks.map(p => p.amountReceived), 0);

    const compareToLastPeriod = () => {
        const now = new Date();
        const days = timeFilter === '7' || timeFilter === '30' ? parseInt(timeFilter, 10) : 0;
        if (!days) return { percent: 0, trend: '↑' };

        const prevStart = new Date();
        prevStart.setDate(now.getDate() - (2 * days));
        const prevEnd = new Date();
        prevEnd.setDate(now.getDate() - days);

        const prevPeriod = paybacks.filter(p => {
            const date = new Date(p.date);
            return date >= prevStart && date < prevEnd;
        });

        const prevSum = prevPeriod.reduce((sum, p) => sum + p.amountReceived, 0);
        const currentSum = filteredPaybacks.reduce((sum, p) => sum + p.amountReceived, 0);
        const diff = currentSum - prevSum;

        return {
            percent: prevSum ? Math.abs((diff / prevSum) * 100).toFixed(1) : 0,
            trend: diff >= 0 ? '↑' : '↓'
        };
    };

    const { percent, trend } = compareToLastPeriod();

    const chartData = {
        labels: filteredPaybacks.map(p => new Date(p.date).toLocaleDateString()),
        datasets: [{
            label: 'Earnings (LKR)',
            data: filteredPaybacks.map(p => p.amountReceived),
            fill: true,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.4
        }]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                callbacks: {
                    label: (context) => `LKR ${context.raw.toFixed(2)}`
                }
            }
        },
        scales: {
            y: {
                ticks: {
                    callback: (value) => `LKR ${value}`
                }
            }
        }
    };

    const exportToCSV = () => {
        const headers = ["Order ID", "Amount", "Date", "Status"];
        const rows = filteredPaybacks.map(p => [
            p.refNo,
            p.amountReceived,
            new Date(p.date).toISOString().split('T')[0],
            p.status
        ]);
        const csv = [headers, ...rows].map(row => row.join(",")).join("\n");

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'earnings.csv';
        a.click();
        URL.revokeObjectURL(url);
    };

    // Pagination Logic
    const totalPages = Math.ceil(filteredPaybacks.length / itemsPerPage);
    const paginatedPaybacks = filteredPaybacks.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="p-6 space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="stat">
                    <h2 className="stat-title">Total Earnings</h2>
                    <p className="stat-value">LKR {totalEarnings.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">{trend} {percent}% from last period</p>
                </div>
                <div className="stat">
                    <h2 className="stat-title">Average Payout</h2>
                    <p className="stat-value">LKR {avgEarnings.toFixed(2)}</p>
                </div>
                <div className="stat">
                    <h2 className="stat-title">Top Payout</h2>
                    <p className="stat-value">LKR {topPayout.toFixed(2)}</p>
                </div>
                <div className="stat">
                    <h2 className="stat-title">Last Payout</h2>
                    <p className="stat-value">{lastPayoutDate}</p>
                </div>
            </div>

            {/* Time Filter */}
            <div className="flex justify-end">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn m-1 btn-sm">
                        Filter Time ⌄
                    </div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><button onClick={() => setTimeFilter('7')}>Last 7 Days</button></li>
                        <li><button onClick={() => setTimeFilter('30')}>Last 30 Days</button></li>
                        <li><button onClick={() => setTimeFilter('all')}>All Time</button></li>
                    </ul>
                </div>
            </div>

            {/* Chart and Table */}
            <div className="flex flex-col md:flex-row gap-4 pb-10">
                {/* Table Section */}
                <div className="md:w-[60%] overflow-x-auto shadow rounded p-4">
                    <div className="flex justify-between mb-4">
                        <h3 className="text-lg font-semibold">Detailed Payouts</h3>
                        <button
                            onClick={exportToCSV}
                            className="btn btn-outline btn-error btn-sm transition hover:scale-105"
                        >
                            Export CSV
                        </button>
                    </div>
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Order</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedPaybacks?.length > 0 ? (
                                paginatedPaybacks.map(payback => (
                                    <tr key={payback.refNo}>
                                        <td>{payback.refNo}</td>
                                        <td>LKR {payback.amountReceived.toFixed(2)}</td>
                                        <td>{new Date(payback.date).toLocaleDateString()}</td>
                                        <td>
                                            {payback.status === 'completed' ? (
                                                <span className="badge badge-success">Completed</span>
                                            ) : (
                                                <span className="badge badge-warning">Pending</span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">
                                        <div className="mockup-code bg-blue-900 text-primary-content w-full">
                                            <pre><code>No Data to be shown</code></pre>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Pagination Controls */}
                    <div className="flex justify-center mt-5">
                        <div className="join">
                            <button
                                className="join-item btn btn-sm"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Prev
                            </button>
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    className={`join-item btn btn-sm ${currentPage === index + 1 ? 'btn-active' : ''}`}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button
                                className="join-item btn btn-sm"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>

                {/* Chart Section */}
                <div className="md:w-[40%] shadow rounded p-4 h-96">
                    <h3 className="text-lg font-semibold mb-2">Earnings Over Time</h3>
                    <div className="h-full">
                        <Line data={chartData} options={chartOptions} />
                    </div>
                </div>
            </div>
        </div>
    );
}
