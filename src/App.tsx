import { useState, useEffect } from 'react';
import {
  AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, BarChart, Bar, YAxis
} from 'recharts';
import {
  Snowflake, Droplets, Grid, PlugZap, ShieldCheck, ShieldAlert,
  TriangleAlert, Power, Car, Thermometer, WashingMachine
} from 'lucide-react';

const initialChartData = [
  { time: '3:00', usage: 0.15 },
  { time: '3:05', usage: 0.18 },
  { time: '3:10', usage: 0.12 },
  { time: '3:12', usage: 0.35 },
  { time: '3:15', usage: 0.20 },
  { time: '3:18', usage: 0.28 },
  { time: '3:20', usage: 0.22 },
  { time: '3:21', usage: 0.40 },
  { time: '3:22', usage: 0.35 },
];

const appliances = [
  { name: 'Air Conditioner', val: '123.45 U', Icon: Snowflake },
  { name: 'Heating Device', val: '123.45 U', Icon: Thermometer },
  { name: 'Washing Machine', val: '123.45 U', Icon: WashingMachine },
  { name: 'Geyser', val: '123.45 U', Icon: Droplets },
  { name: 'EV', val: '123.45 U', Icon: Car },
];

const onIcons = [
  { color: '#3173a3', Icon: Snowflake },
  { color: '#6e46cb', Icon: Droplets },
  { color: '#e6a727', Icon: Grid },
  { color: '#df7359', Icon: PlugZap },
  { color: '#cb5344', Icon: Car },
  { color: '#388a32', Icon: Snowflake }, // Placeholder for the green one
];

const alerts = [
  { title: 'Electrical Arcing Detected', time: '12:03 AM', type: 'red' },
  { title: 'Power Surge Detected', time: '12:03 AM', type: 'orange' },
  { title: 'Short circuit Detected', time: '12:03 AM', type: 'orange' },
  { title: 'High Load Alert Detected', time: '12:03 AM', type: 'red' },
  { title: 'Power Surge Detected', time: '12:03 AM', type: 'orange' },
  { title: 'High Load Alert Detected', time: '12:03 AM', type: 'red' },
];

const weeklyData = [
  { day: 'Mon', lastWeek: 8, currentWeek: 11 },
  { day: 'Tue', lastWeek: 6, currentWeek: 4 },
  { day: 'Wed', lastWeek: 4, currentWeek: 9 },
  { day: 'Thu', lastWeek: 8, currentWeek: 12 },
  { day: 'Fri', lastWeek: 10, currentWeek: 6 },
  { day: 'Sat', lastWeek: 7, currentWeek: 10 },
  { day: 'Sun', lastWeek: 5, currentWeek: 8 },
];

function App() {
  const [data, setData] = useState(initialChartData);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const lastNode = prev[prev.length - 1];
        const [hhStr, mmStr] = lastNode.time.split(':');
        let h = parseInt(hhStr, 10);
        let m = parseInt(mmStr, 10);
        
        m += 1; // Increment by 1 min
        if (m >= 60) {
          m = 0;
          h = h + 1;
        }
        const time = `${h}:${m.toString().padStart(2, '0')}`;
        
        // Random usage between 0.1 and 0.5
        let usage = lastNode.usage + (Math.random() * 0.15 - 0.075);
        if (usage < 0.1) usage = 0.1;
        if (usage > 0.55) usage = 0.55;

        // Keep last 15 elements to make it run smoothly
        const newArr = [...prev, { time, usage: Number(usage.toFixed(2)) }];
        return newArr.length > 20 ? newArr.slice(1) : newArr;
      });
    }, 1500); // 1.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-display">
      
      {/* HEADER */}
      <div className="header">
        <div className="header-left">
          <h1>Good morning, Shyam</h1>
          <p>Monday, March 30</p>
        </div>
        <div className="header-right">
          <div className="stat-box">
            <span className="stat-label">Live</span>
            <span className="stat-val">3.9 <span className="stat-unit">Watts</span></span>
          </div>
          <div className="stat-box">
            <span className="stat-label">Total consumption</span>
            <span className="stat-val">80.1 <span className="stat-unit">Units</span></span>
          </div>
          <div className="stat-box">
            <span className="stat-label">Co2</span>
            <span className="stat-val">11.2 <span className="stat-unit">Kg</span></span>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="dashboard-grid">
        
        {/* LEFT COLUMN */}
        <div className="col-left">
          <div className="card chart-card">
            <div className="card-header">
              <div className="card-title-group">
                <h2>Your home's energy live story</h2>
                <p>See when your home used the most energy today.</p>
              </div>
              <div className="synced-badge">
                <div className="dot"></div> Synced
              </div>
            </div>
            
            <div className="chart-placeholder">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 0, left: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#cb5344" stopOpacity={0.6}/>
                      <stop offset="95%" stopColor="#cb5344" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="time" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#9a9a9f', fontSize: 12}}
                    dy={10}
                    interval={2}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1c1b1f', border: '1px solid #2d2c31', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                    labelStyle={{ display: 'none' }}
                  />
                  <div className="usage-overlay" style={{position: 'absolute', top: 30, right: 10, color: 'var(--highlight-red)', fontSize: '14px'}}>
                    Usage: <span style={{fontWeight: 600}}>0.22 Units</span>
                  </div>
                  <Area 
                    type="monotone" 
                    dataKey="usage" 
                    stroke="#cb5344" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorUsage)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
              
              <div className="peak-tooltip">
                <div className="title">Peak usage at 4:45 PM</div>
                <div className="desc">likely when AC and kitchen were running together</div>
              </div>
            </div>
          </div>
          
          <div className="card bar-card">
            <div className="bar-header">
              <div>
                <h2 className="un-val">80 Units</h2>
                <p className="un-label">Total units consumed today</p>
              </div>
              <div className="un-total">Total Appliances: 10</div>
            </div>
            
            <div className="stacked-bar-container">
              <div className="bar-segment" style={{width: '20%', backgroundColor: 'var(--bar-ac)'}}></div>
              <div className="bar-segment" style={{width: '15%', backgroundColor: 'var(--bar-geyser)'}}></div>
              <div className="bar-segment" style={{width: '10%', backgroundColor: 'var(--bar-purple)'}}></div>
              <div className="bar-segment" style={{width: '10%', backgroundColor: 'var(--bar-ref)'}}></div>
              <div className="bar-segment" style={{width: '10%', backgroundColor: 'var(--bar-wash)'}}></div>
              <div className="bar-segment" style={{width: '35%', background: 'linear-gradient(90deg, #444 0%, #303030 100%)'}}></div>
            </div>
            
            <div className="legend">
              <div className="legend-item"><div className="legend-color" style={{backgroundColor: 'var(--bar-ac)'}}></div> AC</div>
              <div className="legend-item"><div className="legend-color" style={{backgroundColor: 'var(--bar-geyser)'}}></div> Geyser</div>
              <div className="legend-item"><div className="legend-color" style={{backgroundColor: 'var(--bar-purple)'}}></div> Geyser</div>
              <div className="legend-item"><div className="legend-color" style={{backgroundColor: 'var(--bar-ref)'}}></div> Refrigerator</div>
              <div className="legend-item"><div className="legend-color" style={{backgroundColor: 'var(--bar-wash)'}}></div> Washing Machine</div>
              <div className="legend-item"><div className="legend-color" style={{backgroundColor: 'var(--bar-others)'}}></div> Others</div>
            </div>
          </div>
        </div>

        {/* MIDDLE COLUMN */}
        <div className="col-mid">
          <div className="card appliances-card">
            <div className="card-header">
              <div className="card-title-group">
                <h2>Top 5 Appliance Consumption</h2>
              </div>
            </div>
            
            <div className="appliances-list">
              {appliances.map((app, idx) => (
                <div className="appliance-item" key={idx}>
                  <div className="app-left">
                    <app.Icon size={18} className="app-icon" />
                    {app.name}
                  </div>
                  <div className="app-val">{app.val}</div>
                </div>
              ))}
            </div>
            
            <div className="appliances-on">
              <span>Appliances on:</span>
              <div className="on-icons">
                {onIcons.map((icn, i) => (
                  <div className="on-icon-circle" key={i} style={{ backgroundColor: icn.color }}>
                    <icn.Icon size={16} color="#fff" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card weekly-card">
            <div className="weekly-stats">
              <div className="weekly-stat-item">
                <span className="stat-label">Last Week</span>
                <span className="stat-val">45.6 <span className="stat-unit">Units</span></span>
              </div>
              <div className="weekly-stat-item border-left">
                <span className="stat-label">Current Week</span>
                <span className="stat-val">12.6 <span className="stat-unit">Units</span></span>
              </div>
              <div className="last-days">Last 7 days</div>
            </div>

            <div className="weekly-chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData} margin={{ top: 20, right: 0, left: -40, bottom: 0 }}>
                  <XAxis 
                    dataKey="day" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#9a9a9f', fontSize: 10}}
                    dy={5}
                  />
                  <YAxis hide domain={[0, 15]} />
                  <Bar dataKey="lastWeek" fill="#2d2c31" radius={[2, 2, 0, 0]} barSize={6} />
                  <Bar dataKey="currentWeek" fill="#22998a" radius={[2, 2, 0, 0]} barSize={6} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-right">
          <div className="card status-card">
            <div className="card-header">
              <div className="card-title-group">
                <h2>Your Home's Energy Story</h2>
                <p>A quick check on how your home's humming today.</p>
              </div>
              <div className="synced-badge">
                <div className="dot"></div> Synced
              </div>
            </div>
            
            <div className="status-pill status-safe">
              <div className="status-left">
                <ShieldCheck size={20} />
                Safe
              </div>
              <ShieldCheck size={20} strokeWidth={1.5} opacity={0.8}/>
            </div>
            
            <div className="status-pill status-risk">
              <div className="status-left">
                <ShieldAlert size={20} />
                Probable Risk
              </div>
            </div>
          </div>
          
          <div className="card alerts-card">
            <div className="alerts-header">
              <h2>Alerts</h2>
              <span className="alert-badge">7</span>
            </div>
            
            <div className="alerts-list">
              {alerts.map((al, idx) => (
                <div className="alert-item" key={idx}>
                  <div className={`alert-icon-wrap ${al.type}`}>
                    {al.type === 'red' ? <TriangleAlert size={18} /> : <Power size={18} />}
                  </div>
                  <div className="alert-info">
                    <span className="alert-title">{al.title}</span>
                    <span className="alert-time">{al.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default App;
