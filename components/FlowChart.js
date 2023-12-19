"use client"

import React, { useEffect, useState } from 'react';
import { DecompositionTreeGraph } from '@ant-design/graphs';

const FlowChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/members');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const { members } = await response.json();

        let teacherName = 'Unknown';
        let principalName = 'Unknown';
        let librarianName = 'Unknown';

        members.forEach((member) => {
          if (member.role === 'Teacher') {
            teacherName = member.userName || 'Unknown';
          } else if (member.role === 'Principal') {
            principalName = member.userName || 'Unknown';
          } else if (member.role === 'Librarian') {
            librarianName = member.userName || 'Unknown';
          }
        });

        const data = {
          id: 'Principal',
          value: {
            title: 'Principal',
            items: [
              {
                text: `Name: ${principalName}`,
              },
            ],
          },
          children: [
            {
              id: 'Teacher',
              value: {
                title: 'Teacher',
                items: [
                  {
                    text: `Name: ${teacherName}`,
                  },
                ],
              },
              children: [
                {
                  id: 'Class 5',
                  value: {
                    title: 'Class 5',
                    items: [
                      {
                        text: `Total: ${countStudentsByGrade(members, '5th')}`,
                      },
                    ],
                  },
                },
                {
                  id: 'Class 8',
                  value: {
                    title: 'Class 8',
                    items: [
                      {
                        text: `Total: ${countStudentsByGrade(members, '8th')}`,
                      },
                    ],
                  },
                },
                {
                  id: 'Class 10',
                  value: {
                    title: 'Class 10',
                    items: [
                      {
                        text: `Total: ${countStudentsByGrade(members, '10th')}`,
                      },
                    ],
                  },
                },
              ],
            },
            {
              id: 'Librarian',
              value: {
                title: 'Librarian',
                items: [
                  {
                    text: `Name: ${librarianName}`,
                  },
                ],
              },
            },
          ],
        };
        setChartData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const countStudentsByGrade = (students, grade) => {
    return students.filter((student) => student.grade === grade).length;
  };

  const config = {
    data: chartData,
      markerCfg: (cfg) => {
        const { children } = cfg;
        return {
          show: children?.length,
        };
      },
      behaviors: ['drag-canvas','drag-node'],
      nodeCfg: {
        style: {
          fill: '#e6eff5',
          stroke: '#40a9ff',
          cursor: 'pointer',
        },
        labelCfg: {
          style: {
            fill: '#595959',
            fontSize: 12,
          },
        },
      },
      edgeCfg: {
        style: {
          stroke: '#bfbfbf',
          lineWidth: 1,
        },
      },
  };

  return chartData ? <DecompositionTreeGraph {...config} /> : <div>Loading...</div>;
};

export default FlowChart;
