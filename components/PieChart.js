"use client";

import Chart from 'chart.js/auto';
import React, { useEffect, useRef, useState } from "react";
import "chart.js/auto";

const DoughnutChart = () => {
    const chartRef = useRef(null);
    const [ageData, setAgeData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/members");
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const { members } = await response.json();

                const ageRanges = { "5-10": 0, "11-15": 0, "16-20": 0 };

                members.forEach((member) => {
                    const age = calculateAge(member.birthDate); 
                    if (age >= 5 && age <= 10) {
                        ageRanges["5-10"]++;
                    } else if (age >= 11 && age <= 15) {
                        ageRanges["11-15"]++;
                    } else if (age >= 16 && age <= 20) {
                        ageRanges["16-20"]++;
                    }
                });

                setAgeData(ageRanges);
            } catch (error) {
                console.error('Error fetching or processing data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const chartConfig = {
            type: "doughnut",
            data: {
                labels: Object.keys(ageData),
                datasets: [
                    {
                        data: Object.values(ageData),
                        backgroundColor: ["#005B5B", "#54C4C1", "#C2F8ED"],
                    },
                ],
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                title: {
                    display: false,
                    text: "Student Age Distribution",
                },
                legend: {
                    position: "bottom",
                    labels: {
                        fontColor: "rgba(0, 0, 0, 0.8)",
                    },
                },
            },
        };

        const ctx = document.getElementById("doughnut-chart").getContext("2d");

        if (chartRef.current) {
            chartRef.current.destroy();
        }

        chartRef.current = new Chart(ctx, chartConfig);
    }, [ageData]);

    const calculateAge = (birthDate) => {
        const today = new Date();
        const dob = new Date(birthDate);
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        return age;
    };

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full max-w-full flex-grow flex-1">
                            <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                                Demographics
                            </h6>
                            <h2 className="text-blueGray-700 text-xl font-semibold">
                                Student Age Distribution
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="p-4 flex-auto">
                    <div className="relative" style={{ height: "400px" }}>
                        <canvas id="doughnut-chart"></canvas>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DoughnutChart;
