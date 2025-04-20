import { Link } from 'react-router-dom';
import './CrewmateList.css';

function CrewmateList ({ sorted, stats, success }) {
 return(
 <div style={{ padding: "2rem" }}>
    <h2 style={{ color: "#ffd60a" }}>🚀 Crewmate Summary</h2>
    <Link to="/create" className="primary-btn">➕ Add New Crewmate</Link>

    <div className="card">
      <h3>📊 Stats</h3>
      {stats.map(stat => (
        <p key={stat.attr}>{stat.attr}: {stat.percent}%</p>
      ))}
    </div>

    <div className="card">
      <h4>⭐ Success Metric: {success}</h4>
      <div className="sparkle-text">✨ High Chance of Success ✨</div>
    </div>

    {sorted.map(c => (
      <div key={c.id} className="card">
        <Link to={`/crewmate/${c.id}`}>
          <h3>{c.name}</h3>
          <p>{c.category} — {c.attribute}</p>
          <img 
            src={`/images/icons/${c.category.toLowerCase()}.png`} 
            alt={`${c.category} icon`} 
            style={{ width: 40, height: 40 }}
          />
        </Link>
      </div>
    ))}
  </div>
 );
};


export default CrewmateList;
