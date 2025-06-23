
import { useEffect, useState } from "react";
import PressureGauge from "./PressureGauge";
import TemperatureChart from './TemperatureChart'
import StatusPanel from './StatusPanel'
import AlertList from './AlertList'
import './d3index.css'
// 模拟数据生成
const generateMockData = () => {
    const statuses = ['normal', 'warning', 'danger'];
    return {
        pressure: parseFloat((Math.random() * 10).toFixed(1)),
        temperature: parseFloat((Math.random() * 30 + 60).toFixed(1)),
        power: Math.floor(Math.random() * 50 + 50),
        flowRate: parseFloat((Math.random() * 50 + 50).toFixed(1)),
        status: statuses[Math.floor(Math.random() * statuses.length)]
    };
};
export default function Dashboard() {
    const [compressorData, setCompressorData] = useState({
        pressure: 0,
        temperature: 0,
        power: 0,
        flowRate: 0,
        status: 'normal'
    });
    const [alerts, setAlerts] = useState([]);
    const [historicalData, setHistoricalData] = useState([]);
    const addAlert = (message) => {
        const newAlert = {
            id: Date.now(),
            message,
            timestamp: new Date().toLocaleTimeString(),
            severity: 'high'
        };
        setAlerts(prev => [newAlert, ...prev].slice(0, 20));
    };
    // 模拟数据更新
    useEffect(() => {
        const interval = setInterval(() => {
            const newData = generateMockData();
            setCompressorData(prev => ({ ...prev, ...newData }));
            
            // 添加到历史数据（保留最近100条）
            setHistoricalData(prev => {
                const newHistory = [...prev, { ...newData, timestamp: new Date() }];
                return newHistory.slice(-100);
            });
            
            // 检测报警
            if (newData.pressure > 8) {
                addAlert(`高压报警: ${newData.pressure} bar`);
            }
            if (newData.temperature > 90) {
                addAlert(`高温报警: ${newData.temperature}°C`);
            }
        }, 2000);
        
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="compressor-monitor">
            <h1>空压机设备监控系统</h1>
        
            <div className="dashboard">
                <div className="gauge-panel">
                    <PressureGauge 
                        value={compressorData.pressure} 
                        min={0} 
                        max={10} 
                        unit="bar"
                    />
                </div>
                
                <div className="chart-panel">
                    <TemperatureChart data={historicalData} />
                </div>
                
                <div className="status-panel">
                    <StatusPanel data={compressorData} />
                </div>
            </div>
        
            <div className="alert-panel">
                <AlertList alerts={alerts} />
            </div>
        </div>
    );
}
