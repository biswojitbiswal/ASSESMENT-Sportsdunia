import { useState, useEffect } from 'react';
import './App.css';
import collegeData from './colleges.json';

function App() {
  const [colleges, setColleges] = useState([]);
  const [visibleColleges, setVisibleColleges] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });

  useEffect(() => {
    setColleges(collegeData);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
        setVisibleColleges((prevVisible) => prevVisible + 10);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleSort = (key) => {
    const direction = (sortConfig.key === key && sortConfig.direction === 'asc') ? 'desc' : 'asc';
  
    setSortConfig({ key, direction });
  };
  
  const sortedColleges = [...colleges].sort((a, b) => {
    if (sortConfig.key) {
      const p = a[sortConfig.key];
      const q = b[sortConfig.key];
  
      if (p < q) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (p > q) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });

  const filteredColleges = sortedColleges.filter((college) =>
    college.CollegeName.toLowerCase().includes(searchTerm)
  );

  return (
    <>
      <section>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search Colleges"
            className="search-input"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button className="search-btn"><i className="fa-solid fa-magnifying-glass"></i></button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Sl No.</th>
              <th>Colleges</th>
              <th>
                Course Fees 
                <i
                  className={`fa-solid fa-arrow-${sortConfig.key === 'Fees' && sortConfig.direction === 'asc' ? 'up' : 'down'}`}
                  onClick={() => handleSort('Fees')}
                ></i>
              </th>
              <th>
                Placement 
              </th>
              <th>
                Reviews 
                <i
                  className={`fa-solid fa-arrow-${sortConfig.key === 'Reviews' && sortConfig.direction === 'asc' ? 'up' : 'down'}`}
                  onClick={() => handleSort('Reviews')}
                ></i>
              </th>
              <th>
                Ranking 
                <i
                  className={`fa-solid fa-arrow-${sortConfig.key === 'Ranking' && sortConfig.direction === 'asc' ? 'up' : 'down'}`}
                  onClick={() => handleSort('Ranking')}
                ></i>
              </th>
            </tr>
          </thead>
          <tbody>
            {
              filteredColleges.length > 0 ? (
                filteredColleges.slice(0, visibleColleges).map((college, index) => {
                  return (
                    <tr key={index} style={{ backgroundColor: college.Featured ? '#ffefef' : 'transparent' }}>
                      <td>#{college.No}</td>
                      <td>
                        <h2>{college.CollegeName}</h2>
                        <p>{college.Location}</p>
                        <p>{college.Branch}</p>
                        {college.Featured && <span className="featured-indicator">Featured</span>}
                      </td>
                      <td>
                        <h3><i className="fa-solid fa-indian-rupee-sign"></i> {college.Fees}</h3>
                        <p>{college.Branch}</p>
                        <p>1st Year Fees</p>
                      </td>
                      <td>
                        <h3><i className="fa-solid fa-indian-rupee-sign"></i> {college.AveragePackage} Lakh</h3>
                        <p>Average Package</p>
                        <h3><i className="fa-solid fa-indian-rupee-sign"></i> {college.HighestPackage} Lakh</h3>
                        <p>Highest Package</p>
                      </td>
                      <td>
                        <p>{college.Reviews} / 10</p>
                        <p>Based on {college.BasedOn} User Reviews</p>
                      </td>
                      <td>
                        <p>#{college.Ranking} / 500 College</p>
                        <p>2023</p>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center' }}>Result not found</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </section>
    </>
  );
}

export default App;
