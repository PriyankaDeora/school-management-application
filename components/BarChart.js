"use client"

import Chart from 'chart.js/auto';
import React, { useEffect, useRef, useState } from "react";
import "chart.js/auto";

const BarChart = () => {
    const chartRef = useRef(null);
    const [gradeData, setGradeData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/members");
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const { members } = await response.json();

                const gradeCounts = {
                    "1st": 0,
                    "2nd": 0,
                    "3rd": 0,
                    "4th": 0,
                    "5th": 0,
                    "6th": 0,
                    "7th": 0,
                    "8th": 0,
                    "9th": 0,
                    "10th": 0,
                };

                members.forEach((member) => {
                    const grade = member.grade;
                    if (grade in gradeCounts) {
                        gradeCounts[grade]++;
                    }
                });

                setGradeData(gradeCounts);
            } catch (error) {
                console.error('Error fetching or processing data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const chartConfig = {
            type: "bar",
            data: {
                labels: Object.keys(gradeData),
                datasets: [
                    {
                        label: "Number of Students",
                        data: Object.values(gradeData),
                        backgroundColor: "#005B5B",
                    },
                ],
            },
            options: {
                indexAxis: 'x',
                maintainAspectRatio: false,
                responsive: true,
                scales: {
                    x: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Grade',
                            color: '#000',
                            font: {
                                size: 16,
                            },
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Number of Students',
                            color: '#000',
                            font: {
                                size: 16,
                            },
                        },
                        min: 0,
                        max: 10,
                    },
                },
            },
        };

        const ctx = document.getElementById("bar-chart").getContext("2d");

        if (chartRef.current) {
            chartRef.current.destroy();
        }

        chartRef.current = new Chart(ctx, chartConfig);
    }, [gradeData]);

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
                                Student Grade Distribution
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="p-4 flex-auto">
                    <div className="relative" style={{ height: "400px" }}>
                        <canvas id="bar-chart"></canvas>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BarChart;
